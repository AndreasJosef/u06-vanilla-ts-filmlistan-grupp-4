// scripts/docs.js
import fs from "node:fs";
import path from "node:path";

const SOURCE_DIR = "./src";
const OUTPUT_FILE = "./REFERENCE.md";

function getFiles(dir) {
  const dirents = fs.readdirSync(dir, { withFileTypes: true });
  const files = dirents.map((dirent) => {
    const res = path.resolve(dir, dirent.name);
    return dirent.isDirectory() ? getFiles(res) : res;
  });
  return Array.prototype.concat(...files).filter((f) => f.endsWith(".ts"));
}

function extractDocs(content) {
  const items = [];

  // REGEX 1: Documented Items (/** ... */ export ...)
  const docRegex =
    /\/\*\*([\s\S]*?)\*\/\s*(export\s+(?:async\s+)?(?:function|const|type|interface|class|enum)\s+([a-zA-Z0-9_]+)[^{;=]*)/g;

  // REGEX 2: Undocumented Types (export type/interface ...)
  // We want to shame ourselves into documenting these by listing them!
  const typeRegex =
    /^(?!\s*\/\*\*)\s*export\s+(type|interface|enum)\s+([a-zA-Z0-9_]+)/gm;

  let match;
  const foundNames = new Set();

  // 1. Find Documented Items
  while ((match = docRegex.exec(content)) !== null) {
    const rawComment = match[1];
    const signature = match[2].trim();
    const name = match[3];
    foundNames.add(name);

    const cleanComment = rawComment
      .split("\n")
      .map((line) => line.replace(/^\s*\*\s?/, "").trim())
      .filter((line) => line !== "")
      .join("\n");

    items.push({ name, signature, comment: cleanComment, type: "doc" });
  }

  // 2. Find Undocumented Types (The "Missing" list)
  while ((match = typeRegex.exec(content)) !== null) {
    const typeKeyword = match[1];
    const name = match[2];

    // Only add if we didn't already find it in the "Documented" loop
    if (!foundNames.has(name)) {
      items.push({
        name,
        signature: `export ${typeKeyword} ${name}`,
        comment: "_No documentation provided._",
        type: "missing",
      });
    }
  }

  return items;
}

function generateMarkdown() {
  const files = getFiles(SOURCE_DIR);
  let output = `# Reference Docs \n\n_Auto-generated. Types without docs are marked._\n\n`;

  files.forEach((filePath) => {
    const content = fs.readFileSync(filePath, "utf-8");
    const docs = extractDocs(content);
    const relativePath = path.relative(process.cwd(), filePath);

    if (docs.length > 0) {
      output += `## 📂 \`${relativePath}\`\n\n`;

      // Sort: Documented first, then Undocumented
      docs.sort((a, b) => (a.type === "missing" ? 1 : -1));

      docs.forEach((doc) => {
        const icon = doc.type === "missing" ? "⚠️" : "🔹";
        output += `### ${icon} **${doc.name}**\n`;
        output += `${doc.comment}\n\n`;
        output += "```typescript\n" + doc.signature + "\n```\n\n";
      });

      output += "---\n\n";
    }
  });

  fs.writeFileSync(OUTPUT_FILE, output);
  console.log(`\x1b[32m✔ Documentation generated at ${OUTPUT_FILE}\x1b[0m`);
}

generateMarkdown();
