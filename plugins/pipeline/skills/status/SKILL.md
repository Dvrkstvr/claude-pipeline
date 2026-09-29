---
name: status
description: Show where the pipeline stands — stage, gates, open blocking questions, features passing, context budget.
disable-model-invocation: true
---

# Pipeline — status

Plugin root (`$ROOT`): `${CLAUDE_PLUGIN_ROOT}`

Read-only. Report in ≤ 15 lines:
1. The "Now" section of `pipeline/STATUS.md`.
2. Open `blocking` questions from `pipeline/open-questions.md` (id + one line each).
3. Features passing per milestone, from `pipeline/features.json`.
4. The summary line of `node "$ROOT/scripts/context-budget.mjs"` run from the
   project root.
5. Any mismatch between STATUS.md and the other files (e.g. a stage marked done
   whose gate items aren't met) — flag it, don't fix it.

If there is no `pipeline/` folder, say so and point at `/pipeline:run` or
`/pipeline:adopt`.
