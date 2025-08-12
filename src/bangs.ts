// noinspection HttpUrlsUsage

export type Bang = {
    bang: string,
    url:  string,
    root: string
};

export const bangs: Record<string, Bang> = {
    // google (-related)
    g: {
        bang: 'g',
        url:  'https://www.google.com/search?q={{{s}}}',
        root: 'www.google.com'
    },
    google: {
        bang: 'google',
        url:  'https://www.google.com/search?q={{{s}}}',
        root: 'www.google.com'
    },
    gi: {
        bang: 'gi',
        url:  'https://www.google.com/search?tbm=isch&q={{{s}}}',
        root: 'www.google.com'
    },
    gn: {
        bang: 'gn',
        url:  'https://news.google.com/search?q={{{s}}}',
        root: 'news.google.com'
    },
    gmail: {
        bang: 'gmail',
        url:  'https://mail.google.com/mail/u/0/#search/{{{s}}}',
        root: 'mail.google.com'
    },
    gstocks: {
        bang: 'gstocks',
        url:  'https://www.google.com/finance/quote/{{{s}}}',
        root: 'www.google.com'
    },

    // translator
    tl: {
        bang: 'tl',
        url:  'https://translate.google.com/#auto/en/{{{s}}}',
        root: 'translate.google.com'
    },
    trans: {
        bang: 'trans',
        url:  'https://translate.google.com/#auto/en/{{{s}}}',
        root: 'translate.google.com'
    },
    deepl: {
        bang: 'deepl',
        url:  'https://www.deepl.com/translator#xx/en/{{{s}}}',
        root: 'www.deepl.com'
    },

    // search engines
    b: {
        bang: 'b',
        url:  'https://www.bing.com/search?q={{{s}}}',
        root: 'www.bing.com'
    },
    bing: {
        bang: 'bing',
        url:  'https://www.bing.com/search?q={{{s}}}',
        root: 'www.bing.com'
    },
    ddg: {
        bang: 'ddg',
        url:  'https://duckduckgo.com/?q={{{s}}}',
        root: 'duckduckgo.com'
    },
    duckduckgo: {
        bang: 'duckduckgo',
        url:  'https://duckduckgo.com/?q={{{s}}}',
        root: 'duckduckgo.com'
    },
    ddgi: {
        bang: 'ddgi',
        url:  'https://duckduckgo.com/?q={{{s}}}&iax=images&ia=images',
        root: 'duckduckgo.com'
    },
    ddgn: {
        bang: 'ddgn',
        url:  'https://duckduckgo.com/?q={{{s}}}&iar=news&ia=news',
        root: 'duckduckgo.com'
    },
    yh: {
        bang: 'yh',
        url:  'https://search.yahoo.com/search?p={{{s}}}',
        root: 'search.yahoo.com'
    },
    yahoo: {
        bang: 'yahoo',
        url:  'https://search.yahoo.com/search?p={{{s}}}',
        root: 'search.yahoo.com'
    },
    
    // social media
    x: {
        bang: 'x',
        url:  'https://x.com/search?q={{{s}}}',
        root: 'x.com'
    },
    r: {
        bang: 'r',
        url:  'https://www.reddit.com/search?q={{{s}}}',
        root: 'www.reddit.com'
    },
    tw: {
        bang: 'tw',
        url:  'https://twitter.com/search?q={{{s}}}',
        root: 'twitter.com'
    },
    ig: {
        bang: 'ig',
        url:  'https://www.instagram.com/explore/tags/{{{s}}}/',
        root: 'www.instagram.com'
    },
    ign: {
        bang: 'ign',
        url:  'https://www.ign.com/search?q={{{s}}}',
        root: 'www.ign.com'
    },

    // videos/streams/music
    yt: {
        bang: 'yt',
        url:  'https://www.youtube.com/results?search_query={{{s}}}',
        root: 'www.youtube.com'
    },
    ttv: {
        bang: 'ttv',
        url:  'https://twitch.tv/{{{s}}}',
        root: 'twitch.tv'
    },

    n: {
        bang: 'n',
        url:  'https://www.netflix.com/search?q={{{s}}}',
        root: 'www.netflix.com'
    },
    cr: {
        bang: 'cr',
        url:  'https://www.crunchyroll.com/search?q={{{s}}}',
        root: 'www.crunchyroll.com'
    },
    prime: {
        bang: 'prime',
        url:  'https://www.amazon.de/gp/video/search?phrase={{{s}}}',
        root: 'www.amazon.com'
    },

    p: {
        bang: 'p',
        url:  'https://www.pinterest.com/search/pins/?q={{{s}}}',
        root: 'www.pinterest.com'
    },
    sp: {
        bang: 'sp',
        url:  'https://open.spotify.com/search/{{{s}}}',
        root: 'open.spotify.com'
    },
    ytm: {
        bang: 'ytm',
        url:  'https://music.youtube.com/search?q={{{s}}}',
        root: 'music.youtube.com'
    },

    // wikis
    w: {
        bang: 'w',
        url:  'https://en.wikipedia.org/wiki/Special:Search?search={{{s}}}&go=Go',
        root: 'en.wikipedia.org'
    },
    wiki: {
        bang: 'wiki',
        url:  'https://en.wikipedia.org/wiki/Special:Search?search={{{s}}}&go=Go',
        root: 'en.wikipedia.org'
    },
    wh: {
        bang: 'wh',
        url:  'https://en.wikihow.com/wikiHowTo?search={{{s}}}:',
        root: 'en.wikihow.com'
    },
    ud: {
        bang: 'ud',
        url:  'https://www.urbandictionary.com/define.php?term={{{s}}}',
        root: 'www.urbandictionary.com'
    },
    cmb: {
        bang: 'cmb',
        url:  'https://dictionary.cambridge.org/dictionary/english/{{{s}}}',
        root: 'dictionary.cambridge.org'
    },
    duden: {
        bang: 'duden',
        url:  'https://www.duden.de/suchen/dudenonline/{{{s}}}',
        root: 'www.duden.de'
    },

    // shops
    a: {
        bang: 'a',
        url:  'https://www.amazon.com/s?k={{{s}}}',
        root: 'www.amazon.com'
    },
    e: {
        bang: 'e',
        url:  'https://www.ebay.com/sch/items/?_nkw={{{s}}}',
        root: 'www.ebay.com'
    },

    // maps
    m: {
        bang: 'm',
        url:  'https://maps.google.com/maps?q={{{s}}}',
        root: 'maps.google.com'
    },
    gm: {
        bang: 'gm',
        url:  'https://maps.google.com/maps?q={{{s}}}',
        root: 'maps.google.com'
    },

    // ai
    gpt: {
        bang: 'gpt',
        url:  'https://chatgpt.com/?q={{{s}}}',
        root: 'chatgpt.com'
    },
    plx: {
        bang: 'plx',
        url:  'https://www.perplexity.ai/search?q={{{s}}}',
        root: 'perplexity.ai'
    },
    cld: {
        bang: 'cld',
        url:  'https://claude.ai/new?q={{{s}}}',
        root: 'claude.ai'
    },
    gmi: {
        bang: 'gmi',
        url:  'https://gemini.google.com/app?q={{{s}}}',
        root: 'gemini.google.com'
    },

    // development tools
    gh: {
        bang: 'gh',
        url:  'https://github.com/search?utf8=%E2%9C%93&q={{{s}}}',
        root: 'github.com'
    },
    github: {
        bang: 'github',
        url:  'https://github.com/search?utf8=%E2%9C%93&q={{{s}}}',
        root: 'github.com'
    },

    ghc: {
        bang: 'ghc',
        url:  'https://github.com/search?utf8=%E2%9C%93&q={{{s}}}&type=Code',
        root: 'github.com'
    },
    ghr: {
        bang: 'ghr',
        url:  'https://github.com/{{{s}}}',
        root: 'github.com'
    },
    ghu: {
        bang: 'ghu',
        url:  'https://github.com/search?type=Users&q={{{s}}}',
        root: 'github.com'
    },
    ghg: {
        bang: 'ghg',
        url:  'https://gist.github.com/search?q={{{s}}}',
        root: 'gist.github.com'
    },

    so: {
        bang: 'so',
        url:  'https://stackoverflow.com/search?q={{{s}}}',
        root: 'stackoverflow.com'
    },

    mdn: {
        bang: 'mdn',
        url:  'https://developer.mozilla.org/search?q={{{s}}}',
        root: 'developer.mozilla.org'
    },
    js: {
        bang: 'js',
        url:  'https://developer.mozilla.org/search?q={{{s}}}',
        root: 'developer.mozilla.org'
    },
    jv: {
        bang: 'jv',
        url:  'https://docs.oracle.com/apps/search/search.jsp?q={{{s}}}&category=java',
        root: 'docs.oracle.com'
    },
    java: {
        bang: 'java',
        url:  'https://docs.oracle.com/apps/search/search.jsp?q={{{s}}}&category=java',
        root: 'docs.oracle.com'
    },

    npm: {
        bang: 'npm',
        url:  'https://www.npmjs.com/search?q={{{s}}}',
        root: 'www.npmjs.com'
    },
    yarn: {
        bang: 'yarn',
        url:  'https://yarnpkg.com/en/packages?q={{{s}}}',
        root: 'yarnpkg.com'
    },
    whois: {
        bang: 'whois',
        url:  'https://www.whois.com/search.php?query={{{s}}}',
        root: 'www.whois.com'
    },

    wa: {
        bang: 'wa',
        url:  'https://www.wolframalpha.com/input?i={{{s}}}',
        root: 'www.wolframalpha.com'
    },

    // games
    gog: {
        bang: 'gog',
        url:  'https://www.gog.com/games?query={{{s}}}',
        root: 'www.gog.com'
    },
    steam: {
        bang: 'steam',
        url:  'https://store.steampowered.com/search/?term={{{s}}}',
        root: 'store.steampowered.com'
    },

    // misc
    wtl: {
        bang: 'wtl',
        url:  'https://whatthefuckshouvldilistentorightnow.com/artist.php?artist={{{s}}}',
        root: 'whatthefuckshouldilistentorightnow.com'
    },
    wte: {
        bang: 'wte',
        url:  'https://www.whatthefuckshouldimakefordinner.com/index.php?food={{{s}}}',
        root: 'www.whatthefuckshouldimakefordinner.com'
    },
    wb: {
        bang: 'wb',
        url:  'https://web.archive.org/web/*/{{{s}}}',
        root: 'web.archive.org'
    },
    wayback: {
        bang: 'wayback',
        url:  'https://web.archive.org/web/*/{{{s}}}',
        root: 'web.archive.org'
    },
};

export const bDefault: Bang = {
    bang: 'google',
    url:  'https://www.google.com/search?q={{{s}}}',
    root: 'www.google.com'
};

export const DEFAULT_BANG = 'g';
