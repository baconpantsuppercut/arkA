#!/usr/bin/env node

// Simple schema validator for arkA using AJV
// Validates all example *.json files against schema/video.json

const Ajv = require("ajv");
const fs = require("fs");
const path = require("path");

const ajv = new Ajv({ allErrors: true });
const schema = require("../schema/video.json");

const examplesDir = path.join(__dirname, "../examples");

let failed = false;

console.log("🔍 Validating example metadata files...\n");

fs.readdirSync(examplesDir).forEach((file) => {
  if (file.endsWith(".json")) {
    const fullPath = path.join(examplesDir, file);
    const jsonData = JSON.parse(fs.readFileSync(fullPath, "utf8"));

    const validate = ajv.compile(schema);
    const valid = validate(jsonData);

    if (valid) {
      console.log(`✔ ${file} is valid`);
    } else {
      failed = true;
      console.log(`❌ ${file} FAILED`);
      console.log(validate.errors);
      console.log("\n");
    }
  }
});

if (failed) {
  console.log("❗ Schema validation failed.\n");
  process.exit(1);
} else {
  console.log("\n🎉 All example files validated successfully!");
}