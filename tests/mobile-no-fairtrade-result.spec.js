import { test, expect } from "@playwright/test";

async function blockTracking(page) {
  await page.route(/googletagmanager|google-analytics|facebook\.(net|com)|clarity\.ms|luckyorange/, route => route.abort());
}

test("all seven unidentified farmer results preserve the original four-stage journey", async ({ page }) => {
  await blockTracking(page);
  for (let result = 1; result <= 7; result += 1) {
    await page.goto(`/result-${result}`, { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { name: "We can’t tell who the farmer is." })).toBeVisible();
    await expect(page.getByRole("img", { name: "Farmer silhouette with a question mark" }).first()).toBeVisible();
    const sections = page.locator(".result-section");
    await expect(sections).toHaveCount(4);
    await expect(sections.nth(1)).toContainText("We can't promise");
    await expect(sections.nth(2)).toContainText("Fairtrade-certified");
    await expect(sections.nth(2).locator("[data-story-id]")).toHaveCount(1);
    await expect(sections.nth(3).locator("form")).toHaveCount(1);
    await expect(page.getByText(/Patrick/)).toHaveCount(0);
    await expect(page.locator('img[src*="patrick"]')).toHaveCount(0);
    await expect(page.getByRole("link", { name: "Enter the giveaway" })).toHaveCount(0);
    const submit = page.getByRole("button", { name: "Take me to the giveaway" });
    await submit.scrollIntoViewIfNeeded();
    await expect(submit).toBeInViewport();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});

test("certified tea step shows Luke and the real Fairtrade story", async ({ page }) => {
  await blockTracking(page);
  await page.goto("/result-6", { waitUntil: "domcontentloaded" });
  const certified = page.locator(".result-section").nth(2);
  await certified.getByRole("heading", { name: "Meet Luke Wahome." }).scrollIntoViewIfNeeded();
  await expect(certified).toContainText("Fairtrade-supported training");
  await expect(certified).toContainText("400 to 1,200 kilos");
  await expect(certified).toContainText("doesn’t identify who supplied the products in your basket");
  await expect(certified.locator('img[src="/img/ft-tea.png"]')).toHaveCount(0);
});

test("desktop unidentified result retains the original next sections", async ({ page }) => {
  await page.setViewportSize({ width: 1366, height: 800 });
  await blockTracking(page);
  await page.goto("/result-6", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: "We can’t tell who the farmer is." })).toBeInViewport();
  await expect(page.locator(".result-section")).toHaveCount(4);
  await page.evaluate(() => window.fullpage_api.moveTo(3));
  await expect(page.locator(".result-section").nth(2)).toHaveClass(/active/);
  await expect(page.locator(".result-section").nth(2)).toContainText("Fairtrade-certified");
});

test("mixed and empty-basket results retain their separate content", async ({ page }) => {
  await blockTracking(page);
  for (const result of [8, 16]) {
    await page.goto(`/result-${result}`, { waitUntil: "domcontentloaded" });
    await expect(page.locator(".result-section").first()).toBeVisible();
    await expect(page.getByRole("heading", { name: "We can’t tell who the farmer is." })).toHaveCount(0);
  }
});
