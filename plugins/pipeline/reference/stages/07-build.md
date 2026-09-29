# Stage 7 — Build (one milestone at a time)

You orchestrate; an engine implements; `pipeline:verifier` judges. Start each
milestone in a fresh session if the current one is already long.

## Per milestone

1. Read `scope.md` for this milestone and its `features.json` entries. Re-check
   deferred questions and assumptions that touch it (clarify loop if any became
   blocking).
2. If a feature has UI and the approach is design-first, its mockup must exist
   and be settled. If not → stage 5 for that feature first.
3. **Implement** with the build engine:
   - **Superpowers installed** (`superpowers:*` skills exist): say the spec is in
     `pipeline/` and brainstorming is already done, then use
     `superpowers:using-git-worktrees` → `superpowers:writing-plans` (input: this
     milestone's features and acceptance criteria) → `superpowers:executing-plans`
     (default, cheaper) or `superpowers:subagent-driven-development` (for a
     milestone with many independent tasks). Keep TDD where the playbook's test
     strategy says so; for UI and editor-driven work, verification is by running
     the thing, not by test-first.
   - **Otherwise (built-in loop)**: branch or worktree; break the milestone into
     tasks of ≤ ~30 min each written into the milestone section of `scope.md`;
     for each task implement → run the playbook's check commands → fix → commit
     with a message saying what was verified.
4. **Verify** — dispatch `pipeline:verifier` with the milestone's feature ids. It
   runs checks and drives the real app per the playbook's verify method, and
   reports per feature: pass/fail + evidence. Only then set `passes: true` and
   `evidence` in `features.json`. A fail goes back to step 3 with the verifier's
   finding, not with a guess.
5. **Deep track**: run mutation testing on the milestone's pure modules
   (Stryker for JS/TS/.NET; the playbook names the command). Surviving mutants in
   code that decides something → strengthen tests before moving on.
6. Stage 8 review, then curate (`$ROOT/reference/curate.md`), then merge.

## Rules

- Nothing merges that hasn't run on its target (device, browser, editor).
  "Not yet run on a device" in a commit message means not done.
- One milestone per branch; don't bundle unrelated features into one commit.
- New knowledge learned while building goes where `context-rules.md` says —
  never appended to CLAUDE.md in passing.

## Gate — must items (per milestone)

- [ ] every feature of the milestone `passes: true` with evidence
- [ ] check commands green
- [ ] review done, no open blocking findings
- [ ] curate done; context budget passes
