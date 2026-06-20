# dotnet-artisan

**让你的 AI 编码代理真正精通 .NET。** 即装即用，零配置。

11 技能 · 14 代理 · 174 参考文件 · 30+ 行为

## Grok 优化 (grok_update 分支)

* 集成 Grok MCP 工具，支持仓库分析、分支创建、PR 提交。
* 新增和优化 dotnet-grok 技能，帮助 AI 学习新 .NET 知识，使用工具进行动态优化。
* 确保插件正常运行于 Grok、Claude 等环境。
* 帮助人类用户高效使用 .NET 开发代理，提供清晰指南。
* 通过 MCP 工具持续改进仓库内容。

## 安装

claude plugins marketplace add fenzel999/dotnet-artisan
claude plugins install dotnet-artisan

对于 Grok：直接使用 skills 目录并配置 MCP 工具。

## 目标

* 插件正常运行
* 帮助人类使用这个插件
* 项目学习新的知识，通过 Grok 的搜索和分析能力

详见 GUIDE.md 和 skills/dotnet-grok/SKILL.md。