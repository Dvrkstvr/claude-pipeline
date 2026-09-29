# Stage 2 — Feasibility

Dispatch `pipeline:feasibility-scout`. It reads `brief.md`, `playbook.md` (if any),
`decisions.md`, and writes `pipeline/risks.md`.

## What the scout must produce

- Every way the **core promise** could fail, first. Then platform/store/policy,
  data/privacy, performance, third-party dependency, and "unknown unknowns"
  (things only a device or a second user would reveal).
- Each risk: impact H/M/L, evidence level, the check that would move it to
  `proven`/`disproven`, and a fallback if it fails.
- A **core-promise path**: the thinnest end-to-end slice that proves the promise
  (this becomes milestone M0 in scope).
- Library/API claims checked against current docs (Context7 or official docs),
  never from memory. Cite the source per claim.
- New open questions (tagged) where the risk depends on a user choice.

## Gate — must items

- [ ] every H-impact risk has an evidence level and a named check
- [ ] core-promise path written, ≤ 10 steps
- [ ] feasibility line computed per `gates.md`
- [ ] red → a spike, a user-accepted fallback, or a scope cut is scheduled

Spark track: you write a 5-line risk list yourself, no agent.
