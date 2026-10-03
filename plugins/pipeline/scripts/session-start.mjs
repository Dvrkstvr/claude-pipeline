#!/usr/bin/env node
// SessionStart hook: if this project runs the pipeline, put the "Now" section of
// pipeline/STATUS.md into context so a fresh session knows where things stand
// without reading anything else. Silent (and free) in projects without pipeline/.
// Never fails the session: every error path exits 0 with no output.

import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

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
      'Continue with /pipeline:run (or /pipeline:auto <target> to run unattended) · overview /pipeline:status · new feature /pipeline:feature <idea>.',
      'Do not load other pipeline/ files until a stage needs them.',
    ].join('\n'),
  );
} catch {
  // A broken status file must never block a session.
}
process.exit(0);
