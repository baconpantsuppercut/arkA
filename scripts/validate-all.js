/* eslint-env node */

const fs = require("fs");
const path = require("path");
const Ajv = require("ajv");

const ajv = new Ajv({ allErrors: true });

const schemaPath = path.join(__dirname, "..", "schema", "video.schema.json");
const schema = JSON.parse(fs.readFileSync(schemaPath, "utf8"));
const validate = ajv.compile(schema);

const examplesDir = path.join(__dirname, "..", "examples");

// Only validate files that start with "video-"
const exampleFiles = fs
  .readdirSync(examplesDir)
  .filter((file) => file.startsWith("video-") && file.endsWith(".json"));

console.log("Validating example files against schema...");

let hasErrors = false;

for (const file of exampleFiles) {
  const fullPath = path.join(examplesDir, file);
  const data = JSON.parse(fs.readFileSync(fullPath, "utf8"));

  const valid = validate(data);

  if (!valid) {
    hasErrors = true;
    console.error(`❌ ${file} is INVALID:`);
    console.error(validate.errors);
  } else {
    console.log(`✅ ${file} is valid.`);
  }
}

if (hasErrors) {
  process.exit(1);
} else {
  console.log("✅ All example files passed validation.");
}