import assert from "node:assert/strict";
import test from "node:test";
import { EVENTS, EVENT_LABELS, LOCALES, otherLocale } from "./routes.ts";
import { getDictionary } from "./dictionaries.ts";

test("route primitives preserve the supported locales and events", () => {
  assert.deepEqual([...LOCALES], ["en", "ko"]);
  assert.deepEqual([...EVENTS], ["perp-dex-day", "token-2049"]);
  assert.equal(EVENT_LABELS["perp-dex-day"], "PERP DEX DAY");
  assert.equal(EVENT_LABELS["token-2049"], "TOKEN 2049");
});

test("dictionary lookup preserves event and locale selection", () => {
  assert.equal(getDictionary("perp-dex-day", "en").meta.title, "PERP-DEX DAY / Traders Wanted");
  assert.equal(getDictionary("token-2049", "ko").meta.title, "ASIA TRADING CHAMPIONSHIP with Kalshi / 트레이더 모집");
});

test("otherLocale switches between the two supported locales", () => {
  assert.equal(otherLocale("en"), "ko");
  assert.equal(otherLocale("ko"), "en");
});
