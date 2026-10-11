#!/usr/bin/env node
// SessionStart hook: if this project runs the pipeline, put the "Now" section of
// pipeline/STATUS.md into context so a fresh session knows where things stand
// without reading anything else. Silent (and free) in projects without pipeline/.
// Never fails the session: every error path exits 0 with no output.

import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

// Counts are computed here rather than kept in STATUS.md, where they drift.
function featureCounts(path) {
  try {
    const data = JSON.parse(readFileSync(path, 'utf8'));
    const features = Array.isArray(data) ? data : data.features;
    if (!Array.isArray(features) || !features.length) return '';
    const byMilestone = new Map();
    for (const f of features) {
      const m = String(f.milestone ?? '?');
      const [pass, total] = byMilestone.get(m) ?? [0, 0];
      byMilestone.set(m, [pass + (f.passes === true ? 1 : 0), total + 1]);
    }
    const passing = features.filter((f) => f.passes === true).length;
    const order = (m) => (/^M\d+/.test(m) ? parseInt(m.slice(1), 10) : Number.MAX_SAFE_INTEGER);
    const perMilestone = [...byMilestone]
      .sort(([a], [b]) => order(a) - order(b))
      .map(([m, [p, t]]) => `${m} ${p}/${t}`).join(' · ');
    return `- features (computed from features.json): ${passing}/${features.length} passing · ${perMilestone}`;
  } catch {
    return '';
  }
}

try {
  const root = process.env.CLAUDE_PROJECT_DIR || process.cwd();
  const status = join(root, 'pipeline', 'STATUS.md');
  if (!existsSync(status)) process.exit(0);

  const text = readFileSync(status, 'utf8').replace(/<!--[\s\S]*?-->/g, '');
  const m = text.match(/^## Now\s*\n([\s\S]*?)(?=^## |$(?![\s\S]))/m);
  const now = (m ? m[1] : '').trim().split(/\r?\n/).slice(0, 14).join('\n');

  console.log(
    [
      'This project runs the idea → MVP pipeline (plugin "pipeline"). State from pipeline/STATUS.md:',
      now || '(STATUS.md has no "## Now" section)',
      featureCounts(join(root, 'pipeline', 'features.json')),
      'Continue with /pipeline:run (or /pipeline:auto <target> to run unattended) · overview /pipeline:status · new feature /pipeline:feature <idea>.',
      'Do not load other pipeline/ files until a stage needs them.',
    ].filter(Boolean).join('\n'),
  );
} catch {
  // A broken status file must never block a session.
}
process.exit(0);
