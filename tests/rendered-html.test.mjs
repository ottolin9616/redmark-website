import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

const fetchPage = (pathname) => worker.fetch(
  new Request(`http://localhost${pathname}`, {
    headers: { accept: "text/html" },
  }),
  {
    ASSETS: {
      fetch: async () => new Response("Not found", { status: 404 }),
    },
  },
  {
    waitUntil() {},
    passThroughOnException() {},
  },
);

test("renders the Bento homepage at the root route", async () => {
  const response = await fetchPage("/");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  assert.match(html, /看得更遠/);
  assert.match(html, /THE PROBLEM/);
  assert.match(html, /ONE PLATFORM, LESS COMPLEXITY/);
  assert.match(
    html,
    /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i,
  );
});

test("does not expose retired homepage and prototype routes", async () => {
  const retiredRoutes = [
    "/homepage-bento",
    "/homepage-v2",
    "/homepage-glass",
    "/homepage-glass-refined",
    "/homepage-redesign",
    "/homepage-saaspo",
    "/concept",
    "/real",
    "/monumental",
    "/no-rocks",
    "/line-reference",
    "/line-ridge",
    "/line-valley",
  ];

  for (const pathname of retiredRoutes) {
    const response = await fetchPage(pathname);
    assert.equal(response.status, 404, `${pathname} should return 404`);
  }
});

test("all production local image references exist", async () => {
  const sourceFiles = [
    "app/layout.tsx",
    "app/redmark-hero.tsx",
    "app/homepage-bento.tsx",
    "app/globals.css",
  ];
  const references = new Set();

  for (const sourceFile of sourceFiles) {
    const source = await readFile(sourceFile, "utf8");
    for (const match of source.matchAll(/["'(](\/[A-Za-z0-9._/-]+\.(?:png|jpe?g|svg|webp))["')]/gi)) {
      references.add(match[1]);
    }
  }

  assert.deepEqual(
    [...references].sort(),
    [
      "/bento-snow-mountain.jpg",
      "/favicon.svg",
      "/mountain-background.jpg",
      "/redmark-dashboard-en-real.png",
      "/redmark-report-executive-summary.png",
    ],
  );

  for (const reference of references) {
    await access(path.join("public", reference.slice(1)));
  }
});
