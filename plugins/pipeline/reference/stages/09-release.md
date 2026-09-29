# Stage 9 — Release

Dispatch `pipeline:release-checker` with the distribution target from the brief
(store, sideload, web host, itch, internal). It reads `playbook.md`, the stack
card, and the repo, and writes `pipeline/release-checklist.md`.

## The checklist always covers

- version stated in one place and copied everywhere else by a script
- signing / keys: named by config, never committed; what losing them costs
- the build command produces the artefact from a clean checkout
- tests run in CI (not just locally)
- licence of the app itself, and third-party notices that ship with the binary
- privacy policy / data-safety answers if anything is stored or sent
- store or host specific requirements (permissions justifications, screenshots,
  listing text) — from the stack card and current official docs
- rollback: how to get back to the previous version

Each item: `done` / `todo` / `n/a` with the evidence or the reason.

## Gate — must items

- [ ] no `todo` left on items marked required for the distribution target
- [ ] a release build was produced from a clean checkout and run once
- [ ] **user confirms the release** — publishing is theirs to do
