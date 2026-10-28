import { test, expect } from "@playwright/test";

test("phone touch navigation reaches the next question after the location fact", async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 384, height: 824 },
    deviceScaleFactor: 2.75,
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();
  await page.goto("/quiz", { waitUntil: "domcontentloaded" });
  await page.locator("#kenya-region").selectOption("Central");
  await page.evaluate(() => {
    const original = window.fullpage_api.moveSectionDown;
    window.fullpage_api.moveSectionDown = function (...args) {
      window.__overflowAtMove = document.body.style.overflow;
      return original.apply(this, args);
    };
  });
  await page.locator(".section.active .quiz-mobile-nav button[aria-label='Continue to the next question']").tap();
  await expect(page.getByRole("dialog", { name: "Growing the food doesn’t mean owning the land." })).toBeVisible();
  await page.getByRole("button", { name: "Go to Next Question" }).tap();
  expect(await page.evaluate(() => window.__overflowAtMove)).not.toBe("hidden");
  await expect.poll(() => page.locator(".section.active").getAttribute("data-anchor")).toBe("Question-2");
  await expect.poll(async () => page.locator(".section.active [data-quiz-heading]").evaluate((node) => {
    const rect = node.getBoundingClientRect();
    return rect.top >= 0 && rect.top < window.innerHeight;
  })).toBe(true);
  await context.close();
});

test("short laptop shows one fact presentation and the last slider above the fold", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 1366, height: 650 } });
  const page = await context.newPage();
  await page.goto("/quiz", { waitUntil: "domcontentloaded" });
  await page.locator("#kenya-region").selectOption("Central");
  await page.locator(".section.active .quiz-mobile-nav button[aria-label='Continue to the next question']").click();
  await page.getByRole("button", { name: "Go to Next Question" }).click();
  await expect.poll(() => page.locator(".section.active").getAttribute("data-anchor")).toBe("Question-2");
  await expect(page.locator(".section.active .engagement-fact")).toBeHidden();
  await expect(page.locator(".section.active .quiz-mobile-nav")).toBeVisible();
  await page.locator(".section.active .quiz-mobile-nav button[aria-label='Continue to the next question']").click();
  await expect(page.getByRole("dialog", { name: "The legal minimum is doing the bare minimum." })).toBeVisible();
  await expect(page.locator(".section.active .engagement-fact")).toBeHidden();
  await page.getByRole("button", { name: "Go to Next Question" }).click();
  await expect.poll(() => page.locator(".section.active").getAttribute("data-anchor")).toBe("Question-3");
  const anchors = ["Question-4", "Question-5", "Chocolate-consumer", "Question-6", "Question-7"];
  for (const anchor of anchors) {
    await page.evaluate(() => window.fullpage_api.moveSectionDown());
    await expect.poll(() => page.locator(".section.active").getAttribute("data-anchor")).toBe(anchor);
    await page.waitForTimeout(350);
  }
  const box = await page.locator(".section.active .customSlider").boundingBox();
  expect(box.y, "final slider begins below the laptop viewport").toBeLessThan(550);
  await context.close();
});
