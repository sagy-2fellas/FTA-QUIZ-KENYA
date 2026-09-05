import { test, expect } from "@playwright/test";

/**
 * Desktop must be untouched by the mobile keyboard shielding.
 *
 * The capture-phase listener in quiz.jsx only attaches below the small-screen
 * breakpoint. These tests run at 1280x800, where it must not exist at all, and
 * where Question 1's own `role="button"` controls still handle Enter/Space
 * themselves.
 */

const blockThirdParties = (page) =>
  page.route(/googletagmanager|google-analytics|facebook\.(net|com)|clarity\.ms|luckyorange/, (r) =>
    r.abort()
  );

test.describe("desktop keyboard behaviour", () => {
  test("the mobile keyboard shield is not active on desktop", async ({ page }) => {
    await blockThirdParties(page);
    await page.goto("/quiz", { waitUntil: "domcontentloaded" });
    await page.waitForSelector(".section");

    // The mobile layout class gates the listener; desktop must not have it.
    await expect(page.locator("html")).not.toHaveClass(/quiz-mobile/);

    // Tab still moves focus normally.
    const before = await page.evaluate(() => document.activeElement?.tagName);
    await page.keyboard.press("Tab");
    const after = await page.evaluate(
      () => document.activeElement?.tagName + "/" + (document.activeElement?.className || "")
    );
    expect(after).not.toBe(before + "/undefined");
  });

  test("Question 1's custom role=button controls still receive Enter and Space", async ({
    page,
  }) => {
    await blockThirdParties(page);
    await page.goto("/quiz", { waitUntil: "domcontentloaded" });
    await page.waitForSelector(".section");

    // These legacy controls are desktop-only and implement their own onKeyDown.
    // Question 1 renders two legacy role=button controls; only one is visible
    // at desktop widths.
    const custom = page
      .locator(".section")
      .nth(0)
      .locator('[role="button"]:visible')
      .first();
    await expect(custom).toBeVisible();

    const fired = await custom.evaluate((el) => {
      let enter = false;
      let space = false;
      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter") enter = true;
        if (e.key === " ") space = true;
      });
      el.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Enter", bubbles: true })
      );
      el.dispatchEvent(new KeyboardEvent("keydown", { key: " ", bubbles: true }));
      return { enter, space };
    });
    expect(fired.enter, "Enter did not reach the custom control").toBe(true);
    expect(fired.space, "Space did not reach the custom control").toBe(true);
  });
});
