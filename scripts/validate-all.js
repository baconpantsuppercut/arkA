/* eslint-env node */

const fs = require("fs");
const path = require("path");
const Ajv = require("ajv");

const ajv = new Ajv({
  allErrors: true,
  strict: false, // don't treat warnings (like unknown formats) as fatal
});

const schemaPath = path.join(__dirname, "..", "schema", "video.schema.json");
const examplesDir = path.join(__dirname, "..", "examples");

const schemaRaw = fs.readFileSync(schemaPath, "utf8");
const schema = JSON.parse(schemaRaw);
const validate = ajv.compile(schema);

console.log("Validating example files against schema...");

// Only validate actual *video* examples, not the collection index.
const files = fs
  .readdirSync(examplesDir)
  .filter(
    (name) =>
      name.endsWith(".json") &&
      name !== "index.json" // <– skip index.json for now; it has a different shape
  );

let hasError = false;

for (const file of files) {
  const fullPath = path.join(examplesDir, file);
  const dataRaw = fs.readFileSync(fullPath, "utf8");
  const data = JSON.parse(dataRaw);

  const ok = validate(data);

  if (!ok) {
    hasError = true;
    console.error(`❌ ${file} is INVALID:`);
    console.error(validate.errors);
  } else {
    console.log(`✅ ${file} is valid.`);
  }
}

if (hasError) {
  console.error("❌ One or more example files failed validation.");
  process.exit(1);
}

console.log("✅ All example files passed validation.");