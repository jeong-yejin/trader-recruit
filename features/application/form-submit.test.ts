import assert from "node:assert/strict";
import test from "node:test";
import { fill } from "./form-submit.ts";

test("fill replaces known placeholders and removes unknown values", () => {
  assert.equal(fill("Hello {name}, contact {email}.", { name: "Ada", email: "ada@example.com" }), "Hello Ada, contact ada@example.com.");
  assert.equal(fill("{missing}", {}), "");
});
