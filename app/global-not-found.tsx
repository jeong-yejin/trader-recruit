import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not found",
  description: "This page does not exist.",
};

/**
 * The 404 for any URL that matches no route. It cannot be a not-found.tsx:
 * the root layout is app/[lang]/layout.tsx, so a page outside a locale has no
 * layout to render inside and no lang to read. This file bypasses the layout
 * and returns the whole document, which means the language is fixed to English
 * — an unmatched URL carries nothing to pick a locale from.
 *
 * Needs experimental.globalNotFound in next.config.ts.
 */
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <head>
        {/* Only the wordmark face, and the same URL the site already caches.
            The template's five sheets style blocks this page does not have. */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/wanteddev/wanted-sans@v1.0.3/packages/wanted-sans/fonts/webfonts/variable/split/WantedSansVariable.min.css"
        />
        <style>{CSS}</style>
      </head>
      <body>
        <main>
          <p className="code">404</p>
          <h1>This page does not exist.</h1>
          <p className="note">
            The address may be mistyped, or the page may have been moved.
          </p>
          <a href="/en">Go to PERP-DEX DAY</a>
        </main>
      </body>
    </html>
  );
}

/* Self-contained: the site's black ground and type scale, nothing else. */
const CSS = `
  *, *::before, *::after { box-sizing: border-box; }
  body {
    margin: 0;
    min-height: 100vh;
    display: grid;
    place-items: center;
    padding: 24px;
    background: #000;
    color: #fff;
    font-family: "Wanted Sans Variable", "Wanted Sans", sans-serif;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }
  main { max-width: 480px; text-align: center; }
  .code {
    margin: 0;
    font-size: 14px;
    letter-spacing: 0.2em;
    color: #868686;
  }
  h1 {
    margin: 12px 0 0;
    font-size: 32px;
    font-weight: 600;
    letter-spacing: -0.02em;
  }
  .note { margin: 12px 0 0; color: #868686; }
  a {
    display: inline-flex;
    align-items: center;
    margin-top: 32px;
    padding: 0 28px;
    height: 48px;
    border: 1px solid #fff;
    color: #fff;
    text-decoration: none;
    transition: background-color .2s, color .2s;
  }
  a:hover { background: #fff; color: #000; }
  a:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
`;
