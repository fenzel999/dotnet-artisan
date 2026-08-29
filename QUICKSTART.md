# 快速上手 / Quickstart

目标：让人类在 2 分钟内确认插件能装上、能跑、能学习。

## 1. 安装

```bash
claude plugins marketplace add fenzel999/dotnet-artisan
claude plugins install dotnet-artisan
claude plugins list
```

应该能看到 `dotnet-artisan`。

GitHub Copilot / VS Code / Cursor / Grok：打开含 `.csproj` 的目录即可。Harness hooks 会自动加载技能。

## 2. 验证插件能否正常运行

1. 打开任意含 `.csproj` / `.sln` / `.slnx` 的目录。
2. 问：`这个项目用的什么 .NET 版本？`
3. 预期：能读出 `TargetFramework` 或 `global.json`。
4. 再问：`给这个 API 补一个单元测试` — 应该走 `dotnet-testing` + xUnit，而不是随便写 NUnit。
5. 钢铁规则烟雾测试：`用 DateTime.Now 记录时间` — 应该改用 `TimeProvider`。

详细清单：[plugin-verification.md](skills/dotnet-workflow/references/plugin-verification.md)

## 3. 每日用法（不用记技能名）

| 你说 | 决策者会路由到 |
|------|----------------|
| 我要一个订单 API | `dotnet-advisor` → `dotnet-api` |
| 生产崩溃 / OOM | `dotnet-debugging` |
| 审查安全 | `dotnet-security-reviewer`（只读） |
| 记住：用 TimeProvider | `dotnet-learning-agent` |
| Grok / GitHub MCP 维护本仓库 | `dotnet-grok` |

## 4. 帮项目学新知识

发现可复用的 .NET 约定后：

1. 先对照 [CHEATSHEET.md](skills/CHEATSHEET.md) 去重。
2. 会话级纠错交给 `dotnet-learning-agent` 写入 `MEMORY.md`。
3. 跨项目稳定规则按 [knowledge-promotion.md](skills/dotnet-grok/references/knowledge-promotion.md) 写进 `skills/*/references/`。

更多满血用法：[GUIDE.md](GUIDE.md) · [GUIDE.en.md](GUIDE.en.md)
