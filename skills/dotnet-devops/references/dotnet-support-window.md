# .NET support window (verified 2026-10-06)

Source: [Microsoft .NET support policy](https://dotnet.microsoft.com/en-us/platform/support/policy) and the download page, both updated 2026-09-08. This is a platform fact, not a project convention.

| TFM | Kind | Phase on 2026-10-06 | End of support | Latest patch seen |
| --- | --- | --- | --- | --- |
| net10.0 | LTS | Active. Current production default. | 2028-11-14 | 10.0.12 (2026-09-08) |
| net9.0 | STS | Maintenance. About one month left. | 2026-11-10 | 9.0.20 |
| net8.0 | LTS | Maintenance. About one month left. | 2026-11-10 | 8.0.31 |
| net11.0 | STS, not released | Go-live RC only (`11.0.0-rc.1`, 2026-09-08) | unset | do not default new apps here |

## Agent rules

- New apps and file-based scripts: `net10.0` unless the user names another TFM.
- Existing `net8.0` / `net9.0`: say the 2026-11-10 date, then ask before upgrading. Do not rewrite the repo unprompted.
- `net11` / preview TFMs: allowed only when the user asks to try the RC. Do not call it the production default.
- `net7.0` and older are out of support. Flag them; still do not upgrade without a yes.
- Patch Tuesday is the second Tuesday of the month. Stay on the latest patch of the chosen major.

Rechecked 2026-10-06: policy page still dated 2026-09-08. Next Patch Tuesday is 2026-10-13; do not invent a 10.0.13.
