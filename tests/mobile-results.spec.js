import { test, expect } from "@playwright/test";

test("results fit short screens and the fact dialog stays reachable", async ({ page }) => {
  await page.goto("/result-8");
  const first = page.locator(".result-section").first();
  await expect(first).toBeVisible();
  expect((await first.boundingBox()).y).toBeLessThan(2);
  await expect(first.locator("h1")).toHaveCSS("color", "rgb(30, 30, 30)");
  await page.getByText("We can't promise that Patrick is an adult.", { exact: false }).click();
  const dialog = page.getByRole("dialog", { name: "Age and education" });
  await expect(dialog).toBeVisible();
  const bounds = await dialog.boundingBox();
  expect(bounds.y).toBeGreaterThanOrEqual(0);
  expect(bounds.y + bounds.height).toBeLessThanOrEqual(page.viewportSize().height);
  await dialog.getByRole("button", { name: "Close", exact: true }).click();
  await expect(dialog).toHaveCount(0);
  await page.locator('.results-signup button[type="submit"]').scrollIntoViewIfNeeded();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(page.url()).not.toContain("undefined");
});

test("results signup completes with a mocked subscription", async ({ page }) => {
  await page.route("**/api/subscribe", route => route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({success: true}) }));
  await page.goto("/result-8");
  await page.getByLabel("First name", {exact: true}).fill("Local");
  await page.getByLabel("Last name", {exact: true}).fill("Test");
  await page.getByLabel("Email address", {exact: true}).fill("local-test@example.com");
  await page.locator('.results-signup button[type="submit"]').click();
  await expect(page).toHaveURL(/thanks-for-signing-up/);
});
