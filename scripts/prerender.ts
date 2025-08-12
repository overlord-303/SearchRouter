import { register } from 'esbuild-register/dist/node';
import { fileURLToPath } from 'url';
import {
    type Bang,
    bDefault,
    bangs
} from '../src/bangs';

import path from 'path';
import fs   from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

register();

const DIST_DIR = path.resolve(__dirname, '../dist');
const INDEX_FL = path.resolve(DIST_DIR, 'index.html');

if (!fs.existsSync(INDEX_FL))
{
    console.error('dist/index not found - run vite build first');
    process.exit(1);
}

function escapeHTML(str: string = ''): string
{
    return String(str).replace(
        /[&<>"']/g,
        (c) => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        }[c]) ?? ''
    );
}

function replaceUrl(
    url: string,
    placeholder: RegExp = /{{{s}}}/g,
    replace: string = '<span class="query">query</span>'
): string
{
    return escapeHTML(url).replace(placeholder, replace);
}

function generateBangsHTML(defaultBang: Bang, bangs: Record<string, Bang>): string
{
    const grouped: Record<string, string[]> = {};

    for (const b in bangs)
    {
        const bang = bangs[b];

        if (!grouped[bang.url]) grouped[bang.url] = [];

        grouped[bang.url].push(bang.bang);
    }

    const rows = Object.entries(grouped).map(([url, list]) =>
    {
        const links = list.map(b =>
        {
            const bang = bangs[b];

            return `<a class="bang-link" href="${escapeHTML(`https://${bang.root}/`)}" target="_blank" rel="noopener noreferrer">${escapeHTML(b)}</a>`;
        }).join(', ');

        return `
            <tr>
                <td data-label="bang">${links}</td>
                <td data-label="website"><span class="url">${replaceUrl(url)}</span></td>
            </tr>
        `;
    });

    return `
        <div id="bangs-prerender" class="bangs-wrapper" style="display: none;" aria-hidden="true">
            <div class="default-block">
                <div class="default-label">Default</div>
                <div class="default-content">
                    <a class="bang-link default-bang" href="${escapeHTML(`https://${defaultBang.root}/`)}" target="_blank" rel="noopener noreferrer">${escapeHTML(defaultBang.bang)}</a>
                    <div class="default-url">${replaceUrl(defaultBang.root)}</div>
                </div>
            </div>
    
            <div class="table-wrap">
                <table class="bangs-table" role="grid" aria-label="Search Bangs Table">
                    <thead><tr><th>bang</th><th>website</th></tr></thead>
                    <tbody>
                        ${rows}
                    </tbody>
                </table>
            </div>
        </div>
  `;
}

let html = fs.readFileSync(INDEX_FL, 'utf8');

if (html.includes('<!-- BANGS_PRERENDER_PLACEHOLDER -->'))
{
    fs.writeFileSync(
        INDEX_FL,
        html.replace(
            '<!-- BANGS_PRERENDER_PLACEHOLDER -->',
            generateBangsHTML(bDefault, bangs)
        ),
        'utf8'
    );

    console.log('Injected bangs prerender into dist/index.html');
}
else
{
    console.error('Placeholder not found in dist/index.html');
    process.exit(1);
}
