// src/main.ts
import type { Bang } from './bangs';

const BANG_REGEX: RegExp = /!(\S+)/g;

function findValidBang(query: string, bangs: Readonly<Record<string, Bang>>): { bang: Bang; query: string; } | null
{
    BANG_REGEX.lastIndex = 0;

    let match;

    while ((match = BANG_REGEX.exec(query)) !== null)
    {
        const candidate = match[1].toLowerCase();
        const bang = bangs[candidate];

        if (bang)
        {
            return {
                bang: bang,
                query: query.replace(match[0], '').trim(),
            };
        }
    }

    return null;
}

function getReplacedUrl(url: string, placeholder: string|RegExp = '{{{s}}}', replace: string): string
{
    return url.replace(placeholder, encodeURIComponent(replace).replace(/%2F/g, '/'));
}

async function main()
{
    import('virtual:pwa-register') // register SW (w/o having to manually visit '/')
        .then(m => m.registerSW?.())

    const url   = new URL(window.location.href);
    const query = url.searchParams.get('q')?.trim() ?? '';

    // Without query, display pre-rendered bangs table.
    if (!query)
    {
        document.getElementById('bangs-prerender')!.style.display = 'unset';
        return;
    }
    else
    {
        const { bDefault, bangs } = await import('./bangs') as {
            bDefault: Bang;
            bangs:    Readonly<Record<string, Bang>>;
        };

        const result = findValidBang(query, bangs);

        let url;

        if (!result)
        {
            url = getReplacedUrl(bDefault.url, '{{{s}}}', query);
        }
        else
        {
            url = (result.query)
                ? getReplacedUrl(result.bang.url, '{{{s}}}', result.query)
                : `https://${result.bang.root}`;
        }

        window.location.replace(url);
    }
}

(async () => await main())();
