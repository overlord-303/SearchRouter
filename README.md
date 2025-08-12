# SearchRouter

**SearchRouter** is a lightweight, self-hostable redirect service that brings DuckDuckGo-style **bangs** to any browser - but with more flexibility.

Unlike DuckDuckGo, where the `!bang` must be at the resolved server-side, SearchRouter runs locally after the initial request.

Example: `cats !gi` will open a Google Images search for “cats”.

If no bang is found, SearchRouter will use the default bang engine, which is **Google**.
<br>*You can set your own default by changing the custom search engine url, e.g.: `?q=%s+!ddg`.*

---

## How It Works

1. You add SearchRouter as a **custom search engine** in your browser.
2. When you search, it looks for a bang keyword (like `!g`, `!yt`, `!wiki`) **anywhere** in your query.
3. If found, it strips the bang and redirects you to that site’s search URL.
4. If not found, it uses your configured default bang.
5. After the first visit, it runs **fully offline** thanks to a max-cached (`~68 years`) service worker, so subsequent queries are instant (`~6-20ms`) and don’t need a network round trip to the server.

---

## Adding SearchRouter to Your Browser

1. Open your browser’s **Custom Search Engine** settings.
2. Add a new engine with:
    ```text
    Name:    SearchRouter
    Keyword: whatever
    URL:     https://sr.yourdomain.com/?q=%s
    ```
     
    *(or use the public instance: `https://bang.security-command.org/?q=%s`)*
3. Make it your default search engine if desired (recommended).

Now you can use bangs and instantly redirected to whatever you want.
<br>All exisiting bangs will be listed when visiting the domain without a query (`?q=...`) parameter.

---

## Key Features

**Flexible bang placement**  
: Works anywhere in the query, not just the start.

**Offline-capable**  
: After first load, everything runs locally thanks to the service worker.

**Blazing fast**  
: Instant redirects without extra page loads.

**Self-hostable**  
: Run on your own domain for full control (extend [bangs list](https://duckduckgo.com/bang.js), set default bang, ...\*).

**Public instance**  
: Use `https://bang.security-command.org/?q=%s` without hosting your own.

---

## Example Queries

| Query                        | Result                                         |
|------------------------------|------------------------------------------------|
| `!g openai chatgpt`          | Google search for "openai chatgpt"             |
| `cat videos !yt`             | YouTube search for "cat videos"                |
| `linux networking !wiki`     | Wikipedia page search for "linux networking"   |
| `local cafe reviews`         | Default engine search (Google or your setting) |

---

## Known Limitations

- Only the **first** recognized bang in the query is processed.
- Requires a browser that supports **service workers** (all modern browsers do).
- Still needs initial online load before offline mode works (`~3kb`).

---

\*Remember to serve the necessary headers via your webserver.

*Inspired by DuckDuckGo bangs but built for more flexibility, speed, and offline capability.*
