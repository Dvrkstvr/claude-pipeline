# Adopt an existing project

Brings a project that was started without the pipeline under it, without
redoing work that exists. Nothing in the app's source changes during adoption,
except the live-harm hotfixes in step 2, each on its own branch.

1. Dispatch `pipeline:auditor`. It reads the repo (README, CLAUDE.md/AGENTS.md,
   docs, design folders, tests, CI, git history) and writes, into `pipeline/`:
   - `brief.md` reconstructed — core promise stated as the code/docs imply it,
     with every guess marked `(inferred)`;
   - `features.json` — what exists, each with `passes` **only** where it found
     evidence (a test, a run log, a CI result); everything else `false`.
     Features whose code decides something (rules, parsing, money, crypto,
     sync) start `false` with evidence `adopted: <tests> pass, unprobed`:
     tests written before adoption show what the author thought of, not what
     breaks;
   - `risks.md` — including whether the **core promise works end to end today**;
   - **live now** (top of `audit.md`) — what is deployed or shipped (sites,
     store builds, servers, deploy-on-push CI), who uses it, and anything in it
     that hurts users today: leaked secrets or keys, data loss, an open hole;
   - `open-questions.md` — every inference the user must confirm, tagged;
   - `audit.md` — process findings: rework chains, doc churn, breadth-before-depth,
     missing verification, context bloat (with `context-budget.mjs` output);
   - a recommended track, approach and **entry stage**.
2. **Live harm first.** Each "hurts users today" item from the audit goes to
   the user before anything else, as a hotfix proposal: the smallest change on
   its own branch against what is deployed, outside the stage gates (see
   "Hotfix lane" in `conductor.md`). Pipeline work doesn't wait for it, and it
   doesn't wait for the pipeline.
3. Clarify loop on the reconstructed brief (sign-off point, as in intake).
4. Create `playbook.md` from what the project already does (commands, stack) +
   the chosen approach card. Don't rewrite conventions that work.
5. Set STATUS.md to the entry stage. Typical entries:
   - core promise not proven end to end → **stage 4** with M0 = that path
   - scope unclear / sprawling → **stage 4**
   - scope fine, quality unclear → **stage 7** verification pass over existing
     features, then review
   Wherever it enters, the first build task probes the `unprobed` features:
   edge-case tests written red-first against the acceptance criteria, or a
   mutation check on their modules. They pass only after that, via the verifier.
6. Existing context files over budget: propose the split (as a separate task on
   its own branch) — don't restructure them silently during adoption.
7. Legacy process rituals the audit found costly (e.g. mirroring every change
   into several docs by hand): list them and ask the user which to retire. The
   pipeline's STATUS.md + features.json replace status tables elsewhere.
