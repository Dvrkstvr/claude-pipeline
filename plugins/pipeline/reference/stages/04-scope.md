# Stage 4 — Scope

Dispatch `pipeline:scope-cutter`. It reads `brief.md`, `risks.md`,
`decisions.md`, and writes `pipeline/scope.md` and `pipeline/features.json`.

## What the cut must look like

- **M0 = the core-promise path, end to end**, as thin as possible, on the real
  platform. Nothing else starts before M0 passes. (Breadth before depth is the
  most expensive mistake this pipeline exists to prevent.)
- Then milestones M1…Mn, each shippable to the user for a look, each ≤ ~1 week
  of focused work, ordered by risk first and value second.
- Every feature: id, milestone, one-line user-visible behaviour, acceptance
  criteria a person can check, `passes: false`, `evidence: null`.
- An explicit **Later** list and **Not doing** list — scope the user asked for
  and that got cut must appear there with the reason.
- Interaction specs for anything non-obvious (gestures, multi-step flows,
  multi-user turns): states, transitions, what happens on error and on cancel.
  Missing interaction specs are how one feature becomes four fix-up versions.

## Gate — must items

- [ ] M0 is the core-promise path and nothing else
- [ ] every MVP feature has acceptance criteria and a milestone
- [ ] every non-obvious interaction has a state/transition spec or a design task
- [ ] deferred questions re-checked; none became blocking
- [ ] **user signed off the MVP cut in chat**
