// scripts/validate-all.js
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const schema = "schema/video.schema.json";
const dir = "examples";

const files = fs.readdirSync(dir).filter(f => f.endsWith(".json"));

let failed = false;

for (const file of files) {
  console.log(`\nValidating ${file}...`);
  try {
    execSync(`npx ajv validate -s ${schema} -d ${dir}/${file} --strict=false`, {
      stdio: "inherit"
    });
  } catch (err) {
    failed = true;
  }
}

if (failed) {
  console.error("\n❌ Some example files FAILED validation.");
  process.exit(1);
} else {
  console.log("\n✅ All example files are valid!");
}