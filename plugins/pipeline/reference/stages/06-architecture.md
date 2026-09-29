# Stage 6 — Architecture

Dispatch `pipeline:architect`. It reads `brief.md`, `scope.md`, `risks.md`,
`decisions.md`, spike results, the approach card(s) and the stack card named in
`playbook.md` (`$ROOT/reference/approaches/`, `$ROOT/reference/stacks/`), and any
relevant files in `$ROOT/lessons/`.

## What it produces

1. `pipeline/architecture.md` — modules and their one job each, the data model
   and where it persists, the seams (anything that could be swapped: transport,
   storage, AI provider, platform bridge), and how each seam gets a fake for
   testing. Logic that decides things lives in pure modules (values in,
   answers out) so it can be tested without the UI or the platform.
2. `pipeline/playbook.md` completed — stack, the exact **check commands**
   (typecheck, lint, test, build), the **run/verify method** (how an agent sees
   the app running: emulator + MCP, browser + Playwright CLI, CLI output, editor
   MCP), and the quality bar for the track.
3. The project's context skeleton, per `$ROOT/reference/context-rules.md`:
   - `CLAUDE.md` ≤ 120 lines: what it is, commands, costly invariants, index.
   - `.claude/rules/` files with `paths:` for each area architecture names — even
     if nearly empty, so later lessons have a home that isn't CLAUDE.md.
   - `docs/decisions/` with one record per significant choice (deep track:
     mandatory; standard: for choices with real alternatives).
4. Test strategy chosen **by risk**: which modules get tests first (data
   migrations, parsers of outside input, anything that leaves the device, core
   protocol logic), and how the core promise is exercised end to end.
5. A CI or pre-commit check that runs the check commands, if the project will
   live longer than a spark.

## Gate — must items

- [ ] every M0 feature maps to modules in architecture.md
- [ ] every seam named in risks.md has a fake/sim plan
- [ ] check commands and verify method written and **run once successfully** on
      the empty skeleton
- [ ] `context-budget.mjs` passes on the new project
