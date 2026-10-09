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

const NET8_NET9_EOS = "2026-11-10";
const NET10_EOS = "2028-11-14";
const NEXT_PATCH_TUESDAY = "2026-10-13";
const POLICY_CHECKED = "2026-10-09";

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

function utcDaysUntil(isoDate) {
  const end = Date.parse(isoDate + "T00:00:00Z");
  const now = new Date();
  const start = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  return Math.round((end - start) / 86400000);
}

function supportNote(tfm) {
  const id = (tfm || "").toLowerCase();
  const left = utcDaysUntil(NET8_NET9_EOS);
  const leftText = left > 0 ? left + " days left" : "support ended";
  if (id.startsWith("net8") || id.startsWith("net9")) {
    return " Support note (policy page still 2026-09-08, rechecked " + POLICY_CHECKED + "): net8.0 and net9.0 leave support on " + NET8_NET9_EOS + " (" + leftText + "). Current LTS is net10.0 through " + NET10_EOS + ". Ask before upgrading.";
  }
  if (id.startsWith("net10")) {
    return " Support note (policy page still 2026-09-08, rechecked " + POLICY_CHECKED + "): net10.0 is the current LTS (through " + NET10_EOS + "). Latest patch seen is 10.0.12; do not invent 10.0.13 before Patch Tuesday " + NEXT_PATCH_TUESDAY + ".";
  }
  if (id.startsWith("net11")) {
    return " Support note (rechecked " + POLICY_CHECKED + "): net11 is still 11.0.0-rc.1; do not treat it as the production default.";
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
