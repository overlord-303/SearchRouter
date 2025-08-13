// src/main.ts
import { registerSW } from 'virtual:pwa-register';
import {
    DEFAULT_BANG,
    bDefault,
    bangs, Bang
} from './bangs';

async function main()
{
    await (registerSW())(); // register SW (w/o having to manually visit '/')

    const url   = new URL(window.location.href);
    const query = url.searchParams.get('q')?.trim() ?? '';

    // Without query, display pre-rendered bangs table.
    if (!query)
    {
        // @ts-ignore
        window.document.querySelector('#bangs-prerender').style.display = 'unset';
        return;
    }
    else
    {
        const matches = Array.from(query.matchAll(/!(\S+)/gi));

        let bang        = bDefault;
        let cleanQuery;

        for (const [_, candidate] of matches)
        {
            if (bangs[candidate.toLowerCase()])
            {
                bang       = bangs[candidate.toLowerCase()];
                cleanQuery = query.replace(`!${bang.bang}`, '').trim();
                break;
            }
        }

        if (!cleanQuery)
        {
            // If the query is just '!gh', go to domain root.
            window.location.replace(`https://${bang.root}`);
        }
        else
        {
            const searchUrl = bang.url.replace(
                '{{{s}}}',
                encodeURIComponent(cleanQuery).replace(/%2F/g, '/')
            );

            window.location.replace(searchUrl);
        }
    }
}

(async () => await main())();
