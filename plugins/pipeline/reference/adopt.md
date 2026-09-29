# Adopt an existing project

Brings a project that was started without the pipeline under it, without
redoing work that exists. Nothing in the app's source changes during adoption.

1. Dispatch `pipeline:auditor`. It reads the repo (README, CLAUDE.md/AGENTS.md,
   docs, design folders, tests, CI, git history) and writes, into `pipeline/`:
   - `brief.md` reconstructed — core promise stated as the code/docs imply it,
     with every guess marked `(inferred)`;
   - `features.json` — what exists, each with `passes` **only** where it found
     evidence (a test, a run log, a CI result); everything else `false`;
   - `risks.md` — including whether the **core promise works end to end today**;
   - `open-questions.md` — every inference the user must confirm, tagged;
   - `audit.md` — process findings: rework chains, doc churn, breadth-before-depth,
     missing verification, context bloat (with `context-budget.mjs` output);
   - a recommended track, approach and **entry stage**.
2. Clarify loop on the reconstructed brief (sign-off point, as in intake).
3. Create `playbook.md` from what the project already does (commands, stack) +
   the chosen approach card. Don't rewrite conventions that work.
4. Set STATUS.md to the entry stage. Typical entries:
   - core promise not proven end to end → **stage 4** with M0 = that path
   - scope unclear / sprawling → **stage 4**
   - scope fine, quality unclear → **stage 7** verification pass over existing
     features, then review
5. Existing context files over budget: propose the split (as a separate task on
   its own branch) — don't restructure them silently during adoption.
6. Legacy process rituals the audit found costly (e.g. mirroring every change
   into several docs by hand): list them and ask the user which to retire. The
   pipeline's STATUS.md + features.json replace status tables elsewhere.
