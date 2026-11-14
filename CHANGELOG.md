# Changelog

## 1.0.37 (2026-11-14) — Support facts rechecked; smoke-test aligned to current patches

### Learned / Fixed
- Official download and support policy pages rechecked 2026-11-14. Latest unchanged: `net11.0` GA 11.0.0, `net10.0` 10.0.15, `net9.0` 9.0.23, `net8.0` 8.0.34 (all released 2026-11-10). net8/net9 support ended 2026-11-10. Policy page last updated ~November 10, 2026.
- SessionStart continues to compute "support ended" live from UTC midnight; POLICY_CHECKED updated to 2026-11-14 so the injected note reflects this recheck. No invented patches. Recommend planning upgrade to current LTS net10.0 (or net11 for new work where appropriate). C# 15 unions available on net11 for explicit outcome modeling.
- Fixed smoke-test.js which still expected patches not beyond 10.0.14 (would fail on the current 10.0.15 note). Now accepts current published patches and fails only on clearly invented higher ones. This helps humans verify the plugin runs normally via `node scripts/hooks/smoke-test.js`.
- Human-facing docs (QUICKSTART, LEARNING) refreshed so users and agents see accurate platform facts. Helps humans verify the plugin runs and continues the learning loop. plugin.json version synced to 1.0.37.

Waiting for human review — do not auto-merge. Existing PR: https://github.com/fenzel999/dotnet-artisan/pull/16

## 1.0.36 (2026-11-13) — Support facts rechecked; unchanged since 11-10 GA/patches

### Learned
- Official download and support policy pages rechecked 2026-11-13. Latest unchanged: `net11.0` GA 11.0.0, `net10.0` 10.0.15, `net9.0` 9.0.23, `net8.0` 8.0.34 (all released 2026-11-10). net8/net9 support ended 2026-11-10. Policy page last updated ~November 10, 2026.
- SessionStart continues to compute "support ended" live from UTC midnight; POLICY_CHECKED updated to 2026-11-13 so the injected note reflects this recheck. No invented patches. Recommend planning upgrade to current LTS net10.0 (or net11 for new work where appropriate).
- Human-facing docs (QUICKSTART, LEARNING) refreshed so users and agents see accurate platform facts. Helps humans verify the plugin runs and continues the learning loop. plugin.json version synced to 1.0.36.

Waiting for human review — do not auto-merge. Existing PR: https://github.com/fenzel999/dotnet-artisan/pull/16

## 1.0.35 (2026-11-11) — .NET 11 GA + latest patches; net8/net9 support ended

### Learned
- Official download and support policy pages rechecked 2026-11-11. .NET 11 is now GA: `11.0.0` (released 2026-11-10, STS through 2028-11-14). Latest patches: `net10.0` 10.0.15, `net9.0` 9.0.23, `net8.0` 8.0.34 (all released 2026-11-10). Policy page last updated ~November 10, 2026.
- net8.0 and net9.0 reached end of support on 2026-11-10 (yesterday). SessionStart computes "support ended" live from UTC midnight; POLICY_CHECKED updated so the injected note reflects this recheck. No invented patches. Recommend planning upgrade to current LTS net10.0 (or net11 for new work where appropriate).
- Human-facing docs (QUICKSTART, LEARNING) refreshed so users and agents see accurate platform facts. Helps humans verify the plugin runs and continues the learning loop. plugin.json version synced to 1.0.35.

Waiting for human review — do not auto-merge. Existing PR: https://github.com/fenzel999/dotnet-artisan/pull/16
