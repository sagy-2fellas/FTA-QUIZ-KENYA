import { test, expect } from "@playwright/test";

/**
 * Final signup screen on small phones.
 *
 * The submission endpoint is mocked in every test — no real profile is ever
 * created, and no personal data leaves the machine. The values typed here are
 * obviously synthetic.
 */

const FAKE = {
  firstName: "Test",
  lastName: "Person",
  email: "not-a-real-address@example.invalid",
};

let submitted = [];

const setup = async (page) => {
  submitted = [];
  await page.route(/googletagmanager|google-analytics|facebook\.(net|com)|clarity\.ms|luckyorange/, (r) =>
    r.abort()
  );
  await page.route("**/api/subscribe", async (route) => {
    submitted.push(route.request().postDataJSON?.() ?? null);
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true, message: "mocked" }),
    });
  });
  await page.goto("/result-1", { waitUntil: "domcontentloaded" });
};

const inViewport = (locator) =>
  locator.evaluate((el) => {
    const r = el.getBoundingClientRect();
    return r.height > 0 && r.top >= 0 && r.bottom <= window.innerHeight + 0.5;
  });

test.describe("signup screen", () => {
  test("submit button and all fields are reachable by scrolling", async ({
    page,
  }) => {
    await setup(page);

    const form = page.locator("form").first();
    await expect(form).toBeVisible();

    for (const name of ["firstName", "lastName", "email"]) {
      const field = form.locator(`input[name="${name}"]`);
      await field.scrollIntoViewIfNeeded();
      await expect(field).toBeVisible();
      expect(await inViewport(field), `${name} not reachable`).toBe(true);
    }

    const submit = form.getByRole("button", { name: /giveaway/i });
    await submit.scrollIntoViewIfNeeded();
    expect(await inViewport(submit), "submit button not reachable").toBe(true);

    // No horizontal overflow at any target width.
    const { scrollWidth, innerWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
    }));
    expect(scrollWidth).toBeLessThanOrEqual(innerWidth);
  });

  test("focused field stays visible when the keyboard shrinks the viewport", async ({
    page,
  }, testInfo) => {
    await setup(page);

    const { width, height } = testInfo.project.use.viewport;
    // Android soft keyboard typically claims 45-55% of the viewport.
    await page.setViewportSize({ width, height: Math.round(height * 0.55) });

    const form = page.locator("form").first();
    const email = form.locator('input[name="email"]');
    await email.scrollIntoViewIfNeeded();
    await email.focus();

    // The focus handler waits for the keyboard resize to settle and then
    // smooth-scrolls, so poll for the end state rather than sampling once.
    await expect
      .poll(() => inViewport(email), {
        message: "email field is hidden behind the keyboard",
        timeout: 5000,
      })
      .toBe(true);

    const submit = form.getByRole("button", { name: /giveaway/i });
    await submit.scrollIntoViewIfNeeded();
    expect(
      await inViewport(submit),
      "submit button unreachable with the keyboard open"
    ).toBe(true);
  });

  test("name fields stack rather than overflow at 320px", async ({ page }) => {
    await setup(page);
    const width = page.viewportSize().width;
    test.skip(width > 320, "only meaningful at the narrowest target");

    const first = page.locator('input[name="firstName"]');
    const last = page.locator('input[name="lastName"]');
    const a = await first.boundingBox();
    const b = await last.boundingBox();
    expect(b.y, "name fields should stack below 375px").toBeGreaterThan(
      a.y + a.height - 1
    );
  });

  test("submits through the mocked endpoint without sending real data", async ({
    page,
  }) => {
    await setup(page);

    const form = page.locator("form").first();
    await form.locator('input[name="firstName"]').fill(FAKE.firstName);
    await form.locator('input[name="lastName"]').fill(FAKE.lastName);
    await form.locator('input[name="email"]').fill(FAKE.email);

    const submit = form.getByRole("button", { name: /giveaway/i });
    await submit.scrollIntoViewIfNeeded();
    await submit.click();

    await expect.poll(() => submitted.length).toBeGreaterThan(0);
    expect(submitted[0].email).toBe(FAKE.email);
    expect(FAKE.email).toContain(".invalid");
  });

  test("form inputs receive normal keyboard events", async ({ page }) => {
    await setup(page);

    const form = page.locator("form").first();
    const email = form.locator('input[name="email"]');
    await email.scrollIntoViewIfNeeded();
    await email.click();
    // Typing must reach the input untouched by any quiz key handling.
    await page.keyboard.type("typed@example.invalid");
    await expect(email).toHaveValue("typed@example.invalid");

    // Space must reach a text field rather than being swallowed by the result
    // page's own ReactFullpage keydown handler. Asserted on a text input:
    // input[type=email] strips trailing whitespace by spec, so it cannot show
    // this either way.
    const firstName = form.locator('input[name="firstName"]');
    await firstName.scrollIntoViewIfNeeded();
    await firstName.click();
    await page.keyboard.type("Ada");
    await page.keyboard.press("Space");
    await page.keyboard.type("L");
    await expect(firstName).toHaveValue("Ada L");

    // Tab moves out of the field normally.
    await email.click();
    await page.keyboard.press("Tab");
    const movedOff = await email.evaluate((el) => el !== document.activeElement);
    expect(movedOff, "Tab did not move focus out of the input").toBe(true);
  });

  test("the consent checkbox reflects its own state", async ({ page }) => {
    await setup(page);
    const checkbox = page.locator('input[name="wouldBuy"]');
    await checkbox.scrollIntoViewIfNeeded();
    await expect(checkbox).toBeChecked();
    await checkbox.uncheck();
    await expect(checkbox).not.toBeChecked();
    await checkbox.check();
    await expect(checkbox).toBeChecked();
  });
});
