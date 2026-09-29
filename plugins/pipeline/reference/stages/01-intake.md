# Stage 1 — Intake (interactive, you run it)

Goal: a brief the user signs off, a track, and an approach. No code, no stack
debates beyond what the brief needs.

## Do

1. Create `pipeline/` and copy in `STATUS.md`, `brief.md`, `open-questions.md`,
   `decisions.md` from `$ROOT/reference/templates/`.
2. Interview the user with `AskUserQuestion` (≤ 4 questions per round, recommended
   option first). Cover, in this order, skipping what they already said:
   - **Who** is it for, and what do they do today instead?
   - **Core promise** — the one sentence that must be true for the MVP to matter.
     Push until it is testable ("two people on separate phones can play a full
     game together with no server" — not "a great multiplayer experience").
   - **Non-goals** — what it deliberately won't do in v1.
   - **Constraints** — platform, devices, budget, deadline, offline, privacy, stores.
   - **What "done" looks like** — how the user will judge the MVP.
3. Choose the **approach**. Read `$ROOT/reference/approaches/README.md`, recommend
   one (or a primary + a secondary for a sub-area) with a one-line reason, and let
   the user pick. Record in `decisions.md`.
4. Choose the **track** (spark / standard / deep, see conductor). Recommend the
   lightest one that protects the core promise. Raise to `deep` when the core
   promise depends on something nobody here has done (radio, P2P, sync, realtime,
   hardware, payments, ML).
5. Stack: record it if already decided; otherwise leave it for stage 6 and add an
   `assumable` question with the likely default.
6. Everything unresolved goes into `open-questions.md`, tagged per `$ROOT/reference/gates.md`.

## Gate — must items

- [ ] core promise is one testable sentence
- [ ] target user and their current alternative named
- [ ] ≥ 3 non-goals
- [ ] MVP success criteria the user can check by hand
- [ ] approach and track chosen and recorded as user decisions
- [ ] no open `blocking` questions about *what* is being built
- [ ] **user signed off the brief in chat**

Spark track: only the first, fourth and last items are required.
