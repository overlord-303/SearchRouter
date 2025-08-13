import { type Bang } from '../../src/bangs';
import colors        from "picocolors";
import fs            from "fs";

export class Prerender
{
    private readonly dist: string;
    private readonly file: string;

    constructor({ dist, file }: { dist: string; file: string })
    {
        this.log('', `${colors.cyan('pre-renderer v1.0.1')} ${colors.green('building html...')}`);

        this.validateDist(dist);

        this.dist = dist;
        this.file = file;
    }

    private replaceUrl(
        url:         string,
        placeholder: string|RegExp = '{{{s}}}',
        replace:     string        = '<span class="query">query</span>'
    ): string
    {
        return this.escapeHTML(url).replace(placeholder, replace);
    }

    public inject(html: string): void
    {
        const content = fs.readFileSync(this.file, 'utf8');

        this.validatePlaceholder(content);

        fs.writeFileSync(
            this.file,
            content.replace(
                '<!-- BANGS_PRERENDER_PLACEHOLDER -->',
                html
            ),
            'utf8'
        );

        this.log(
            'Injected pre-rendered HTML-Table into',
            `  ${colors.dim('dist/') + colors.green('index.html')}`
        );
    }

    public generateBangsHTML(defaultBang: Bang, bangs: Record<string, Bang>): string
    {
        const grouped: Record<string, { root: string, bangs: string[] }> = {};

        for (const b in bangs)
        {
            const bang = bangs[b];

            if (!grouped[bang.url])
                grouped[bang.url] = { root: bang.root, bangs: [] };

            grouped[bang.url].bangs.push(bang.bang);
        }

        const rows = Object.entries(grouped).map(([url, data]) =>
        {
            const links = data.bangs.map(b =>
            {
                const bang = bangs[b];

                return `<a class="bang-link ${(defaultBang.bang === b) ? ' default-bang' : ''}" href="${this.escapeHTML(`https://${bang.root}/`)}" target="_blank" rel="noopener noreferrer">${this.escapeHTML(b)}</a>`;
            }).join(', ');

            return `
            <tr>
                <td data-label="bang">${links}</td>
                <td data-label="root">${this.escapeHTML(data.root)}</td>
                <td data-label="website"><span class="url">${this.replaceUrl(url)}</span></td>
            </tr>
        `;
        });

        return `
        <div id="bangs-prerender" class="bangs-wrapper" style="display: none;" aria-hidden="true">
            <div class="default-block">
                <div class="default-label">Default</div>
                <div class="default-content">
                    <a class="bang-link default-bang" href="${this.escapeHTML(`https://${defaultBang.root}/`)}" target="_blank" rel="noopener noreferrer">${this.escapeHTML(defaultBang.bang)}</a>
                    <div class="default-url">${this.replaceUrl(defaultBang.root)}</div>
                </div>
            </div>
            <div class="table-wrap">
                <table class="bangs-table" role="grid" aria-label="Search Bangs Table">
                    <thead><tr><th>bang</th><th>root</th><th>website</th></tr></thead>
                    <tbody>
                        ${rows.join('')}
                    </tbody>
                </table>
            </div>
        </div>
  `;
    }

    private escapeHTML(str: string = ''): string
    {
        return str.replace(
            /[&<>"']/g,
            (c) => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&apos;'
            }[c]) ?? ''
        );
    }

    private validateDist(dist: string): void
    {
        if (fs.existsSync(dist)) return;

        this.log(
            'Unable to find',
            `  ${colors.dim('dist/') + colors.green('index.html')}`,
            `please run - ${colors.magenta('vite build')} first.`
        );

        process.exit(1);
    }

    private validatePlaceholder(html: string): void
    {
        if (html.includes('<!-- BANGS_PRERENDER_PLACEHOLDER -->')) return;

        this.log(
            'Unable to find placeholder in',
            `  ${colors.dim('dist/') + colors.green('index.html')}`,
        );

        process.exit(1);
    }

    private log(...msg: string[]): void
    {
        msg.forEach(m => console.log(m));
    }
}
