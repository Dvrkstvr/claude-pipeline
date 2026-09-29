# Spec-first

## Source of truth
Acceptance criteria in `scope.md` and the tests that encode them. A behaviour
that has no test is not specified yet.

## Stage emphasis
- **Scope (4)** writes acceptance criteria precise enough to become tests,
  including edge cases and invalid input.
- **Architecture (6)** puts all deciding logic in pure modules with no I/O, and
  names every seam's fake.
- **Build (7)** is test-first: failing test → code → green → refactor.
- **Deep track** adds mutation testing on the pure modules.

## Quality bar
Pure modules have tests for every acceptance criterion; tests are checked by
mutation (deep) or at least by deliberately breaking the code once per module.

## Verify by
The test suite in CI, plus one end-to-end run of the core promise on the real
target (tests alone never prove the promise).

## Watch out for
A perfect core with no working product around it — M0 must still be the
end-to-end path, not "the engine".
