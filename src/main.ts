// src/main.ts
import { registerSW } from 'virtual:pwa-register';
import {
    type Bang,
    bDefault,
    bangs
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

        let bang: Bang = bDefault;
        let cleanQuery = query;

        for (const [_, candidate] of matches)
        {
            const key = candidate.toLowerCase();

            if (bangs[key])
            {
                bang       = bangs[key];
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
