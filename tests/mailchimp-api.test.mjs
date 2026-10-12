import test from "node:test";
import assert from "node:assert/strict";
import handler from "../src/pages/api/subscribe.js";

function response() {
  return {
    setHeader() {},
    status(code) { this.code = code; return this; },
    json(body) { this.body = body; return this; },
  };
}

test("Kenya signup creates a Mailchimp contact and saves quiz answers", async () => {
  const originalFetch = globalThis.fetch;
  process.env.MAILCHIMP_API_KEY = "test-us20";
  process.env.MAILCHIMP_AUDIENCE_ID_KE = "test-audience";
  const calls = [];
  globalThis.fetch = async (url, options) => {
    calls.push({ url, options });
    return { ok: true, json: async () => options.method === "PUT"
      ? { status: "subscribed" } : { id: 1 } };
  };
  try {
    const res = response();
    await handler({ method: "POST", body: {
      email: " Person@Example.com ", firstName: "Pat", lastName: "Lee",
      customFields: { question_1: "answer" },
    } }, res);
    assert.equal(res.code, 200);
    assert.equal(calls.length, 2);
    assert.match(calls[0].url, /us20\.api\.mailchimp\.com/);
    assert.equal(JSON.parse(calls[0].options.body).email_address, "person@example.com");
    assert.equal(JSON.parse(calls[0].options.body).status_if_new, "subscribed");
    assert.match(JSON.parse(calls[1].options.body).note, /Kenya/);
    assert.match(JSON.parse(calls[1].options.body).note, /question_1/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("invalid email never reaches Mailchimp", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = () => { throw new Error("unexpected fetch"); };
  try {
    const res = response();
    await handler({ method: "POST", body: { email: "bad" } }, res);
    assert.equal(res.code, 400);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("existing unsubscribed contact is not treated as a successful signup", async () => {
  const originalFetch = globalThis.fetch;
  process.env.MAILCHIMP_API_KEY = "test-us20";
  process.env.MAILCHIMP_AUDIENCE_ID_KE = "test-audience";
  let calls = 0;
  globalThis.fetch = async () => {
    calls += 1;
    return { ok: true, json: async () => ({ status: "unsubscribed" }) };
  };
  try {
    const res = response();
    await handler({ method: "POST", body: { email: "person@example.com" } }, res);
    assert.equal(res.code, 409);
    assert.equal(calls, 1);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

