import type { Bang, Bangs } from './bangs';

const BANG_REGEX: RegExp = /!(\S+)/g;

export function findValidBang(query: string, bangs: Bangs): { bang: Bang; query: string; } | null
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

export function getReplacedUrl(url: string, placeholder: string|RegExp = '{{{s}}}', replace: string): string
{
    return url.replace(placeholder, encodeURIComponent(replace).replace(/%2F/g, '/'));
}
