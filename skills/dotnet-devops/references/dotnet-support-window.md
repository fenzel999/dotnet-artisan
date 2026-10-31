# .NET support window (verified 2026-10-29)

Source: [Microsoft .NET download page](https://dotnet.microsoft.com/en-us/download/dotnet) and [October 2026 OOB security blog](https://devblogs.microsoft.com/dotnet/dotnet-october-2026-oob-security-updates/). Rechecked 2026-10-29. Policy page updated October 25, 2026. This is a platform fact, not a project convention.

| TFM | Kind | Phase on 2026-10-29 | End of support | Latest patch seen |
| --- | --- | --- | --- | --- |
| net10.0 | LTS | Active. Current production default. | 2028-11-14 | 10.0.14 (2026-10-25 OOB) |
| net9.0 | STS | Maintenance. 12 days left. | 2026-11-10 | 9.0.22 (2026-10-25 OOB) |
| net8.0 | LTS | Maintenance. 12 days left. | 2026-11-10 | 8.0.33 (2026-10-25 OOB) |
| net11.0 | STS, not GA | Go-live RC only (`11.0.0-rc.3`, 2026-10-25) | unset | do not default new apps here |

## Agent rules

- New apps and file-based scripts: `net10.0` unless the user names another TFM.
- Existing `net8.0` / `net9.0`: say the 2026-11-10 date and the days left (computed live), then ask before upgrading. Do not rewrite the repo unprompted.
- `net11` / preview TFMs: allowed only when the user asks to try the RC. Do not call it the production default. GA is expected around November 2026; do not invent a ship date.
- `net7.0` and older are out of support. Flag them; still do not upgrade without a yes.
- Prefer the latest patch of the chosen major (10.0.14 / 9.0.22 / 8.0.33 as of 2026-10-29).

Rechecked 2026-10-29: October 25 out-of-band security patches remain the latest on the download page and blog (addresses Brotli CVE and incomplete Oct 13 fixes). No newer patches published.
