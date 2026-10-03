# claude-pipeline

A [Claude Code](https://code.claude.com) plugin that takes an app from **idea to
MVP** through gated stages, with specialised subagents for each stage and all
project state kept in files, so every session starts small and picks up exactly
where the last one stopped.

It is approach- and stack-agnostic: each project chooses how much process it
gets, what counts as its spec, and which stack it's on.

## The approach in one screen

```
idea ─▶ 1 Intake ─▶ 2 Feasibility ─▶ 3 Spike ─▶ 4 Scope ─▶ 5 Design ─▶ 6 Architecture ─▶ 7 Build ─▶ 8 Review ─▶ 9 Release
          you         scout            runner      cutter      mocker       architect          engine+verifier  reviewer    checker
           ▲                                                                                             │
           └────────────── clarify loop: blocking questions always come back to you ◀────────────────────┘
                                         curate after every milestone
```

- **The conductor talks to you; agents do bounded work.** Subagents can't ask the
  user anything, so stage agents write their questions into
  `pipeline/open-questions.md` and the conductor (the main conversation) asks
  you, at most four at a time, recommended option first.
- **Gates are counted, not felt.** Every open question is tagged `blocking`,
  `assumable` (a default is recorded and you can overrule it) or `deferred`. Every
  risk has an impact (H/M/L) and an evidence level (`known`, `platform`,
  `hypothesis`, `proven`). One blocking question or one unproven H-impact risk
  stops the stage.
- **M0 is always the core promise, end to end, on the real platform.** Breadth
  before depth is the most expensive mistake in solo AI-assisted building.
- **Nothing is "done" without evidence.** A feature's pass flag flips only when a
  separate verifier agent ran the checks and drove the real app.
- **Context stays lean by construction.** Knowledge goes to the cheapest layer
  that works: a code comment, a path-scoped rule that loads only when matching
  files are touched, or a decision record — never a growing CLAUDE.md.
  `context-budget.mjs` measures it and fails when it's over budget.

### Tracks: how much process

| Track | For | Adds |
|---|---|---|
| `spark` | throwaways, small tools | brief → scope-lite → build → verify |
| `standard` | most apps | all stages, code review per milestone |
| `deep` | risky tech (P2P, sync, hardware, payments…) | spikes for every unproven risk, mockups for every novel flow, 4 review lenses, mutation testing |

### Approaches: what the spec is

`design-first` · `spec-first` · `prototype-first` · `research-first` ·
`loop-first` (games) — one primary per project, optionally a secondary for one
area. Cards live in `plugins/pipeline/reference/approaches/`.

### Stacks

Cards for Expo / React Native, .NET, web, plus a generic card for anything else.
They tell the architect, verifier and release checker how that stack is checked,
driven and shipped.

## Install

```bash
claude plugin marketplace add Dvrkstvr/claude-pipeline
```

Then enable it **per project** (from that project's folder), so it never loads
where you don't want it:

```bash
claude plugin install pipeline@calkoh --scope project
```

Optional build engine — the Build stage hands implementation to
[Superpowers](https://github.com/obra/superpowers) when it's installed, and uses a
built-in loop otherwise:

```bash
claude plugin install superpowers@claude-plugins-official --scope project
```

Requires Node.js on PATH (for the session hook and the budget script).

## Use

| Command | When |
|---|---|
| `/pipeline:run [idea]` | new idea in an empty folder, or continue where `pipeline/STATUS.md` says |
| `/pipeline:auto [target]` | autopilot: run stage after stage until `stage <n>`, `M<x>`, `F-<id>` or `mvp` is reached. Stops only for sign-offs, blocking questions, owed checks, stalls (3 rounds without progress) or the round budget (`--max-rounds`, default 12) |
| `/pipeline:adopt` | put an existing project under the pipeline (audit → reconstructed brief → entry stage) |
| `/pipeline:feature <idea>` | one feature through the gates, after the MVP |
| `/pipeline:clarify` | work through open blocking questions |
| `/pipeline:status` | where things stand |
| `/pipeline:curate` | prune and re-file context (works in any project) |

Entry skills use `disable-model-invocation`, so they cost no context until you
type them. In an enabled project the plugin's always-on cost is under 1k tokens.
A SessionStart hook injects the "Now" section of `pipeline/STATUS.md` in pipeline
projects and prints nothing elsewhere.

What a project gets:

```
pipeline/
  STATUS.md            ≤ 60 lines: track, stage, gate lines, next action
  brief.md             core promise, user, non-goals, done-when
  playbook.md          approach, stack, check commands, verify method, quality bar
  open-questions.md    tagged questions
  decisions.md         your calls, recorded assumptions, spike verdicts
  risks.md             impact × evidence, core-promise path
  scope.md             milestones, interaction specs, Later / Not doing
  features.json        per-feature acceptance criteria, pass flags, evidence
  design/ spikes/ reviews/
```

## Layout

```
plugins/pipeline/
  skills/        thin entry points (+ agent-contract, preloaded into every agent)
  agents/        feasibility-scout, spike-runner, scope-cutter, ux-mocker, architect,
                 builder, verifier, reviewer, release-checker, auditor
  reference/     conductor protocol, autopilot, gates, clarify loop, context rules,
                 stages/ (one file per stage), approaches/, stacks/, templates/
  lessons/       your cross-project lessons (personal, gitignored)
  scripts/       context-budget.mjs, session-start.mjs
  hooks/         SessionStart
```

## Extend

- **Approach**: copy a card in `reference/approaches/` (keep its five headings), add a row to its README.
- **Stack**: copy `reference/stacks/generic.md`'s headings, add a row to its README.
- **Lessons**: `/pipeline:curate` proposes cross-project lessons and writes them to
  `lessons/` only after you agree. They're read on demand by the scout and the architect.

To hack on it locally, clone and add the clone as the marketplace instead —
a local marketplace is read in place, so edits apply at the next session start or
`/reload-plugins`:

```bash
claude plugin marketplace add ./claude-pipeline
claude plugin validate ./claude-pipeline
```

## Credits

Builds on ideas from [Superpowers](https://github.com/obra/superpowers),
[GitHub Spec Kit](https://github.com/github/spec-kit),
[Agent OS](https://github.com/buildermethods/agent-os),
[OpenSpec](https://github.com/Fission-AI/OpenSpec) and Anthropic's engineering
posts on context engineering and long-running agent harnesses.

## License

MIT
