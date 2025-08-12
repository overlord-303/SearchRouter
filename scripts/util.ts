import { fileURLToPath } from 'url';
import path from "path";

export function log(...msg: string[]): void
{
    msg.forEach(m => console.log(m));
}

export const __filename = fileURLToPath(import.meta.url);
export const __dirname  = path.dirname(__filename);
