# Stage 3 — Spike

A spike is throwaway code that answers one risk. It is the cheapest way to turn a
`hypothesis` into `proven`/`disproven`, and it's how a risky core promise gets
tested before anything is built on top of it.

Dispatch one `pipeline:spike-runner` per risk (in parallel when independent).
Give each: the risk id, the question it must answer, the pass/fail criterion,
and a time box (default: 1 focused session).

## Rules the runner follows

- Lives in `pipeline/spikes/<risk-id>-<slug>/`, never in app source.
- A fake/sim of the hard part is allowed only when the spike's question is about
  *our* logic; if the question is about the platform, it must touch the real
  platform (device, real network, real store API).
- Ends with `RESULT.md`: question, verdict (`proven` / `disproven` /
  `inconclusive`), evidence (commands, logs, screenshots), what the real build
  should copy, and what surprised it.
- Code may be reused later only by copying deliberately; the spike folder is not
  imported.

## After

Update `risks.md` evidence levels. A `disproven` H risk means scope or approach
changes → back to the user (sign-off point).

## Gate — must items

- [ ] every scheduled spike has a `RESULT.md` with a verdict and evidence
- [ ] `risks.md` updated; feasibility not `red`
