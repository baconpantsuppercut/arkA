/* eslint-disable no-console */

const fs = require("fs");
const path = require("path");
const Ajv = require("ajv").default;
const addFormats = require("ajv-formats");

// AJV instance with formats enabled
const ajv = new Ajv({
  allErrors: true,
  strict: false
});
addFormats(ajv);

// Load the video schema
const schemaPath = path.join(__dirname, "..", "schema", "video.schema.json");
const schemaRaw = fs.readFileSync(schemaPath, "utf8");
const schema = JSON.parse(schemaRaw);

const validate = ajv.compile(schema);

// Only validate the video example files, not index.json
const examplesDir = path.join(__dirname, "..", "examples");
const exampleFiles = fs
  .readdirSync(examplesDir)
  .filter((file) => file.startsWith("video-") && file.endsWith(".json"));

console.log("Validating example files against schema...");

let hasError = false;

for (const file of exampleFiles) {
  const fullPath = path.join(examplesDir, file);
  const raw = fs.readFileSync(fullPath, "utf8");
  const data = JSON.parse(raw);

  const valid = validate(data);

  if (valid) {
    console.log(`✅ ${file} is valid.`);
  } else {
    hasError = true;
    console.log(`❌ ${file} is INVALID:`);
    console.log(validate.errors);
  }
}

if (hasError) {
  process.exit(1);
} else {
  console.log("✅ All example video files are valid.");
}