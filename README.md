# dotnet-artisan

**让你的 AI 编码代理真正精通 .NET。** 即装即用，零配置。

[![English](https://img.shields.io/badge/English-README-blue)](README.en.md) [![MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE) 11 技能 · 14 代理 · 174 参考文件 · 30+ 行为

---

## 简介

dotnet-artisan 是一个支持 Claude Code、Grok (xAI)、Cursor 等 AI 编码代理的 .NET 开发插件，让 AI 能够正确编写高质量 .NET 代码。

它整合了 .NET 最佳实践，支持 MCP 工具集成，帮助项目学习新知识并确保插件正常运行。

本项目在 grok_update 分支优化了 Grok 兼容性，增强了技能加载和 MCP 支持。

学习自 [dotnet/skills](https://github.com/dotnet/skills) 等优秀项目。

[Web 版 →](https://fenzel999.github.io/dotnet-artisan)

---

## Grok 使用指南

Grok 用户可直接加载 skills/ 目录下的技能。

1. 克隆仓库到本地。
2. 使用 Grok 的插件/技能管理加载 dotnet-artisan。
3. dotnet-advisor 将自动路由 .NET 任务。

MCP 支持允许 .NET 项目暴露工具给 Grok。

## 安装 (Claude)

```bash
claude plugins marketplace add fenzel999/dotnet-artisan
claude plugins install dotnet-artisan
```

通用结构适用于 Grok 等。

## 工作目标

- **插件正常运行**：Hooks 和 skills 确保上下文加载。
- **帮助人类使用**：详细文档和自动路由。
- **项目学习新知识**：通过 learning-agent 和 references 持续优化。

详见 [GUIDE.md](GUIDE.md) 和 [USAGE.md](USAGE.md)。