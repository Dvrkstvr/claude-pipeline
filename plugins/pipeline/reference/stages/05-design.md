# Stage 5 — Design

Runs when the approach card asks for it, or when scope has a novel interaction.
Dispatch `pipeline:ux-mocker` per screen/flow group (parallel when independent).

## What a mockup is here

A **decision document that happens to be visual** — not a design deliverable.
- Self-contained HTML in `pipeline/design/<slug>.html`, **≤ 25 KB**. Static
  states side by side beats one interactive prototype.
- Sections: *What this settles*, the states (normal, empty, loading, error,
  edge), *Decisions* (each with the alternative it beat), *Open questions*
  (tagged), *Check on a real device*.
- When there is a real choice, show 2–3 options next to each other and
  recommend one. The user picks; you record it.
- Uses the project's design tokens if they exist; otherwise proposes a minimal
  token set (colour, type scale, spacing, radius, motion) as its own mockup
  first, which then becomes the source every later mockup and the code read from.

After the build, the mockup stays as the spec for that screen: when code and
mockup disagree, it's a bug unless a decision says otherwise.

## Gate — must items

- [ ] every mockup names what it settles and has no untagged open question
- [ ] every blocking choice in it was **picked by the user**
- [ ] design tokens exist (file or mockup) before the first UI milestone
