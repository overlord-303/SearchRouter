import { fileURLToPath } from 'url';
import path from "path";
import fs from "fs";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname  = path.dirname(__filename);

export const version = JSON.parse(
    fs.readFileSync(
        path.join(__dirname, '../package.json'),
        'utf8'
    )
).version;
