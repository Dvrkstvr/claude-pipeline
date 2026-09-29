# Unity

## Checks
- **Compile**: a live Editor via the `unity` CLI (`unity status`, then
  `unity command recompile` + console, needs `com.unity.pipeline`), or headless:
  `unity test` compiles before it runs. Compile errors put the Editor in Safe
  Mode, where no bridge connects — that means "fix the code", not "tooling broke".
- **Tests**: `unity test --mode EditMode --output <file>.xml` and
  `--mode PlayMode`. Non-zero exit on failure; read totals from the NUnit XML.
  A headless run needs the Editor closed on that project (or a worktree copy).
- **A test run must prove it's fresh.** Stale-domain runs report old results as
  green. Check: the XML's total equals the `[Test]`/`[UnityTest]` count in source,
  tests added this session appear by name, the XML is newer than the last `.cs` edit.
- **A test must be able to fail.** Break the code under a new test once and see it
  go red; tests whose setup silently did nothing have passed before.
- Pure logic in asmdefs with `noEngineReferences` where possible — they test in
  milliseconds and never need Play Mode.

## Run & drive
Bridge preference: live `unity` CLI commands → MCP for Unity → headless batch.
- MCP: activate tool groups before use; pin `set_active_instance` (never a
  Multiplayer Play Mode virtual player); read state via resources.
- **Read back every write** made through a bridge — property sets have reported
  success while leaving references null.
- Screenshots (MCP camera, or a capture command) prove layout, not behaviour.
- **Code existing ≠ feature existing.** For every feature, a wiring test opens the
  scene(s) additively and asserts the components, references and assets it needs
  are present. Generated scenes/prefabs validate before saving and get such a test.
- Networking: ≥ 2 players (Multiplayer Play Mode) with simulated latency and loss.
  Host-only or localhost-clean is not verified.
- Feel, visuals, timing: the user checks. Hand them numbered steps and on-screen
  numbers to report; the check is `owed` until they do (see gates).

## Fakes
Services behind interfaces or ScriptableObject channels; tests load the **real**
tuning assets, not copies. Time via an injectable clock; transports with an
in-memory implementation so two instances can run in one test.

## Ship
- **Game**: a player build per milestone, not only at release
  (`unity build --target <platform>`), launched once — shader stripping,
  Addressables content builds and scenes missing from the build list only show
  up in a player.
- **Package / framework** (see also `approaches/consumer-first.md`):
  - one source of truth consumed by every project, including your own games —
    copies pasted into projects diverge and fixes never flow back;
  - UPM layout (`package.json`, semver, `CHANGELOG.md`, `Samples~`, docs) for
    git-URL installs; Asset Store export from the same folder;
  - optional dependencies behind asmdef `versionDefines` / `defineConstraints`
    — the minimal use case must not require Addressables, Netcode, etc.;
  - a **consumer smoke test**: a fresh empty project on the minimum supported
    Unity version imports the package, compiles with no warnings from it, runs a
    sample — once with and once without the optional packages;
  - never regenerate the `.meta` of a shipped asset: GUIDs are the consumers'
    references.

## Git
`.meta` always committed with its asset; LFS for binaries; ignore `Library/`,
`Temp/`, `Obj/`, `Logs/`, `UserSettings/`, `*.csproj`, `*.sln`. Never commit a
scene/prefab the user has dirtied — stage explicit paths. Don't hand-edit
`.unity`/`.prefab`/`.asset` YAML while an Editor is reachable.

## Docs
The Unity Manual and Scripting API for the project's exact version
(`ProjectSettings/ProjectVersion.txt`); package docs at the manifest's versions.
