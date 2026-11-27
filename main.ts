import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createHash } from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const srcPath = join(__dirname, 'entry.png');

if (!existsSync(srcPath)) {
  console.error(`Source not found: ${srcPath}`);
  process.exit(1);
}

const data = readFileSync(srcPath);

if (data.length === 0) {
  console.error('Source file is empty');
  process.exit(1);
}

const outDir = '/output';
if (!existsSync(outDir)) {
  mkdirSync(outDir, { recursive: true });
}

const outPath = join(outDir, 'entry.png');
writeFileSync(outPath, data);

const outData = readFileSync(outPath);
if (outData.length === 0) {
  console.error('Output file is empty after write');
  process.exit(1);
}

if (outData.length !== data.length) {
  console.error('Output size mismatch');
  process.exit(1);
}

const hash = createHash('sha256').update(outData).digest('hex');
console.log(hash);
