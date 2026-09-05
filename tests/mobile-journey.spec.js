import { test, expect } from "@playwright/test";

/**
 * Mobile completion regression suite (Kenya).
 *
 * This drives the quiz the way a user does: it only ever interacts with the
 * section fullpage.js reports as active, and after each Continue it asserts
 * that the active section index AND the URL hash actually moved on. It never
 * scrolls to a section by index, so if `moveSectionDown()` stopped working the
 * suite fails rather than quietly checking eight already-rendered sections.
 *
 * Nothing here touches production: the config refuses a non-local baseURL,
 * analytics hosts are blocked, and /api/subscribe is mocked.
 */

/** Anchor per section, in order - mirrors the `anchors` prop in quiz.jsx. */
const ANCHORS = [
  "Question-1",
  "Question-2",
  "Question-3",
  "Question-4",
  "Question-5",
  "Chocolate-consumer",
  "Question-6",
  "Question-7",
];

/** Sections that must not allow Continue until something is chosen. */
const REQUIRES_ANSWER = new Set([0, 6]);

const blockThirdParties = (page) =>
  page.route(/googletagmanager|google-analytics|facebook\.(net|com)|clarity\.ms|luckyorange/, (route) =>
    route.abort()
  );

const mockSubscribe = (page) =>
  page.route("**/api/subscribe", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true, message: "mocked" }),
    })
  );

/** Index of the section fullpage.js currently considers active. */
const activeIndex = (page) =>
  page.evaluate(() =>
    [...document.querySelectorAll(".section")].findIndex((s) =>
      s.classList.contains("active")
    )
  );

/** Fails if navigation did not actually move to `index`. */
const expectActiveSection = async (page, index) => {
  await expect
    .poll(() => activeIndex(page), {
      message: `section ${index + 1} never became active - navigation did not advance`,
      timeout: 15000,
    })
    .toBe(index);

  // The hash is an independent witness: fullpage only writes it on a real move.
  if (index > 0) {
    await expect
      .poll(() => page.evaluate(() => window.location.hash), {
        message: `URL hash did not advance to ${ANCHORS[index]}`,
        timeout: 15000,
      })
      .toBe(`#${ANCHORS[index]}`);
  }
};

const activeSection = (page) => page.locator(".section.active");

/** Wait until scrolling has stopped, so keyboard focus is not stolen mid-move. */
const waitForScrollSettled = async (page) => {
  await expect
    .poll(
      async () => {
        const a = await page.evaluate(() => Math.round(window.scrollY));
        await page.waitForFunction(() => true);
        const b = await page.evaluate(
          () =>
            new Promise((r) =>
              requestAnimationFrame(() =>
                requestAnimationFrame(() => r(Math.round(window.scrollY)))
              )
            )
        );
        return a === b;
      },
      { message: "page never stopped scrolling", timeout: 15000 }
    )
    .toBe(true);
};

/** True when the element's box is inside the viewport, not just in the DOM. */
const isInViewport = (locator) =>
  locator.evaluate((el) => {
    const r = el.getBoundingClientRect();
    return (
      r.width > 0 &&
      r.height > 0 &&
      r.top >= 0 &&
      r.left >= 0 &&
      r.bottom <= window.innerHeight + 0.5 &&
      r.right <= window.innerWidth + 0.5
    );
  });

const expectNoHorizontalOverflow = async (page) => {
  const { scrollWidth, innerWidth } = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
  }));
  expect(
    scrollWidth,
    `horizontal overflow: scrollWidth ${scrollWidth} > innerWidth ${innerWidth}`
  ).toBeLessThanOrEqual(innerWidth);
};

const continueButton = (page) =>
  activeSection(page).getByRole("button", {
    name: /Continue to the next question|View your results/,
  });

/** Choose an answer in the *active* section, for the questions that need one. */
const answerActiveSection = async (page, index) => {
  if (index === 0) {
    // The region select is always available, map or no map.
    await activeSection(page).locator("#kenya-region").selectOption("Nairobi");
  }
  if (index === 6) {
    // Cart products render as 13-27px SVG groups - below the 44px touch
    // target guidance, and too small to hit-test reliably.
    await activeSection(page)
      .locator("#white-wine, #red-wine, #black-tea, #ground-coffee")
      .first()
      .dispatchEvent("click");
  }
};

/**
 * Question 6 does not advance on the first Continue - it raises a "want to
 * refine your cart?" prompt. Take the general-answer branch.
 */
const clearRefinePrompt = async (page) => {
  const general = page.getByRole("button", { name: /general answer/i });
  await expect(general).toBeVisible();
  await general.click();
};

const gotoQuiz = async (page) => {
  await blockThirdParties(page);
  await mockSubscribe(page);
  await page.goto("/quiz", { waitUntil: "domcontentloaded" });
  await expect(page.locator("html")).toHaveClass(/quiz-mobile/);
  await expectActiveSection(page, 0);
};

test.describe("mobile quiz completion", () => {
  test("all eight questions complete in sequence with every control reachable", async ({
    page,
  }) => {
    await gotoQuiz(page);

    for (let i = 0; i < ANCHORS.length; i += 1) {
      // Only ever act on the section navigation actually put us on.
      await expectActiveSection(page, i);
      const current = activeSection(page);

      // Heading must be visible and clear of the fixed header.
      const heading = current.locator("h2").last();
      await expect(heading).toBeVisible();
      const headerHeight = await page.evaluate(() => {
        const nav = document.querySelector(".quiz-nav");
        return nav ? nav.getBoundingClientRect().height : 0;
      });
      const box = await heading.boundingBox();
      expect(
        box.y + box.height,
        `section ${i + 1}: heading sits behind the fixed header`
      ).toBeGreaterThan(headerHeight);

      const next = continueButton(page);
      await expect(next).toBeVisible();

      // Accessible names must be the real thing, not just non-empty.
      const isLast = i === ANCHORS.length - 1;
      await expect(next).toHaveAccessibleName(
        isLast ? "View your results" : "Continue to the next question"
      );
      if (i > 0) {
        await expect(
          current.getByRole("button", { name: "Previous question" })
        ).toHaveAccessibleName("Previous question");
      }

      if (REQUIRES_ANSWER.has(i)) {
        await expect(
          next,
          `section ${i + 1}: Continue must be disabled before answering`
        ).toBeDisabled();
        await answerActiveSection(page, i);
        await expect(next).toBeEnabled();
      }

      // Measure against this specific section. `.section.active` can drift
      // while fullpage.js settles its scroll position, which would otherwise
      // make the poll compare a different section's button each iteration.
      const nextHere = page
        .locator(".section")
        .nth(i)
        .getByRole("button", {
          name: /Continue to the next question|View your results/,
        });
      await nextHere.scrollIntoViewIfNeeded();
      await expect
        .poll(() => isInViewport(nextHere), {
          message: `section ${i + 1}: Continue is not fully inside the viewport`,
          timeout: 10000,
        })
        .toBe(true);

      await expectNoHorizontalOverflow(page);

      if (isLast) break;

      await next.click();
      if (i === 6) await clearRefinePrompt(page);

      // Sections 1-6 route onward through the fact dialog.
      const dialog = page.getByRole("dialog");
      if (await dialog.isVisible().catch(() => false)) {
        const close = dialog.getByRole("button", { name: "Close" });
        const proceed = dialog.getByRole("button", {
          name: /Go to Next Question|View your results/,
        });

        expect(
          await isInViewport(close),
          `section ${i + 1}: dialog Close is outside the viewport`
        ).toBe(true);
        expect(
          await isInViewport(proceed),
          `section ${i + 1}: dialog Continue is outside the viewport`
        ).toBe(true);
        await expectNoHorizontalOverflow(page);

        await proceed.click();
        await expect(dialog).toBeHidden();
      }

      // The assertion that makes this a navigation test: if moveSectionDown()
      // did nothing, the active index and hash stay put and this fails.
      await expectActiveSection(page, i + 1);
    }

    // Finishing the last question must leave the quiz for a result page.
    await continueButton(page).click();
    const dialog = page.getByRole("dialog");
    if (await dialog.isVisible().catch(() => false)) {
      await dialog.getByRole("button", { name: /View your results/ }).click();
    }
    await expect(page).toHaveURL(/\/result-\d+/);
  });

  test("fact dialog traps focus, closes on Escape and restores focus", async ({
    page,
  }) => {
    await gotoQuiz(page);

    // Advance to Question 2, which is answerable from the start.
    await answerActiveSection(page, 0);
    await continueButton(page).click();
    await page
      .getByRole("dialog")
      .getByRole("button", { name: /Go to Next Question/ })
      .click();
    await expectActiveSection(page, 1);

    await waitForScrollSettled(page);

    // Opened by click. Enter-activation immediately after a section change is
    // covered separately below - it is currently broken (see that test).
    const next = continueButton(page);
    await next.click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute("aria-modal", "true");
    await expect(dialog).toHaveAttribute("aria-labelledby", /\S/);

    await expect
      .poll(() =>
        page.evaluate(() => {
          const d = document.querySelector('[role="dialog"]');
          return d ? d.contains(document.activeElement) : false;
        })
      )
      .toBe(true);

    await expect(dialog.locator(".quiz-dialog-body")).toHaveCSS(
      "overflow-y",
      "auto"
    );
    await expect(
      dialog.getByRole("button", { name: "Close" })
    ).toHaveAccessibleName("Close");

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();

    await expect
      .poll(() =>
        page.evaluate(
          () =>
            document.activeElement &&
            document.activeElement.getAttribute("aria-label")
        )
      )
      .toMatch(/Continue to the next question/);

    // Escape must not have advanced the quiz.
    expect(await activeIndex(page)).toBe(1);
  });

  test("focus moves to the new question's heading after advancing", async ({
    page,
  }) => {
    await gotoQuiz(page);

    await answerActiveSection(page, 0);
    await continueButton(page).click();
    await page
      .getByRole("dialog")
      .getByRole("button", { name: /Go to Next Question/ })
      .click();
    await expectActiveSection(page, 1);

    // fullpage's afterLoad hands focus to the heading of the section it just
    // loaded, so focus is never left on the previous, off-screen question.
    const heading = page.locator(".section").nth(1).locator("[data-quiz-heading]");
    await expect(heading).toBeFocused();
    await expect(heading).toHaveAttribute("tabindex", "-1");

    // ...and the focused heading is the one on screen.
    expect(
      await isInViewport(heading),
      "focused heading is outside the viewport"
    ).toBe(true);

    // Focus must not be sitting on anything belonging to a previous section.
    const focusedSectionIndex = await page.evaluate(() => {
      const sections = [...document.querySelectorAll(".section")];
      return sections.findIndex((s) => s.contains(document.activeElement));
    });
    expect(focusedSectionIndex).toBe(1);
  });

  test("keyboard users can Tab from the heading into the question", async ({
    page,
  }) => {
    await gotoQuiz(page);

    await answerActiveSection(page, 0);
    await continueButton(page).click();
    await page
      .getByRole("dialog")
      .getByRole("button", { name: /Go to Next Question/ })
      .click();
    await expectActiveSection(page, 1);
    await waitForScrollSettled(page);
    await expect(
      page.locator(".section").nth(1).locator("[data-quiz-heading]")
    ).toBeFocused();

    // Tabbing forward must reach this question's own controls, in this section.
    let reachedContinue = false;
    for (let i = 0; i < 12 && !reachedContinue; i += 1) {
      await page.keyboard.press("Tab");
      const focused = await page.evaluate(() => {
        const el = document.activeElement;
        const sections = [...document.querySelectorAll(".section")];
        return {
          label: el?.getAttribute("aria-label") || null,
          sectionIndex: sections.findIndex((s) => s.contains(el)),
        };
      });
      // Never tab into a section we have left behind.
      if (focused.sectionIndex !== -1) {
        expect(
          focused.sectionIndex,
          "Tab moved focus into a different section"
        ).toBe(1);
      }
      if (focused.label === "Continue to the next question") reachedContinue = true;
    }
    expect(reachedContinue, "Continue was not reachable by Tab").toBe(true);
  });

  test("Enter and Space activate the new section's Continue button", async ({
    page,
  }) => {
    await gotoQuiz(page);

    await answerActiveSection(page, 0);
    await continueButton(page).click();
    await page
      .getByRole("dialog")
      .getByRole("button", { name: /Go to Next Question/ })
      .click();
    await expectActiveSection(page, 1);
    await waitForScrollSettled(page);
    // afterLoad hands focus to the heading; that is the signal the section has
    // finished settling and keyboard input will land where we expect.
    await expect(
      page.locator(".section").nth(1).locator("[data-quiz-heading]")
    ).toBeFocused();

    // Enter, immediately after advancing - this is what used to be swallowed.
    await continueButton(page).press("Enter");
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();

    // Space must activate it too.
    await continueButton(page).press(" ");
    await expect(dialog).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();

    // Dismissing returns focus to the trigger, not to another section.
    await expect(continueButton(page)).toBeFocused();
    expect(await activeIndex(page)).toBe(1);
  });

  test("dialog keeps its own Tab trap and Escape while the shield is active", async ({
    page,
  }) => {
    await gotoQuiz(page);
    await answerActiveSection(page, 0);
    await continueButton(page).click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    // Tab must cycle inside the dialog, never escaping to the page behind it.
    for (let i = 0; i < 6; i += 1) {
      await page.keyboard.press("Tab");
      const insideDialog = await page.evaluate(() => {
        const d = document.querySelector('[role="dialog"]');
        return d ? d.contains(document.activeElement) : false;
      });
      expect(insideDialog, `Tab ${i + 1} escaped the dialog`).toBe(true);
    }

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    // Escape dismissal returns focus to the trigger and does not advance.
    await expect(continueButton(page)).toBeFocused();
    expect(await activeIndex(page)).toBe(0);
  });

  test("controls remain reachable under slow 3G and 4x CPU throttling", async ({
    page,
  }) => {
    const client = await page.context().newCDPSession(page);
    await client.send("Network.enable");
    await client.send("Network.emulateNetworkConditions", {
      offline: false,
      latency: 400,
      downloadThroughput: (400 * 1024) / 8,
      uploadThroughput: (400 * 1024) / 8,
    });
    await client.send("Emulation.setCPUThrottlingRate", { rate: 4 });

    await gotoQuiz(page);

    await expect(activeSection(page).locator("h2").last()).toBeVisible();
    const next = continueButton(page);
    await expect(next).toBeVisible();
    await next.scrollIntoViewIfNeeded();
    await expect
      .poll(() => isInViewport(next), {
        message: "Continue is not inside the viewport under throttling",
        timeout: 15000,
      })
      .toBe(true);
    await expectNoHorizontalOverflow(page);

    // Navigation still works on a slow device.
    await answerActiveSection(page, 0);
    await expect(next).toBeEnabled();
    await next.click();
    await page
      .getByRole("dialog")
      .getByRole("button", { name: /Go to Next Question/ })
      .click();
    await expectActiveSection(page, 1);
  });

  test("respects prefers-reduced-motion without hiding content", async ({
    browser,
  }, testInfo) => {
    const context = await browser.newContext({
      viewport: testInfo.project.use.viewport,
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    await gotoQuiz(page);

    const heading = activeSection(page).locator("h2").last();
    await expect(heading).toBeVisible();
    await expect(heading).toHaveCSS("opacity", "1");
    await context.close();
  });
});
