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

// 2. The Parser
function extractDocs(content, filename) {
  // Regex: Finds /** ... */ blocks followed immediately by 'export ...'
  // Captures: [1] The Comment, [2] The Signature (function/type/const)
  const regex =
    /\/\*\*([\s\S]*?)\*\/\s*(export\s+(?:async\s+)?(?:function|const|type|interface|class)\s+([a-zA-Z0-9_]+)[^{;=]*)/g;

  let match;
  const docs = [];

  while ((match = regex.exec(content)) !== null) {
    const rawComment = match[1];
    const signature = match[2].trim();
    const name = match[3];

    // Clean up the comment lines (remove * and spaces)
    const cleanComment = rawComment
      .split("\n")
      .map((line) => line.replace(/^\s*\*\s?/, "").trim())
      .filter((line) => line !== "") // Remove empty lines
      .join("\n");

    docs.push({ name, signature, comment: cleanComment });
  }

  return docs;
}

// 3. The Builder
function generateMarkdown() {
  const files = getFiles(SOURCE_DIR);
  let output = `# Reference Docs \n\n_Auto-generated from source code._\n\n`;

  files.forEach((filePath) => {
    const content = fs.readFileSync(filePath, "utf-8");
    const docs = extractDocs(content, filePath);

    // Make path relative for display
    const relativePath = path.relative(process.cwd(), filePath);

    if (docs.length > 0) {
      output += `## 📂 \`${relativePath}\`\n\n`;

      docs.forEach((doc) => {
        output += `### **${doc.name}**\n`;
        // Format the comment as a blockquote or text
        output += `${doc.comment}\n\n`;
        // Code block for the signature
        output += "```typescript\n" + doc.signature + "\n```\n\n";
        output += "---\n\n";
      });
    }
  });

  fs.writeFileSync(OUTPUT_FILE, output);
  console.log(`\x1b[32m✔ Documentation generated at ${OUTPUT_FILE}\x1b[0m`);
}

generateMarkdown();
