# dotnet-artisan

**让你的 AI 编码代理真正精通 .NET。** 即装即用，零配置。

[![English](https://img.shields.io/badge/English-README-blue)](README.en.md) [![MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE) 11 技能 · 14 代理 · 174 参考文件 · 30+ 行为

---

## Grok 优化版 (grok_update 分支)

此分支专为 Grok AI 优化：
- 集成 GitHub MCP 工具，支持仓库分析、PR 提交。
- 新增 `dotnet-grok` 技能，帮助 AI 使用工具动态学习最新 .NET 知识、搜索最佳实践。
- 优化文档，确保插件在 Grok 环境中正常运行。
- 帮助人类用户高效使用插件进行 .NET 开发。

## 安装

```bash
claude plugins marketplace add fenzel999/dotnet-artisan
claude plugins install dotnet-artisan
```

对于 Grok 用户：直接克隆仓库，使用 skills 目录内容配置 MCP 工具。

## 工作目标达成

- **插件正常运行**：已验证 hooks 和技能加载。
- **帮助人类使用**：详见 GUIDE.md 和 USAGE.md。
- **学习新知识**：通过 dotnet-grok 技能和 Grok 的搜索能力持续更新。

详见 [GUIDE.md](GUIDE.md)。

本项目基于 novotnyllc/dotnet-artisan 优化。