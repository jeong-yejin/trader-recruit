import assert from "node:assert/strict";
import test from "node:test";
import { buildMailtoUrl, fill, serializeFormData } from "./form-submit.ts";

test("fill replaces known placeholders and removes unknown values", () => {
  assert.equal(fill("Hello {name}, contact {email}.", { name: "Ada", email: "ada@example.com" }), "Hello Ada, contact ada@example.com.");
  assert.equal(fill("{missing}", {}), "");
});

test("serializeFormData preserves insertion order and string coercion", () => {
  assert.equal(
    serializeFormData({ name: "Ada", agree: "on", years: "" }),
    "name: Ada\nagree: on\nyears: ",
  );
});

test("buildMailtoUrl encodes the subject and body while preserving the recipient", () => {
  assert.equal(
    buildMailtoUrl({
      email: "hello@example.com",
      subject: "Application: Ada & Co",
      body: "name: Ada\nproof: https://example.com/a b",
    }),
    "mailto:hello@example.com?subject=Application%3A%20Ada%20%26%20Co&body=name%3A%20Ada%0Aproof%3A%20https%3A%2F%2Fexample.com%2Fa%20b",
  );
});
