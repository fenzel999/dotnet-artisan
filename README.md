# dotnet-artisan

**让你的 AI 编码代理真正精通 .NET。** 即装即用，零配置。

[![English](https://img.shields.io/badge/English-README-blue)](README.en.md) [![MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE) 11 技能 · 14 代理 · 174 参考文件 · 30+ 行为

---

## 简介

dotnet-artisan 是一个支持 Claude Code、Grok (xAI)、Cursor 等 AI 编码代理的 .NET 开发插件，让 AI 能够正确编写高质量 .NET 代码。

它整合了 .NET 最佳实践，支持 MCP 工具集成，帮助项目学习新知识并正常运行。

本项目已优化 grok_update 分支，增强兼容性。

[Web 版 →](https://fenzel999.github.io/dotnet-artisan)

---

## 安装

对于 Claude:
```bash
claude plugins marketplace add fenzel999/dotnet-artisan
claude plugins install dotnet-artisan
```

对于 Grok 和其他: 参考对应 AI 平台的技能/MCP 加载方式，插件文件结构通用。

打开任意 .NET 项目即用。

## 优化

- 添加 Grok 支持
- 更新 .NET 10/11 指导
- 增强 MCP 工具集成
- 帮助用户学习 .NET 知识

更多详见 GUIDE.md 和 USAGE.md。
