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

## 已学会的维护规则（2026-10-02）

Claude Code 插件的 `SessionStart` matcher 匹配会话来源（`startup|resume|clear|compact|fork`），不是文件名。写成 `*.cs` 时钩子不会跑，插件看起来已安装但不会注入 .NET 上下文。

`SessionStart` 和 `UserPromptSubmit` 都要读 stdin 里的 `cwd`，不能只用 `process.cwd()`。进程工作目录和会话目录不一致时，提示钩子会把 .NET 仓库判成非 .NET，路由提醒不会出现。输出必须是 `hookSpecificOutput.additionalContext`，且始终 exit 0。来源：[Hooks reference](https://code.claude.com/docs/en/hooks)。

F# 项目（`.fsproj` / `.fs`）也算 .NET 仓库，检测不能只看 `.csproj`。VB 的 `.vbproj` 同样算。

## 已学会的维护规则（2026-10-04）

`PostToolUse` 的工具参数在 stdin JSON 的 `tool_input.file_path`，不在 `CLAUDE_TOOL_INPUT` 环境变量。只读环境变量时，新建领域文件的“一行用途注释”提醒永远不会出现，30 秒自说明规则看起来失效。脚本应先读 stdin，再回退环境变量；输出仍用 `hookSpecificOutput`，并始终 exit 0。`Program.cs` 等脚手架文件继续跳过。

本地验证：`node scripts/hooks/smoke-test.js`（覆盖 SessionStart TFM、`.fsproj`、路由去重、PostToolUse 提醒与 Program.cs 跳过）。

## 已学会的平台事实（2026-10-05）

官方支持窗口（[support policy](https://dotnet.microsoft.com/en-us/platform/support/policy)，页面更新于 2026-09-08）：

- `net10.0` 是当前 LTS，支持到 2028-11-14。新项目默认用它。
- `net8.0` 和 `net9.0` 都在 2026-11-10 停更。只提醒，不得未经询问就升级。
- `net11` 在 2026-10-05 仍是 RC（`11.0.0-rc.1`），不是生产默认。

写入 `skills/dotnet-devops/references/dotnet-support-window.md`。SessionStart 在检到对应 TFM 时把同一句话注入上下文，让人能看到插件真的读到了项目。

## 已学会的维护规则（2026-10-06）

计数漂移会让人以为插件坏了。以目录实数为准，不要抄旧 changelog：13 个 `skills/*/SKILL.md`、14 个 `agents/*.md`、177 个 `skills/*/references/*.md`。README / AGENTS / QUICKSTART 必须跟这个数走。

`node scripts/hooks/smoke-test.js` 在 2026-10-06 通过（SessionStart TFM、`.fsproj`、路由去重、PostToolUse）。钩子脚本本身能跑；Claude Code 里是否注入，仍要人开一次新会话确认。

## 已学会的平台事实（2026-10-07）

再次打开官方支持政策页与下载页，仍是 2026-09-08 更新，没有新补丁：

- `net10.0` 最新补丁仍是 10.0.12。下一个 Patch Tuesday 是 2026-10-13，在那之前不要写 10.0.13。
- `net8.0` / `net9.0` 停更日仍是 2026-11-10。从 2026-10-07 算还有 34 天。只提醒，先问再升。
- `net11` 仍是 Go-live RC `11.0.0-rc.1`，不是生产默认。不要编造 GA 日期。

Grok 不能替人执行 `claude plugins install`。钩子脚本能跑，不等于 Claude Code 会话里已经注入。两层都要写进 QUICKSTART，避免把“仓库健康”说成“插件已在用户机器上生效”。

## 已学会的维护规则（2026-10-08）

SessionStart 认 `.vbproj` 不够。`UserPromptSubmit` 之前只扫 `.csproj` / `.fsproj` 和 `.cs` / `.fs`。纯 VB 仓库里，人问“加一个折扣计算”这种不带 .NET 关键词的话，路由提醒不会出现，插件看起来没装上。提示钩子现在同样认 `.vbproj` / `.vb`，关键词补上 `vb.net` / `vbproj`。烟雾测试用不含 .NET 字样的提示覆盖这条。

支持窗口没有新官方页：从 2026-10-08 算，net8/net9 距 2026-11-10 还有 33 天。在 2026-10-13 Patch Tuesday 之前不要写 10.0.13。

## 不要做的

- 不要把人类指南塞进 `skills/`（人看的放仓库根：QUICKSTART / GUIDE / LEARNING）。
- 不要截断 README、CHANGELOG、INDEX。
- 不要自动合并等待审核的 PR。
- 不要用没根据的社区传闻覆盖现有钢铁规则。
