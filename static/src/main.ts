import {
    Bang,
    bDefault,
    bangs
} from '../../src/bangs';

function generateBangsTable(defaultBang: Bang, bangs: Record<string, Bang>): string
{
    const grouped: Record<string, string[]> = {};

    for (const key in bangs)
    {
        const bangObj = bangs[key];
        const normalizedUrl = bangObj.url.replace(/{{{s}}}/g, '__PLACEHOLDER__');

        if (!grouped[normalizedUrl])
            grouped[normalizedUrl] = [];

        grouped[normalizedUrl].push(bangObj.bang);
    }

    // Build rows
    const rowsHtml = Object.entries(grouped)
        .map(([urlTemplate, bangList]) =>
        {
            // render URL with visible query marker
            const urlHtml = urlTemplate.replace(
                /__PLACEHOLDER__/g,
                `<span class="query">query</span>`
            );

            // make each bang clickable to its root
            const bangsLinks = bangList
                .map((b) =>
                {
                    const entry = bangs[b];
                    // fallback root construction if missing protocol
                    const href = entry.root.match(/^https?:\/\//) ? entry.root : `https://${entry.root}/`;
                    const isDefault = defaultBang && defaultBang.bang === b;

                    return `<a class="bang-link${isDefault ? ' default-bang' : ''}" href="${href}" target="_blank" rel="noopener noreferrer">${b}</a>`;
                })
                .join(', ');

            return `
                <tr>
                    <td data-label="bang">${bangsLinks}</td>
                    <td data-label="website"><span class="url">${urlHtml}</span></td>
                </tr>
            `;
        })
        .join('');

    const defaultHref = defaultBang.root.match(/^https?:\/\//) ? defaultBang.root : `https://${defaultBang.root}/`;
    const defaultUrlHtml = defaultBang.url.replace(/{{{s}}}/g, `<span class="query">query</span>`);

    return `
        <div class="bangs-wrapper">
          <div class="default-block" role="note" aria-label="Default bang">
            <div class="default-label">Default</div>
            <div class="default-content">
              <a class="bang-link default-bang" href="${defaultHref}" target="_blank" rel="noopener noreferrer">${defaultBang.bang}</a>
              <div class="default-url">${defaultUrlHtml}</div>
            </div>
          </div>
    
          <div class="table-wrap">
            <table class="bangs-table" role="grid" aria-label="Search Bangs Table">
              <thead>
                <tr>
                  <th>bang</th>
                  <th>website</th>
                </tr>
              </thead>
              <tbody>
                ${rowsHtml}
              </tbody>
            </table>
          </div>
        </div>
  `;
}

document.body.innerHTML = generateBangsTable(bDefault, bangs);
