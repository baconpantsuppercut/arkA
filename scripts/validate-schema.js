// Simple schema validation script using AJV
// Validates all JSON files in /examples against schema/video.schema.json

import Ajv from "ajv";
import fs from "fs";
import path from "path";
import url from "url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ajv = new Ajv({ allErrors: true, strict: false });

// Path to the main arkA video schema
const schemaPath = path.join(__dirname, "..", "schema", "video.schema.json");
const schemaRaw = fs.readFileSync(schemaPath, "utf8");
const schema = JSON.parse(schemaRaw);

const validate = ajv.compile(schema);

// Directory containing example metadata files
const examplesDir = path.join(__dirname, "..", "examples");

const files = fs
  .readdirSync(examplesDir)
  .filter((f) => f.endsWith(".json"));

let hasErrors = false;

for (const file of files) {
  const fullPath = path.join(examplesDir, file);
  const dataRaw = fs.readFileSync(fullPath, "utf8");
  const data = JSON.parse(dataRaw);

  const valid = validate(data);

  if (!valid) {
    hasErrors = true;
    console.error(`❌ ${file} is INVALID:`);
    console.error(validate.errors);
    console.error("----");
  } else {
    console.log(`✅ ${file} is valid.`);
  }
}

if (hasErrors) {
  console.error("Schema validation failed.");
  process.exit(1);
} else {
  console.log("All example files are valid.");
  process.exit(0);
}