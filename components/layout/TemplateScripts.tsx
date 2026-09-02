"use client";

import Script from "next/script";
import { useState } from "react";

/**
 * The template's four scripts, in order.
 *
 * next/script gives afterInteractive no ordering guarantee — it injects the
 * tags in parallel, so style.js can execute before plugin.js has defined
 * jQuery and throw on the first `$`. One uncaught throw at the top of style.js
 * costs every binding in it. So render the next tag only once the one before
 * it has loaded.
 *
 * Plain `defer` tags would order themselves, but they run before hydration and
 * setting.js writes data-aos-* onto <body>. React then hydrates against a
 * body it did not render, mismatches, and re-mounts the tree — which
 * re-inserts the script tags and runs all four a second time.
 *
 * The layout preloads the same four, so chaining execution costs no extra
 * download time.
 */
export function TemplateScripts({ srcs }: { srcs: readonly string[] }) {
  const [loaded, setLoaded] = useState(0);

  return (
    <>
      {srcs.slice(0, loaded + 1).map((src, i) => (
        <Script
          key={src}
          src={src}
          strategy="afterInteractive"
          onLoad={() => setLoaded((n) => Math.max(n, i + 1))}
        />
      ))}
    </>
  );
}
