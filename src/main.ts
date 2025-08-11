// src/main.ts
import { registerSW } from 'virtual:pwa-register';
import {
    DEFAULT_BANG,
    bDefault,
    bangs
} from './bangs';

async function main()
{
    await (registerSW())(); // register SW (w/o having to manually visit '/')

    const url   = new URL(window.location.href);
    const query = url.searchParams.get('q')?.trim() ?? '';

    // If the server is configured correctly, requests without 'q' won't reach here, because the server returns HTTP 500.
    // If they do reach here, we just go back.
    if (!query)
    {
        window.history.back();
    }
    else
    {
        const defaultBang      = localStorage.getItem('default-bang') ?? DEFAULT_BANG;
        const defaultBangEntry = bangs[defaultBang] ?? bDefault;

        const match         = query.match(/!(\S+)/i);
        const bangCandidate = match?.[1]?.toLowerCase();
        const selectedBang  = (bangCandidate && bangs[bangCandidate]) ? bangs[bangCandidate] : defaultBangEntry;

        const cleanQuery = query.replace(/!\S+\s*/i, '').trim();

        if (!cleanQuery)
        {
            // If the query is just '!gh', go to domain root.
            if (selectedBang) window.location.replace(`https://${selectedBang.root}`);
        }
        else
        {
            const searchUrl = selectedBang.url.replace(
                '{{{s}}}',
                encodeURIComponent(cleanQuery).replace(/%2F/g, '/')
            );

            if (searchUrl) window.location.replace(searchUrl);
        }
    }
}

(async () => await main())();
