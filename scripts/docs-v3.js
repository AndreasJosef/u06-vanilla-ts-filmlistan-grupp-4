// scripts/docs.js
import fs from "node:fs";
import path from "node:path";

// Config
const SOURCE_DIR = "./src";
const OUTPUT_FILE = "./REFERENCE.md";

// 1. Recursive File Walker
function getFiles(dir) {
  const dirents = fs.readdirSync(dir, { withFileTypes: true });
  const files = dirents.map((dirent) => {
    const res = path.resolve(dir, dirent.name);
    return dirent.isDirectory() ? getFiles(res) : res;
  });
  return Array.prototype.concat(...files).filter((f) => f.endsWith(".ts"));
}

// 2. The Hardcore Parser
function extractDocs(content) {
  const items = [];
  let fileDescription = null;

  // STEP A: The Macro Header (File Level)
  const fileHeaderRegex = /^\s*\/\*\*([\s\S]*?)\*\//;
  const headerMatch = content.match(fileHeaderRegex);

  if (headerMatch) {
    const raw = headerMatch[1];
    // Filter out if it's just a license header or detached comment
    if (
      raw.includes("@module") ||
      raw.includes("@description") ||
      !content.match(/^\s*\/\*\*[\s\S]*?\*\/\s*export/)
    ) {
      fileDescription = raw
        .split("\n")
        .map((line) => line.replace(/^\s*\*\s?/, "").trim())
        .filter((line) => line !== "")
        .join(" ");
    }
  }

  // STEP B: Find ALL Exports (The Dragnet)
  // We capture the export type (const, function, etc) and the name
  // We also capture the preceding text to check for comments
  const exportRegex =
    /((?:\/\*\*[\s\S]*?\*\/[\s\n]*)?)export\s+(?:async\s+)?(function|const|type|interface|class|enum)\s+([a-zA-Z0-9_]+)/g;

  let match;
  while ((match = exportRegex.exec(content)) !== null) {
    const fullMatch = match[0];
    const commentBlock = match[1]; // The captured comment (if any)
    const typeKeyword = match[2]; // function, const, type...
    const name = match[3]; // toggleSeenStatus

    // Filter out non-code constants if you want (like simple config strings)
    // For hardcore mode, we keep everything.

    if (commentBlock && commentBlock.trim().length > 0) {
      // ✅ DOCUMENTED
      const cleanComment = commentBlock
        .replace(/\/\*\*/, "")
        .replace(/\*\//, "")
        .split("\n")
        .map((line) => line.replace(/^\s*\*\s?/, "").trim())
        .filter((line) => line !== "")
        .join("\n");

      items.push({
        name,
        signature: `export ${typeKeyword} ${name}`,
        comment: cleanComment,
        status: "ok",
      });
    } else {
      // ❌ UNDOCUMENTED (The Shame)
      items.push({
        name,
        signature: `export ${typeKeyword} ${name}`,
        comment: "_No documentation provided._",
        status: "missing",
      });
    }
  }

  return { fileDescription, items };
}

// 3. The Builder
function generateMarkdown() {
  const files = getFiles(SOURCE_DIR);

  // Stats for the "Gamification"
  let totalItems = 0;
  let documentedItems = 0;
  let missingFiles = 0;

  let outputBody = "";

  files.forEach((filePath) => {
    const content = fs.readFileSync(filePath, "utf-8");
    const { fileDescription, items } = extractDocs(content);
    const relativePath = path.relative(process.cwd(), filePath);

    // Skip index.ts files usually (exports only)
    if (relativePath.endsWith("index.ts")) return;

    if (items.length > 0) {
      totalItems += items.length;
      documentedItems += items.filter((i) => i.status === "ok").length;
      if (!fileDescription) missingFiles++;

      outputBody += `## 📂 \`${relativePath}\`\n\n`;

      // MACRO HEADER STATUS
      if (fileDescription) {
        outputBody += `> ${fileDescription}\n\n`;
      } else {
        outputBody += `> 🔴 **FILE MISSING DESCRIPTION**\n\n`;
      }

      // Sort: Missing first!
      items.sort((a, b) => (a.status === "missing" ? -1 : 1));

      items.forEach((doc) => {
        const icon = doc.status === "missing" ? "🔴" : "🟢";
        outputBody += `### ${icon} **${doc.name}**\n`;
        outputBody += `${doc.comment}\n\n`;
        outputBody += "```typescript\n" + doc.signature + "\n```\n\n";
      });

      outputBody += "---\n\n";
    }
  });

  // 4. The Scoreboard (Top of File)
  const coverage =
    totalItems === 0 ? 100 : Math.round((documentedItems / totalItems) * 100);
  const color = coverage > 80 ? "green" : coverage > 50 ? "orange" : "red";

  let header = `# Reference Documentation\n\n`;
  header += `![Coverage](https://img.shields.io/badge/Coverage-${coverage}%25-${color})\n`;
  header += `\n**Total Exports:** ${totalItems} | **Documented:** ${documentedItems} | **Undocumented:** ${totalItems - documentedItems}\n`;
  if (missingFiles > 0)
    header += `\n⚠️ **${missingFiles} files are missing a Macro Description.**\n`;
  header += `\n---\n\n`;

  fs.writeFileSync(OUTPUT_FILE, header + outputBody);
  console.log(
    `\x1b[32m✔ Hardcore Docs generated: ${coverage}% coverage.\x1b[0m`,
  );
}

generateMarkdown();
