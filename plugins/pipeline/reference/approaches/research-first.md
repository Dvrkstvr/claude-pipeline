# Research-first

## Source of truth
A research note in `docs/research/<topic>.md` with sources, which the feature's
spec cites.

## Stage emphasis
- **Feasibility (2)** includes a research pass: what the literature / standards /
  prior art say, with citations, and a section **"What not to build"**.
- The user reviews the note before scope — research that answers a different
  question than the user asked is the common failure.
- **Scope (4)** cites the note for every number, threshold or formula.

## Quality bar
Every constant in the code that came from research names its source in a
comment. Uncertain findings are shown to the user as ranges or bands, never as
false precision.

## Verify by
Worked examples from the note reproduced by the code's tests.

## Watch out for
Building first and researching after — that's the rebuild-it-twice loop.
