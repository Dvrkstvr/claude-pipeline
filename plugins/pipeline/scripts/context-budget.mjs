#!/usr/bin/env node
// Measures what a project loads into every Claude Code session, and what it
// loads only on demand, against the budgets in reference/context-rules.md.
// Usage (from the project root):
//   node <plugin>/scripts/context-budget.mjs [--max-claude-lines N] [--max-bytes N] [--quiet]
// Exit 0 = within budget, 1 = over budget.

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(name);
  return i >= 0 && args[i + 1] ? Number(args[i + 1]) : fallback;
};
const MAX_CLAUDE_LINES = flag('--max-claude-lines', 120);
const MAX_ALWAYS_BYTES = flag('--max-bytes', 20 * 1024);
const MAX_RULE_LINES = 80;
const MAX_STATUS_LINES = 60;
const MAX_IMPORT_DEPTH = 4;
const quiet = args.includes('--quiet');

const root = resolve(process.env.CLAUDE_PROJECT_DIR || process.cwd());
const rel = (p) => relative(root, p).replaceAll('\\', '/') || '.';
const read = (p) => readFileSync(p, 'utf8');
const lines = (s) => (s.length ? s.split(/\r?\n/).length : 0);
const kb = (n) => `${(n / 1024).toFixed(1)} KB`;
const tokens = (n) => `~${(n / 4 / 1000).toFixed(1)}k tok`;

// `@path` imports outside code fences and inline code, resolved relative to the importing file.
function importsOf(file, text) {
  const out = [];
  let fenced = false;
  for (const line of text.split(/\r?\n/)) {
    if (/^\s*(```|~~~)/.test(line)) { fenced = !fenced; continue; }
    if (fenced) continue;
    const bare = line.replace(/`[^`]*`/g, '');
    for (const m of bare.matchAll(/(?:^|\s)@([^\s@`]+)/g)) {
      let target = m[1].replace(/[),.;:]+$/, '');
      if (target.startsWith('~/') || target.startsWith('~\\')) {
        target = join(process.env.USERPROFILE || process.env.HOME || '', target.slice(2));
      }
      const p = resolve(dirname(file), target);
      if (existsSync(p) && statSync(p).isFile()) out.push(p);
    }
  }
  return out;
}

function hasPathsFrontmatter(text) {
  if (!text.startsWith('---')) return false;
  const end = text.indexOf('\n---', 3);
  if (end < 0) return false;
  return /^paths\s*:/m.test(text.slice(3, end));
}

function walk(dir, found = []) {
  if (!existsSync(dir)) return found;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) walk(p, found);
    else if (name.endsWith('.md')) found.push(p);
  }
  return found;
}

const always = []; // { path, bytes, lines, via }
const seen = new Set();
function addAlways(p, via, depth = 0) {
  const key = resolve(p);
  if (seen.has(key) || !existsSync(key)) return;
  seen.add(key);
  const text = read(key);
  always.push({ path: key, bytes: Buffer.byteLength(text), lines: lines(text), via });
  if (depth < MAX_IMPORT_DEPTH) {
    for (const imp of importsOf(key, text)) addAlways(imp, `@import from ${rel(key)}`, depth + 1);
  }
}

for (const f of ['CLAUDE.md', '.claude/CLAUDE.md', 'CLAUDE.local.md']) addAlways(join(root, f), 'memory');

const scoped = [];
for (const p of walk(join(root, '.claude', 'rules'))) {
  const text = read(p);
  if (hasPathsFrontmatter(text)) scoped.push({ path: p, bytes: Buffer.byteLength(text), lines: lines(text) });
  else addAlways(p, 'unscoped rule');
}

let statusNow = null;
const statusPath = join(root, 'pipeline', 'STATUS.md');
if (existsSync(statusPath)) {
  const text = read(statusPath);
  const m = text.match(/^## Now\s*\n([\s\S]*?)(?=^## |$(?![\s\S]))/m);
  const now = m ? m[1].replace(/<!--[\s\S]*?-->/g, '').trim() : '';
  statusNow = { path: statusPath, totalLines: lines(text), bytes: Buffer.byteLength(now), lines: lines(now) };
}

// ---- budgets
const problems = [];
const claude = always.find((f) => rel(f.path) === 'CLAUDE.md' || rel(f.path) === '.claude/CLAUDE.md');
if (claude && claude.lines > MAX_CLAUDE_LINES) problems.push(`${rel(claude.path)} is ${claude.lines} lines (budget ${MAX_CLAUDE_LINES})`);
for (const f of always.filter((f) => f.via.startsWith('@import'))) {
  if (f.bytes > 4 * 1024) problems.push(`${rel(f.path)} (${kb(f.bytes)}) is @imported, so it loads every session — move it to path-scoped rules or docs/`);
}
for (const f of scoped) if (f.lines > MAX_RULE_LINES) problems.push(`${rel(f.path)} is ${f.lines} lines (rule budget ${MAX_RULE_LINES}) — split it or move rationale to docs/decisions/`);
if (statusNow && statusNow.totalLines > MAX_STATUS_LINES) problems.push(`pipeline/STATUS.md is ${statusNow.totalLines} lines (budget ${MAX_STATUS_LINES})`);
const alwaysBytes = always.reduce((n, f) => n + f.bytes, 0) + (statusNow ? statusNow.bytes : 0);
if (alwaysBytes > MAX_ALWAYS_BYTES) problems.push(`always-loaded total ${kb(alwaysBytes)} (budget ${kb(MAX_ALWAYS_BYTES)})`);

// ---- report
if (!quiet) {
  console.log(`Context budget — ${root}`);
  console.log('\nAlways loaded (every session):');
  if (!always.length && !statusNow) console.log('  (nothing)');
  for (const f of always) console.log(`  ${rel(f.path).padEnd(44)} ${String(f.lines).padStart(5)} lines  ${kb(f.bytes).padStart(9)}  ${tokens(f.bytes).padStart(11)}  ${f.via}`);
  if (statusNow) console.log(`  ${'pipeline/STATUS.md (Now section, via hook)'.padEnd(44)} ${String(statusNow.lines).padStart(5)} lines  ${kb(statusNow.bytes).padStart(9)}  ${tokens(statusNow.bytes).padStart(11)}`);
  console.log('\nOn demand (path-scoped rules):');
  if (!scoped.length) console.log('  (none)');
  for (const f of scoped) console.log(`  ${rel(f.path).padEnd(44)} ${String(f.lines).padStart(5)} lines  ${kb(f.bytes).padStart(9)}`);
  if (problems.length) {
    console.log('\nOver budget:');
    for (const p of problems) console.log(`  - ${p}`);
  }
  console.log('');
}
const agentsMd = join(root, 'AGENTS.md');
if (!quiet && existsSync(agentsMd) && !seen.has(resolve(agentsMd))) {
  console.log(`note: AGENTS.md (${kb(statSync(agentsMd).size)}) exists but nothing imports it — Claude Code doesn't load it; other agents may.\n`);
}
const unscopedCount = always.filter((f) => f.via === 'unscoped rule').length;
console.log(
  `context-budget: always-loaded ${kb(alwaysBytes)} (${tokens(alwaysBytes)}) · ` +
  `CLAUDE.md ${claude ? claude.lines : 0}/${MAX_CLAUDE_LINES} lines · ` +
  `rules ${unscopedCount} unscoped, ${scoped.length} scoped · ` +
  (problems.length ? `OVER BUDGET (${problems.length})` : 'OK'),
);
process.exit(problems.length ? 1 : 0);
