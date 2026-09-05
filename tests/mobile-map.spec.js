import { test, expect } from "@playwright/test";

/**
 * Question 1 must stay answerable however the Kenya map behaves.
 *
 * The GeoJSON is fetched client-side; before these fixes a slow or failed
 * request left the question with no answerable control at all.
 */

const GEOJSON = "**/data/kenya-4.min.geojson";

const blockThirdParties = (page) =>
  page.route(/googletagmanager|google-analytics|facebook\.(net|com)|clarity\.ms|luckyorange/, (r) =>
    r.abort()
  );

const firstSection = (page) => page.locator(".section").nth(0);

const continueButton = (page) =>
  firstSection(page).getByRole("button", {
    name: /Continue to the next question/,
  });

test.describe("Kenya map resilience", () => {
  test("shows a loading state while the regions are being fetched", async ({
    page,
  }) => {
    await blockThirdParties(page);

    let release;
    const held = new Promise((resolve) => {
      release = resolve;
    });
    await page.route(GEOJSON, async (route) => {
      await held;
      await route.continue();
    });

    await page.goto("/quiz", { waitUntil: "domcontentloaded" });

    await expect(firstSection(page).getByRole("status")).toHaveText(
      /Loading regions/i
    );

    release();
    await expect(firstSection(page).locator("svg.quiz-map")).toBeVisible();
  });

  test("offers a retry and a working fallback when the fetch fails", async ({
    page,
  }) => {
    await blockThirdParties(page);

    // Fail every attempt until the fallback has been asserted. React
    // StrictMode double-invokes the effect in dev, so failing only the first
    // request would let the component silently recover on its own.
    let shouldFail = true;
    await page.route(GEOJSON, async (route) => {
      if (shouldFail) return route.abort("failed");
      return route.continue();
    });

    await page.goto("/quiz", { waitUntil: "domcontentloaded" });

    const alert = firstSection(page).getByRole("alert");
    await expect(alert).toBeVisible();

    // The quiz is still completable: the region select is present regardless.
    const select = firstSection(page).locator("#kenya-region");
    await expect(select).toBeVisible();
    await select.selectOption("Nairobi");
    await expect(continueButton(page)).toBeEnabled();

    // And retry recovers the map once the network is healthy again.
    shouldFail = false;
    await alert.getByRole("button", { name: /Retry/i }).click();
    await expect(firstSection(page).locator("svg.quiz-map")).toBeVisible();
  });

  test("every region is selectable and the map never overflows the page", async ({
    page,
  }) => {
    await blockThirdParties(page);
    await page.goto("/quiz", { waitUntil: "domcontentloaded" });

    const select = firstSection(page).locator("#kenya-region");
    await expect(select).toBeVisible();

    const options = await select.locator("option:not([disabled])").allTextContents();
    expect(options.length).toBe(8);

    for (const region of options) {
      await select.selectOption(region);
      await expect(select).toHaveValue(region);
    }

    // The select is a real 44px+ target with an accessible name.
    const box = await select.boundingBox();
    expect(box.height).toBeGreaterThanOrEqual(44);
    await expect(select).toHaveAccessibleName(/Where do you live/i);

    const { scrollWidth, innerWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
    }));
    expect(
      scrollWidth,
      "the map must not push the page wider than the viewport"
    ).toBeLessThanOrEqual(innerWidth);
  });

  test("the region select receives normal keyboard events", async ({ page }) => {
    await blockThirdParties(page);
    await page.goto("/quiz", { waitUntil: "domcontentloaded" });

    const select = firstSection(page).locator("#kenya-region");
    await expect(select).toBeVisible();
    await select.focus();
    await expect(select).toBeFocused();

    // The quiz key shielding must never touch a native select: keys must reach
    // it un-cancelled. (Asserted on the events rather than on the selected
    // value - driving a native select's dropdown by key is unreliable headless.)
    await select.evaluate((el) => {
      window.__selectKeys = [];
      el.addEventListener("keydown", (e) =>
        window.__selectKeys.push(`${e.key}:prevented=${e.defaultPrevented}`)
      );
    });
    await select.press("ArrowDown");
    await select.press(" ");
    expect(await page.evaluate(() => window.__selectKeys)).toEqual([
      "ArrowDown:prevented=false",
      " :prevented=false",
    ]);

    // Selection by keyboard-equivalent API still updates the value.
    await select.selectOption("Nairobi");
    await expect(select).toHaveValue("Nairobi");

    // Tab must still move focus off the select.
    await select.press("Tab");
    const movedOff = await select.evaluate((el) => el !== document.activeElement);
    expect(movedOff, "Tab did not move focus out of the select").toBe(true);
  });

  test("the simplified region file is small enough for a 3G connection", async ({
    page,
  }) => {
    await blockThirdParties(page);

    let bytes = 0;
    page.on("response", async (response) => {
      if (response.url().includes("kenya-4.min.geojson")) {
        bytes = (await response.body().catch(() => Buffer.alloc(0))).length;
      }
    });

    await page.goto("/quiz", { waitUntil: "domcontentloaded" });
    await expect(firstSection(page).locator("svg.quiz-map")).toBeVisible();

    expect(bytes).toBeGreaterThan(0);
    expect(
      bytes,
      `region file is ${(bytes / 1024).toFixed(0)} KB; the original was ~2 MB`
    ).toBeLessThan(200 * 1024);
  });

  test("only the minified region file is ever requested", async ({ page }) => {
    await blockThirdParties(page);

    const mapRequests = [];
    page.on("request", (request) => {
      if (/\.geojson(\?|$)/.test(request.url())) mapRequests.push(request.url());
    });

    await page.goto("/quiz", { waitUntil: "domcontentloaded" });
    await expect(firstSection(page).locator("svg.quiz-map")).toBeVisible();

    expect(mapRequests.length).toBeGreaterThan(0);
    for (const url of mapRequests) {
      expect(url, "the unminified 2 MB source must never be fetched").toContain(
        "kenya-4.min.geojson"
      );
    }
  });
});
