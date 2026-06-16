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

Grok 用户可直接使用 skills/ 目录下的技能文件，并通过 MCP 集成 .NET 项目工具。

1. 克隆仓库。
2. 在 Grok 环境中加载相关 skills 或使用 MCP 服务器暴露 .NET 功能。
3. dotnet-advisor 自动路由。

MCP 支持让 .NET 项目作为工具服务于 Grok。

## 安装与使用

对于 Claude：
```bash
claude plugins marketplace add fenzel999/dotnet-artisan
claude plugins install dotnet-artisan
```

对于 Grok：加载 skills 并配置 MCP 工具。

## 优化目标

- **插件正常运行**：Hooks、skills 确保兼容。
- **帮助人类**：详细文档。
- **学习新知识**：通过 learning-agent 和 MCP 集成。

详见 [GUIDE.md](GUIDE.md)。