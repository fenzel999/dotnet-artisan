# .NET support window (verified 2026-10-07)

Source: [Microsoft .NET support policy](https://dotnet.microsoft.com/en-us/platform/support/policy) and the [download page](https://dotnet.microsoft.com/en-us/download/dotnet), both last updated 2026-09-08. Rechecked 2026-10-07. This is a platform fact, not a project convention.

| TFM | Kind | Phase on 2026-10-07 | End of support | Latest patch seen |
| --- | --- | --- | --- | --- |
| net10.0 | LTS | Active. Current production default. | 2028-11-14 | 10.0.12 (2026-09-08) |
| net9.0 | STS | Maintenance. 34 days left. | 2026-11-10 | 9.0.20 |
| net8.0 | LTS | Maintenance. 34 days left. | 2026-11-10 | 8.0.31 |
| net11.0 | STS, not GA | Go-live RC only (`11.0.0-rc.1`, 2026-09-08) | unset | do not default new apps here |

## Agent rules

- New apps and file-based scripts: `net10.0` unless the user names another TFM.
- Existing `net8.0` / `net9.0`: say the 2026-11-10 date (34 days from 2026-10-07), then ask before upgrading. Do not rewrite the repo unprompted.
- `net11` / preview TFMs: allowed only when the user asks to try the RC. Do not call it the production default. GA is expected around November 2026; do not invent a ship date.
- `net7.0` and older are out of support. Flag them; still do not upgrade without a yes.
- Patch Tuesday is the second Tuesday of the month. Next one after this note is 2026-10-13. Stay on the latest patch of the chosen major. Do not invent 10.0.13 / 9.0.21 / 8.0.32 before that page updates.

Rechecked 2026-10-07: policy page still dated 2026-09-08. `net10.0` patch remains 10.0.12.
