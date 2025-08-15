// src/main.ts
import { findValidBang, getReplacedUrl } from './util';
import type { Bang, Bangs } from './bangs';

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
        const { bDefault, bangs } = await import('./bangs') as { bDefault: Bang; bangs: Bangs; };

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
