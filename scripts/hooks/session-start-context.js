#!/usr/bin/env node
//
// session-start-context.js -- SessionStart hook for .NET project detection.
//
// Checks if the session cwd is a .NET project and injects context about
// target framework and project structure.
//
// Output: official hookSpecificOutput JSON on stdout.
// Exit code: always 0 (never blocks).

"use strict";

const fs = require("fs");
const path = require("path");

function readHookInput() {
  try {
    if (process.stdin.isTTY) return {};
    const raw = fs.readFileSync(0, "utf8");
    if (!raw || !raw.trim()) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function findFiles(dir, maxDepth, test) {
  const results = [];
  function walk(current, depth) {
    if (depth > maxDepth) return;
    let entries;
    try {
      entries = fs.readdirSync(current, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      const full = path.join(current, entry.name);
      if (entry.isFile() && test(entry.name)) {
        results.push(full);
        return;
      }
      if (entry.isDirectory() && !entry.name.startsWith(".") && entry.name !== "node_modules" && entry.name !== "bin" && entry.name !== "obj") {
        walk(full, depth + 1);
        if (results.length > 0) return;
      }
    }
  }
  walk(dir, 0);
  return results;
}

function supportNote(tfm) {
  const id = (tfm || "").toLowerCase();
  if (id.startsWith("net8") || id.startsWith("net9")) {
    return " Support note (verified 2026-10-07): net8.0 and net9.0 leave support on 2026-11-10 (34 days). Current LTS is net10.0 through 2028-11-14. Ask before upgrading.";
  }
  if (id.startsWith("net10")) {
    return " Support note (verified 2026-10-07): net10.0 is the current LTS (through 2028-11-14). Latest patch seen is 10.0.12; next Patch Tuesday is 2026-10-13.";
  }
  if (id.startsWith("net11")) {
    return " Support note (verified 2026-10-07): net11 is still 11.0.0-rc.1; do not treat it as the production default.";
  }
  if (id.startsWith("net6") || id.startsWith("net7") || id.startsWith("net5")) {
    return " Support note: this TFM is out of support. Ask before upgrading to net10.0.";
  }
  return "";
}

function emit(context) {
  console.log(JSON.stringify({
    hookSpecificOutput: {
      hookEventName: "SessionStart",
      additionalContext: context || ""
    }
  }));
}

try {
  const input = readHookInput();
  const cwd = input.cwd && fs.existsSync(input.cwd) ? input.cwd : process.cwd();

  const hasSolution = findFiles(cwd, 3, (n) => n.endsWith(".sln") || n.endsWith(".slnx")).length > 0;
  const csprojFiles = findFiles(cwd, 3, (n) => n.endsWith(".csproj") || n.endsWith(".fsproj") || n.endsWith(".vbproj"));
  const hasCsproj = csprojFiles.length > 0;
  const hasGlobalJson = fs.existsSync(path.join(cwd, "global.json"));

  let tfm = "";
  if (csprojFiles.length > 0) {
    try {
      const content = fs.readFileSync(csprojFiles[0], "utf8");
      const match = content.match(/<TargetFrameworks?>([^<;]+)/);
      if (match) tfm = match[1].trim();
    } catch {
      // ignore unreadable project files
    }
  }

  let context = "";
  if (hasSolution || hasCsproj || hasGlobalJson) {
    context =
      "Mandatory first action: invoke [skill:using-dotnet]. Mandatory second action: invoke [skill:dotnet-advisor]. IMPORTANT: before invoking skills, you MUST read root behavior files in order: CLAUDE.md → AGENTS.md → USAGE.md → SELF_DOCUMENTING.md → BEHAVIORS.md → skills/CHEATSHEET.md. Do not plan, reason, design, or implement until both routing skills have been invoked and root files read, then follow advisor routing to load additional skills and apply their standards.";

    let projectContext = "This is a .NET project";
    if (tfm) projectContext += ` (${tfm})`;
    if (hasCsproj) projectContext += " with project files";
    if (hasSolution) projectContext += " in solution files";
    if (hasGlobalJson) projectContext += " and global.json";
    projectContext += ".";
    context += " " + projectContext + supportNote(tfm);
  }

  emit(context);
} catch {
  emit("");
}

process.exit(0);
