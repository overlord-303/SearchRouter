require('esbuild-register/dist/node').register();

const fs = require('fs');
const path = require('path');

// adjust if your output dir differs
const DIST = path.resolve(__dirname, '../dist');
const INDEX_HTML = path.join(DIST, 'index.html');

if (!fs.existsSync(INDEX_HTML)) {
    console.error('dist/index.html not found — run vite build first');
    process.exit(2);
}

const { bangs, bDefault } = require('../src/bangs');

function escapeHtml(s = '')
{
    return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function generateBangsHtml(defaultBang, bangsRecord)
{
    const grouped = {};

    for (const k in bangsRecord)
    {
        const e = bangsRecord[k];
        const norm = e.url.replace(/{{{s}}}/g, '__PLACEHOLDER__');
        if (!grouped[norm]) grouped[norm] = [];
        grouped[norm].push(e.bang);
    }

    const rows = Object.entries(grouped).map(([urlTpl, bangList]) =>
    {
        const urlHtml = escapeHtml(urlTpl).replace(/__PLACEHOLDER__/g, `<span class="query">query</span>`);
        const bangsLinks = bangList.map(b => {
            const e = bangsRecord[b];
            const href = (e.root || '').match(/^https?:\/\//) ? e.root : `https://${e.root}/`;
            return `<a class="bang-link" href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(b)}</a>`;
        }).join(', ');
        return `
            <tr>
                <td data-label="bang">${bangsLinks}</td>
                <td data-label="website"><span class="url">${urlHtml}</span></td>
            </tr>
        `;
    }).join('\n');

    const defaultHref = (defaultBang.root || '').match(/^https?:\/\//) ? defaultBang.root : `https://${defaultBang.root}/`;
    const defaultUrlHtml = escapeHtml(defaultBang.url).replace(/{{{s}}}/g, `<span class="query">query</span>`);

    return `
    <div id="bangs-prerender" class="bangs-wrapper" style="display: none;" aria-hidden="true">
      <div class="default-block">
        <div class="default-label">Default</div>
        <div class="default-content">
          <a class="bang-link default-bang" href="${escapeHtml(defaultHref)}" target="_blank" rel="noopener noreferrer">${escapeHtml(defaultBang.bang)}</a>
          <div class="default-url">${defaultUrlHtml}</div>
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

let html = fs.readFileSync(INDEX_HTML, 'utf8');

if (html.includes('<!-- BANGS_PRERENDER_PLACEHOLDER -->'))
{
    html = html.replace('<!-- BANGS_PRERENDER_PLACEHOLDER -->', generateBangsHtml(bDefault, bangs));
    fs.writeFileSync(INDEX_HTML, html, 'utf8');
    console.log('Injected bangs prerender into dist/index.html');
}
else
{
    console.error('Placeholder not found in dist/index.html');
    process.exit(3);
}
