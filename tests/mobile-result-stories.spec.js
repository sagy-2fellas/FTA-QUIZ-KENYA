import { test, expect } from "@playwright/test";
import { getResultStory } from "../src/data/resultStories";

const expected = { 1: "vivian", 2: "sukambizi", 3: "jessica", 4: "jessica", 5: "coffee", 6: "luke", 7: "vivian", 9: "jessica", 10: "sukambizi", 11: "coffee", 12: "vivian", 13: "luke", 14: "jessica", 15: "sukambizi" };
const allowed = { 1: ["tea", "coffee", "wine"], 2: ["tea", "coffee"], 3: ["coffee", "wine"], 4: ["tea", "wine"], 5: ["coffee"], 6: ["tea"], 7: ["wine"], 9: ["tea", "coffee", "wine"], 10: ["tea"], 11: ["coffee"], 12: ["wine"], 13: ["tea", "coffee"], 14: ["coffee", "wine"], 15: ["tea", "wine"] };

async function prepare(page) {
  await page.route(/googletagmanager|google-analytics|facebook\.(net|com)|clarity\.ms|luckyorange/, route => route.abort());
}

test("story assignments match each outcome’s products", () => {
  for (const [id, storyId] of Object.entries(expected)) {
    const story = getResultStory(Number(id));
    expect(story.id).toBe(storyId);
    expect(allowed[id]).toContain(story.product);
    expect(["cocoa", "rooibos"]).not.toContain(story.product);
  }
  expect(getResultStory(8, ["Spiced Tea"]).product).toBe("tea");
  expect(getResultStory(8, ["Red Wine"]).product).toBe("wine");
  expect(getResultStory(8, ["Coffee Beans"]).product).toBe("coffee");
  expect(getResultStory(16)).toBeNull();
});

test("all result pages keep their stages, load the assigned photos and reach signup", async ({ page }) => {
  await prepare(page);
  for (let id = 1; id <= 16; id++) {
    await page.goto(`/result-${id}`, { waitUntil: "domcontentloaded" });
    await expect(page.locator(".result-section")).toHaveCount(id === 8 ? 5 : 4);
    await expect(page.getByText(/Patrick/)).toHaveCount(0);
    await expect(page.locator('img[src*="patrick"]')).toHaveCount(0);
    if (id !== 16) {
      const story = page.locator("[data-story-id]");
      await expect(story).toHaveAttribute("data-story-id", expected[id] || "coffee");
      await expect(story).toContainText(/Source:/);
      if (![5, 6, 8, 11, 13].includes(id)) await expect(story.locator('a[href*="mailchi.mp"], a[href*="fairtrade.net"]')).toHaveCount(1);
    }
    const submit = page.getByRole("button", { name: "Take me to the giveaway" });
    await submit.scrollIntoViewIfNeeded();
    await expect(submit).toBeInViewport();
    for (const image of await page.locator('[data-story-id] img, .signup-portrait img').all()) {
      await expect.poll(() => image.evaluate(img => img.complete && img.naturalWidth > 0)).toBe(true);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});

for (const [product, storyId] of [["Spiced Tea", "luke"], ["Red Wine", "jessica"], ["Coffee Beans", "coffee"]]) {
  test(`mixed result follows certified ${product} after a reload`, async ({ page }) => {
    await prepare(page);
    await page.addInitScript(({ product }) => {
      sessionStorage.setItem("bfa-completed-quiz-v1", JSON.stringify({ savedAt: Date.now(), answers: {
        question_1: "Nairobi", question_2: 2, question_3: 3, question_4: 4, question_5: 2, chocolate_consumer: 1,
        shopping_cart: ["Coffee Beans", "Red Wine", "Spiced Tea"], ft_shopping_cart: [product], question_7: 3,
      } }));
    }, { product });
    await page.goto("/result-8", { waitUntil: "domcontentloaded" });
    await expect(page.locator("[data-story-id]")).toHaveAttribute("data-story-id", storyId);
    if (storyId !== "coffee") await expect(page.locator(".signup-portrait img")).toHaveAttribute("src", getResultStory(8, [product]).photo);
  });
}

test("wine and tea story panels fit on desktop", async ({ page }) => {
  await prepare(page);
  await page.setViewportSize({ width: 1366, height: 800 });
  for (const id of [7, 10, 11, 14]) {
    await page.goto(`/result-${id}`, { waitUntil: "domcontentloaded" });
    await expect(page.locator("[data-story-id]")).toHaveAttribute("data-story-id", expected[id]);
    await page.evaluate(() => window.fullpage_api.moveTo(3));
    const heading = page.locator("[data-story-id] h3");
    await expect(heading).toBeInViewport();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});

test("stories start short and expand and collapse without a video link", async ({ page }) => {
  await prepare(page);
  for (const id of [6, 7, 10, 11, 14]) {
    await page.goto(`/result-${id}`, { waitUntil: "domcontentloaded" });
    const panel = page.locator("[data-story-id]");
    const details = panel.locator("details");
    await expect(details).not.toHaveAttribute("open");
    const more = panel.locator("summary");
    await more.scrollIntoViewIfNeeded();
    await expect(more).toHaveText(/Read more/);
    await expect(details.locator("h4")).not.toBeVisible();
    await more.click();
    await expect(details).toHaveAttribute("open");
    await expect(details.locator("h4")).toBeVisible();
    await expect(details).toContainText("Source:");
    await more.click();
    await expect(details).not.toHaveAttribute("open");
    await expect(page.locator('a[href*="youtu"], iframe, video')).toHaveCount(0);
    if (id === 10) await expect(panel.locator('img[src="/img/stories/sukambizi-still.jpg"]')).toHaveCount(1);
  }
});

test("desktop story expands using the keyboard", async ({ page }) => {
  await prepare(page);
  await page.setViewportSize({ width: 1366, height: 800 });
  await page.goto("/result-10", { waitUntil: "domcontentloaded" });
  await expect(page.locator("[data-story-id]")).toHaveAttribute("data-story-id", "sukambizi");
  await page.evaluate(() => window.fullpage_api.moveTo(3));
  const summary = page.locator("[data-story-id] summary");
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("[data-story-id] details")).toHaveAttribute("open");
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("[data-story-id] details")).not.toHaveAttribute("open");
});


test("coffee uses supplied photo and cooperative impact without invented identities", async ({ page }) => {
  await prepare(page);
  await page.goto("/result-11", { waitUntil: "domcontentloaded" });
  const panel = page.locator("[data-story-id]");
  await expect(panel.getByRole("heading", { name: "Coffee that gives back." })).toBeVisible();
  await expect(panel).not.toContainText(/illustrative|Aline|Emmanuel/);
  await expect(panel).toContainText("Ethiopia");
  await expect(panel.locator('img[src="/img/stories/coffee-growers.png"]')).toHaveCount(1);
  await expect(page.locator('.signup-portrait img')).toHaveAttribute("src", "/img/stories/coffee-growers.png");
  await panel.locator("summary").click();
  await expect(panel).toContainText("Sidama Coffee Farmers’ Cooperative Union");
  await expect(panel).toContainText("renewable energy");
  await expect(panel).not.toContainText("Rwanda");
});
