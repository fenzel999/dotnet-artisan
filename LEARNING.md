# 帮项目学习新知识 / Teach the plugin new knowledge

目标：会话里的纠错和最新 .NET 知识，能变成插件下一次能用的规则。

## 三层记忆

| 层级 | 写哪里 | 什么时候 |
|------|--------|----------|
| 会话 / 单项目 | 用户项目里的 `MEMORY.md` | “记住”、“我们从不…”、本仓库约定 |
| 跨项目稳定规则 | `skills/*/references/` + [CHEATSHEET.md](skills/CHEATSHEET.md) | 多次出现、对官方文档有根据 |
| 维护本插件 | `skills/dotnet-grok/` | Grok / GitHub MCP / 健康检查 / PR 流程 |

详细流程：[knowledge-promotion.md](skills/dotnet-grok/references/knowledge-promotion.md)

## 人类可以这么说

```
记住：这个项目用 TimeProvider，不要 DateTime.Now
把这条规则升级到 skills，不要只写 MEMORY.md
查一下 .NET 10 AddValidation 的最新用法，写进对应 reference
```

## 代理必须做的

1. **检测** — 纠错、约定、Grok/MCP 发现。
2. **泛化** — “CreateOrder 里用 TimeProvider” → “一律用 TimeProvider 代替 DateTime.Now”。
3. **去重** — 先读 [CHEATSHEET.md](skills/CHEATSHEET.md) 和 [DECISIONS.md](skills/DECISIONS.md)。
4. **写入** — 会话级 `MEMORY.md`；稳定规则走 promotion playbook。
5. **验证** — 插件本身的改动只提 PR 到 `main`，等待人审。

## 已学会的平台事实（2026-10-16）

再次打开官方下载页与支持政策页（现已更新到 2026-10-13）：

- `net10.0` 最新补丁仍是 10.0.13。
- `net9.0` 最新是 9.0.21。
- `net8.0` 最新是 8.0.32。
- `net8.0` / `net9.0` 停更日仍是 2026-11-10。从 2026-10-16 算还有 25 天。只提醒，先问再升。
- `net11` 仍是 Go-live RC `11.0.0-rc.2`，不是生产默认。

SessionStart 的 POLICY_CHECKED 已更新到 2026-10-16，支持注释引用实际发布的补丁号。倒计时仍按 UTC 活计算。

## 已学会的平台事实（2026-10-14）

下载页与 [October 2026 servicing blog](https://devblogs.microsoft.com/dotnet/dotnet-and-dotnet-framework-october-2026-servicing-updates/) 确认 2026-10-13 补丁已发布（政策页可能滞后）：

- `net10.0` 最新补丁是 10.0.13。
- `net9.0` 最新是 9.0.21。
- `net8.0` 最新是 8.0.32。
- `net8.0` / `net9.0` 停更日仍是 2026-11-10。从 2026-10-14 算还有 27 天。只提醒，先问再升。
- `net11` 仍是 Go-live RC `11.0.0-rc.2`，不是生产默认。

SessionStart 的 POLICY_CHECKED 已更新到 2026-10-14，支持注释现在引用实际发布的补丁号。倒计时仍按 UTC 活计算。

## 不要做的

- 不要把人类指南塞进 `skills/`（人看的放仓库根：QUICKSTART / GUIDE / LEARNING）。
- 不要截断 README、CHANGELOG、INDEX。
- 不要自动合并等待审核的 PR。
- 不要用没根据的社区传闻覆盖现有钢铁规则。
