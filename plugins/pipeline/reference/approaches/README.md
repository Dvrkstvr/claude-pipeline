# Approaches

An approach decides **what the source of truth is** and **what must exist before
code**. The stages stay the same; the approach changes what each stage emphasises.
A project picks one primary approach, and may name a secondary for one area
(e.g. spec-first for a game engine core, design-first for its UI).

| Card | Source of truth | Before code | Suits |
|---|---|---|---|
| `design-first.md` | mockups / design file | a settled mockup per screen | consumer apps where feel is the product |
| `spec-first.md` | acceptance criteria + tests | failing tests for the behaviour | engines, protocols, parsers, libraries, rules-heavy logic |
| `prototype-first.md` | the running prototype + what it taught | a question the prototype answers | unclear ideas, new tech, "is this fun/useful at all?" |
| `research-first.md` | a research note with sources | the note, with "what not to build" | domain-heavy features (health, finance, stats, algorithms) |
| `loop-first.md` | the playable/usable core loop | nothing but the loop | games, creative tools, anything judged by feel in use |

To add an approach: copy a card, keep its five headings, add a row here.
Approaches are data — no stage file names a specific approach.
