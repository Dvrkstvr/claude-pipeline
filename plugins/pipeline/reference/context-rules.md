# Context rules

What a project tells Claude, and when it pays for it. The failure this prevents:
an AGENTS.md that grew to 231 KB and loaded ~60k tokens into every session,
most of it rationale already written beside the code.

## Layers — put each piece of knowledge in the cheapest one that works

| Layer | Loaded | Put here | Budget |
|---|---|---|---|
| `CLAUDE.md` | every session | what the project is (3 lines), commands, invariants whose violation loses data or breaks the build, an index of the layers below | **≤ 120 lines**, no `@import` of large files |
| `.claude/rules/<topic>.md` with `paths:` | only when Claude reads matching files | rules for one area of the code | ≤ 80 lines each |
| `.claude/rules/<topic>.md` without `paths:` | every session | avoid — counts against the CLAUDE.md budget | — |
| code comments at the site | when the file is read | why *this* line is the way it is | — |
| `docs/decisions/NNNN-<slug>.md` | only when read on purpose | the long why: alternatives, trade-offs, what was tried | — |
| `pipeline/*` | STATUS.md at session start (hook); rest on demand | project state | STATUS ≤ 60 lines |
| project skills `.claude/skills/` | name + description only | procedures: release, run on device, seed data | — |

Path-scoped rule format:

```markdown
---
paths:
  - "src/sync/**"
  - "src/components/sync/**"
---
# Sync
- Every outgoing request goes through `sendRequest` …
```

## The line test

For every line in an always-loaded file ask: **"Would removing this cause a
mistake Claude can't recover from by reading the code?"** No → move it down a
layer or delete it. Also delete:
- anything the linter, type checker or a test already enforces,
- anything Claude does by default,
- history ("used to…", "was changed because…") → `docs/decisions/`,
- status and counts ("114 tests", "M1.9 done") → they go stale; STATUS.md owns status.

## Where a new lesson goes

| The lesson is… | It goes to |
|---|---|
| about one function or line | a comment at that site |
| about one area of the code | the path-scoped rule for that area (create it if needed) |
| a decision with alternatives worth remembering | `docs/decisions/` + one line in the area's rule pointing at it |
| true for the whole project and violation is costly | `CLAUDE.md` — only if under budget after removing something |
| true for every project of this stack or approach | propose it for the plugin's `lessons/` (ask the user) |

## Measuring

`node "$ROOT/scripts/context-budget.mjs"` (run from the project root) reports
every always-loaded file, its size, an estimated token count, and budget
violations. Exit code 1 means over budget.
