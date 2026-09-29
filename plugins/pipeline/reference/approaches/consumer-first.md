# Consumer-first

For libraries, frameworks, SDKs, packages and developer tools — anything whose
user is another developer.

## Source of truth
Consumer scenarios: "a developer wants to do X; this is the code they write and
what happens in their first hour". Samples and the public API docs encode them.
Real integration feedback (someone tried it in a real project and said why they
did or didn't adopt it) outranks the author's opinion.

## Stage emphasis
- **Intake (1)**: the core promise is a consumer scenario with a time bound
  ("a new project goes menu → game scene in under 10 minutes with no Addressables
  setup"). Name the minimum supported platform/engine versions.
- **Feasibility (2)**: dependency footprint, version support matrix, what the
  minimal use case forces a consumer to install or configure.
- **Scope (4)**: M0 = one scenario end to end **in a fresh consumer project**,
  not in the author's host project.
- **Design (5)**: API sketches — the consumer's code, written first — and
  mockups only for editor tooling.
- **Architecture (6)**: the public/internal boundary, extension seams, the
  versioning and deprecation policy.
- **Build (7)**: write the sample/consumer code first, then make it work.
- **Review (8)**: add the `api` lens — naming, discoverability, breaking changes.
- **Release (9)**: semver, changelog, upgrade notes, samples runnable.

## Quality bar
Every public type is used by a sample or a test. No breaking change without a
major version and an upgrade note. The consumer smoke test is green.

## Verify by
A fresh consumer project (automated where the stack allows) plus dogfooding in
the author's own projects through the same distribution channel customers use.

## Watch out for
Impressive tooling that doesn't remove the first-hour tax; two ways to do one
thing with no guidance; building for hypothetical customers instead of the
consumer projects that already exist.
