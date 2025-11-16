// scripts/validate-all.js
// Validate only per-video example files against the video schema.

import fs from 'node:fs';
import path from 'node:path';
import Ajv from 'ajv';

const ajv = new Ajv({ allErrors: true, strict: false });

const schemaPath = path.join('schema', 'video.schema.json');
const schemaRaw = fs.readFileSync(schemaPath, 'utf-8');
const schema = JSON.parse(schemaRaw);
const validate = ajv.compile(schema);

const examplesDir = 'examples';

// Only validate files that start with "video-" and end with ".json"
const exampleFiles = fs
  .readdirSync(examplesDir)
  .filter((f) => f.startsWith('video-') && f.endsWith('.json'));

let hasErrors = false;

for (const file of exampleFiles) {
  const fullPath = path.join(examplesDir, file);
  console.log(`Validating ${file}...`);

  const raw = fs.readFileSync(fullPath, 'utf-8');
  const data = JSON.parse(raw);

  const valid = validate(data);
  if (!valid) {
    hasErrors = true;
    console.log(`${fullPath} invalid`);
    console.log(validate.errors);
    console.log();
  }
}

if (hasErrors) {
  console.error('❌ Some example files FAILED validation.');
  process.exit(1);
} else {
  console.log('✅ All per-video example files passed validation.');
}