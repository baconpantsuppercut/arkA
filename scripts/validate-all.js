// scripts/validate-all.js
// Validate arkA example video metadata against schema/video.schema.json

const fs = require("fs");
const path = require("path");
const Ajv = require("ajv");

const ajv = new Ajv({
  allErrors: true,
  strict: false
});

// Load the schema
const schemaPath = path.join(__dirname, "..", "schema", "video.schema.json");
const schemaRaw = fs.readFileSync(schemaPath, "utf8");
const schema = JSON.parse(schemaRaw);
const validate = ajv.compile(schema);

const examplesDir = path.join(__dirname, "..", "examples");

// Only validate per-video example files (video-*.json)
const exampleFiles = fs
  .readdirSync(examplesDir)
  .filter((name) => name.startsWith("video-") && name.endsWith(".json"));

let hasErrors = false;

for (const file of exampleFiles) {
  const fullPath = path.join(examplesDir, file);
  const data = JSON.parse(fs.readFileSync(fullPath, "utf8"));

  const valid = validate(data);

  if (!valid) {
    hasErrors = true;
    console.log(`${fullPath} invalid`);
    console.log(validate.errors);
    console.log();
  } else {
    console.log(`${fullPath} ✔ valid`);
  }
}

if (hasErrors) {
  console.error("❌ Some example files FAILED validation.");
  process.exit(1);
} else {
  console.log("✅ All per-video example files passed validation.");
}