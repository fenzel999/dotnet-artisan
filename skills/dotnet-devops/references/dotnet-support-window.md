# .NET support window (verified 2026-10-14)

Source: [Microsoft .NET download page](https://dotnet.microsoft.com/en-us/download/dotnet) and [October 2026 servicing blog](https://devblogs.microsoft.com/dotnet/dotnet-and-dotnet-framework-october-2026-servicing-updates/). Rechecked 2026-10-14. Policy page still lists older dates in places, but download page and blog confirm the October 13 patches. This is a platform fact, not a project convention.

| TFM | Kind | Phase on 2026-10-14 | End of support | Latest patch seen |
| --- | --- | --- | --- | --- |
| net10.0 | LTS | Active. Current production default. | 2028-11-14 | 10.0.13 (2026-10-13) |
| net9.0 | STS | Maintenance. 27 days left. | 2026-11-10 | 9.0.21 (2026-10-13) |
| net8.0 | LTS | Maintenance. 27 days left. | 2026-11-10 | 8.0.32 (2026-10-13) |
| net11.0 | STS, not GA | Go-live RC only (`11.0.0-rc.2`, 2026-10-13) | unset | do not default new apps here |

## Agent rules

- New apps and file-based scripts: `net10.0` unless the user names another TFM.
- Existing `net8.0` / `net9.0`: say the 2026-11-10 date and the days left (computed live), then ask before upgrading. Do not rewrite the repo unprompted.
- `net11` / preview TFMs: allowed only when the user asks to try the RC. Do not call it the production default. GA is expected around November 2026; do not invent a ship date.
- `net7.0` and older are out of support. Flag them; still do not upgrade without a yes.
- Prefer the latest patch of the chosen major (10.0.13 / 9.0.21 / 8.0.32 as of 2026-10-14).

Rechecked 2026-10-14: October 13 Patch Tuesday patches are published on the download page and blog.
