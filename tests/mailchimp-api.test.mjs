import test from "node:test";
import assert from "node:assert/strict";
import handler from "../src/pages/api/subscribe.js";
import { saveCompletedQuiz, getCompletedQuiz } from "../src/utils/quizAnswers.js";

const completedAnswers = {
  question_1: "Nairobi", question_2: 2, question_3: 3,
  question_4: 4, question_5: 2, chocolate_consumer: 1,
  shopping_cart: ["Coffee", "Tea"], ft_shopping_cart: ["Coffee"],
  question_7: 3, result_page: "/result-1", interested_in: "Coffee",
  would_buy_more: true,
};

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
      customFields: completedAnswers,
    } }, res);
    assert.equal(res.code, 200);
    assert.equal(calls.length, 3);
    assert.match(calls[0].url, /us20\.api\.mailchimp\.com/);
    assert.equal(JSON.parse(calls[0].options.body).email_address, "person@example.com");
    assert.equal(JSON.parse(calls[0].options.body).status_if_new, "subscribed");
    const fields = JSON.parse(calls[0].options.body).merge_fields;
    assert.equal(fields.BFACTRY, "Kenya");
    assert.equal(fields.BFAQ1, "Nairobi");
    assert.equal(fields.BFAQ5, "2/5: A glass every now and then");
    assert.equal(fields.BFAQ7, "Coffee, Tea");
    assert.equal(fields.BFAQ8, "3/5 on the label-checking scale");
    assert.equal(fields.BFARESULT, "/result-1");
    assert.equal(fields.BFAINTER, "Coffee");
    assert.equal(fields.BFAWBUY, "Yes");
    assert.match(JSON.parse(calls[2].options.body).note, /Kenya/);
    assert.match(JSON.parse(calls[2].options.body).note, /question_1/);
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
    await handler({ method: "POST", body: { email: "person@example.com", customFields: completedAnswers } }, res);
    assert.equal(res.code, 409);
    assert.equal(calls, 1);
  } finally {
    globalThis.fetch = originalFetch;
  }
});


test("missing completed quiz answers never reaches Mailchimp", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = () => { throw new Error("unexpected fetch"); };
  try {
    const res = response();
    await handler({ method: "POST", body: {
      email: "person@example.com",
      customFields: { question_1: "answer" },
    } }, res);
    assert.equal(res.code, 400);
    assert.match(res.body.error, /Complete the quiz/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("completed quiz answers survive a result-page reload", () => {
  const originalWindow = globalThis.window;
  const values = new Map();
  globalThis.window = {
    sessionStorage: {
      setItem(key, value) { values.set(key, value); },
      getItem(key) { return values.get(key) ?? null; },
    },
  };
  const blank = {
    QuestionOne: { value: "" }, QuestionTwo: { value: "" },
    QuestionThree: { value: "" }, QuestionFour: { value: "" },
    QuestionFive: { value: "" }, ChocolateConsumer: { value: "" },
    QuestionSix: { shoppingList: [] },
    QuestionSixFT: { shoppingListRefined: [] },
    QuestionSeven: { value: "" },
  };
  try {
    const completed = {
      ...blank,
      QuestionOne: { value: "Nairobi" },
      QuestionTwo: { value: 2 },
      QuestionThree: { value: 3 },
      QuestionFour: { value: 4 },
      QuestionFive: { value: 4 },
      ChocolateConsumer: { value: 1 },
      QuestionSix: { shoppingList: ["Coffee"] },
      QuestionSeven: { value: 3 },
    };
    saveCompletedQuiz(completed);
    const restored = getCompletedQuiz(blank);
    assert.equal(restored.question_1, "Nairobi");
    assert.equal(restored.question_5, 4);
    assert.deepEqual(restored.shopping_cart, ["Coffee"]);
    assert.equal(restored.question_7, 3);
  } finally {
    globalThis.window = originalWindow;
  }
});

test("oversized answer stops before contact creation", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = () => { throw new Error("unexpected fetch"); };
  try {
    const res = response();
    await handler({ method: "POST", body: {
      email: "person@example.com",
      customFields: { ...completedAnswers, question_1: "x".repeat(256) },
    } }, res);
    assert.equal(res.code, 400);
    assert.match(res.body.error, /too long/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

const preferenceProducts = {
  question_3: "Coffee", question_4: "Tea", question_5: "Wine", chocolate_consumer: "Chocolate",
};

for (const score of [1, 2, 3, 4, 5]) {
  test(`product score ${score} syncs the correct country tags`, async () => {
    const originalFetch = globalThis.fetch;
    const calls = [];
    globalThis.fetch = async (url, options) => {
      calls.push({ url, body: JSON.parse(options.body), method: options.method });
      return options.method === "PUT"
        ? { ok: true, json: async () => ({ status: "subscribed" }) }
        : { ok: true, json: async () => { throw new SyntaxError("204 No Content"); } };
    };
    try {
      const res = response();
      const answers = { ...completedAnswers,
        ...Object.fromEntries(Object.keys(preferenceProducts).map(key => [key, score])) };
      await handler({ method: "POST", body: { email: "person@example.com", customFields: answers } }, res);
      assert.equal(res.code, 200);
      const tagsCall = calls.find(call => call.url.endsWith("/tags"));
      assert.equal(tagsCall.method, "POST");
      assert.deepEqual(tagsCall.body.tags.slice(0, 2), [
        { name: "BFA Quiz", status: "active" },
        { name: "Kenya", status: "active" },
      ]);
      assert.deepEqual(tagsCall.body.tags.slice(2), Object.values(preferenceProducts).map(product => ({
        name: `${product} Lovers KE`, status: score >= 2 ? "active" : "inactive",
      })));
      // Only our country tags are touched; unrelated and other-country tags survive.
      assert.equal(tagsCall.body.tags.length, 6);
      assert.deepEqual(calls[0].body.tags, ["BFA Quiz", "Kenya",
        ...(score >= 2 ? Object.values(preferenceProducts).map(product => `${product} Lovers KE`) : [])]);
    } finally { globalThis.fetch = originalFetch; }
  });
}

test("mixed preferences map each answer independently", async () => {
  const originalFetch = globalThis.fetch;
  let syncedTags;
  globalThis.fetch = async (url, options) => {
    if (url.endsWith("/tags")) syncedTags = JSON.parse(options.body).tags;
    return { ok: true, json: async () => ({ status: "subscribed" }) };
  };
  try {
    const res = response();
    await handler({ method: "POST", body: { email: "person@example.com", customFields: {
      ...completedAnswers, question_3: 1, question_4: 2, question_5: 1, chocolate_consumer: 5,
    } } }, res);
    assert.equal(res.code, 200);
    assert.deepEqual(syncedTags.slice(2).map(tag => tag.status), ["inactive", "active", "inactive", "active"]);
  } finally { globalThis.fetch = originalFetch; }
});

test("tag failure prevents a false successful signup", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url) => ({
    ok: !url.endsWith("/tags"), status: url.endsWith("/tags") ? 503 : 200,
    json: async () => ({ status: "subscribed", title: "Unavailable" }),
  });
  try {
    const res = response();
    await handler({ method: "POST", body: { email: "person@example.com", customFields: completedAnswers } }, res);
    assert.equal(res.code, 502);
    assert.ok(res.body.error);
  } finally { globalThis.fetch = originalFetch; }
});

for (const invalid of [0, 6, 2.5, "2", null, true]) {
  test(`invalid preference ${JSON.stringify(invalid)} never reaches Mailchimp`, async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = () => { throw new Error("unexpected fetch"); };
    try {
      const res = response();
      await handler({ method: "POST", body: { email: "person@example.com",
        customFields: { ...completedAnswers, question_3: invalid } } }, res);
      assert.equal(res.code, 400);
    } finally { globalThis.fetch = originalFetch; }
  });
}
