# 快速上手 / Quickstart

目标：让人类在 2 分钟内确认插件能装上、能跑、能学习。

最近复核：2026-10-07。分支 `grok_update` → PR #16 → `main`，**等待人审，不要自动合并**。插件版本 1.0.8。

## 1. 安装

```bash
claude plugins marketplace add fenzel999/dotnet-artisan
claude plugins install dotnet-artisan
claude plugins list
```

应该能看到 `dotnet-artisan`。合并前，marketplace 安装到的是 `main`（11 技能）。要用本次修复，需要从 `grok_update` 装，或等 PR #16 合入 `main`。

GitHub Copilot / VS Code / Cursor：打开含 `.csproj` 的目录即可。Grok 不会自己执行 `claude plugins install`；它读仓库里的技能和钩子，并用 GitHub MCP 维护分支。

清单以仓库实数为准：**13 技能 / 14 代理 / 177 参考**（`skills/*/references/*.md`）。

## 2. 验证插件能否正常运行

“能跑”分两层，不要混在一起：

| 层 | 谁来确认 | 怎么算通过 |
|------|----------|----------|
| 钩子脚本 | 任何人，本地 Node | `node scripts/hooks/smoke-test.js` 打印 `OK hook smoke test` |
| Claude Code 注入 | 人开一次新会话 | 问项目版本时能读出 TFM，并出现 `using-dotnet` → `dotnet-advisor` |

1. 打开任意含 `.csproj` / `.fsproj` / `.vbproj` / `.sln` / `.slnx` 的目录。
2. 问：`这个项目用的什么 .NET 版本？`
3. 预期：能读出 `TargetFramework` 或 `global.json`。`net8` / `net9` 应该提到 2026-11-10 停更（距 2026-10-07 还有 34 天），并先问再升级。
4. 再问：`给这个 API 补一个单元测试` — 应该走 `dotnet-testing` + xUnit，而不是随便写 NUnit。
5. 钢铁规则烟雾测试：`用 DateTime.Now 记录时间` — 应该改用 `TimeProvider`。net10.0+ 不要新加 FluentValidation，用 `AddValidation()`。
6. 用 Grok + GitHub MCP 维护本仓库时：先读 `LEARNING.md` 与 `skills/dotnet-grok/SKILL.md`，只在已有 `grok_update` 上改，更新 PR #16，等审核，不要自动合并，也不要再开第二个 PR。

详细清单：[plugin-verification.md](skills/dotnet-workflow/references/plugin-verification.md)

## 3. 排障（装上了但“没感觉”）

| 现象 | 先查 |
|------|------|
| `plugins list` 没有插件 | 重跑两条安装命令；确认 marketplace 源是 `fenzel999/dotnet-artisan` |
| 问版本却不读 csproj | 当前目录有没有 `.csproj` / `.sln`；SessionStart matcher 必须是 `startup\|resume\|clear\|compact\|fork`，不能是文件名 glob |
| 提示钩子没触发 | 脚本必须读 stdin 的 `cwd`，不能只扫 `process.cwd()`；输出必须是 `hookSpecificOutput.additionalContext` |
| 常用 DateTime.Now / FluentValidation | 看 [CHEATSHEET.md](skills/CHEATSHEET.md)；这是决策者的钢铁规则 |
| 想改插件本身 | 走 `dotnet-grok`，只在 `grok_update` 上改，PR 到 `main` 等审核 |

Hooks 位置必须是 `hooks/hooks.json`（官方 spec）。失败时零阻塞，不会拦住你写代码。

## 4. 每日用法（不用记技能名）

| 你说 | 决策者会路由到 |
|------|----------------|
| 我要一个订单 API | `dotnet-advisor` → `dotnet-api` |
| 生产崩溃 / OOM | `dotnet-debugging` |
| 审查安全 | `dotnet-security-reviewer`（只读） |
| 记住：用 TimeProvider | `dotnet-learning-agent` |
| Grok / GitHub MCP 维护本仓库 | `dotnet-grok` |

## 5. 帮项目学新知识

发现可复用的 .NET 约定后：

1. 先对照 [CHEATSHEET.md](skills/CHEATSHEET.md) 去重。
2. 会话级纠错交给 `dotnet-learning-agent` 写入 `MEMORY.md`。
3. 跨项目稳定规则按 [LEARNING.md](LEARNING.md) 和 [knowledge-promotion.md](skills/dotnet-grok/references/knowledge-promotion.md) 写进 `skills/*/references/`。
4. 平台事实（支持窗口、补丁号）只写官方页上能看到的数字。截止 2026-10-07：`net10.0` 仍是 10.0.12，`net11` 仍是 `11.0.0-rc.1`。

更多满血用法：[GUIDE.md](GUIDE.md) · [GUIDE.en.md](GUIDE.en.md)
