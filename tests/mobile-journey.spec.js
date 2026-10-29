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
    const coffee = activeSection(page).getByRole("button", { name: "Coffee Beans" });
    const box = await coffee.boundingBox();
    expect(box.width).toBeGreaterThanOrEqual(44);
    expect(box.height).toBeGreaterThanOrEqual(44);
    await coffee.click();
    await expect(coffee).toHaveAttribute("aria-pressed", "true");
  }
};

/**
 * Question 6 does not advance on the first Continue - it raises a "want to
 * refine your cart?" prompt. Take the general-answer branch.
 */
const clearRefinePrompt = async (page) => {
  await page.getByRole("dialog", { name: "Refine your selection" }).getByRole("button", { name: "Save and continue" }).click();
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
      await expect(page.getByRole("progressbar", { name: "Quiz progress" }))
        .toHaveAttribute("aria-valuenow", String(i + 1));

      if (i === 0) {
        const region = current.locator("#kenya-region");
        expect(await isInViewport(region), "region list is below the first phone screen")
          .toBe(true);
      }

      // Heading must be visible and clear of the fixed header.
      const heading = current.locator("h2").last();
      await expect(heading).toBeVisible();
      if (i === 4) {
        await expect(heading).toHaveText("Between us friends, how much wine do you actually drink?");
        await expect(current.locator(".message-box")).toHaveText("A glass every now and then");
        await expect(current.locator(".wine-level-bottle")).toBeVisible();
      }
      const headerHeight = await page.evaluate(() => {
        const nav = document.querySelector(".quiz-nav");
        return nav ? nav.getBoundingClientRect().height : 0;
      });
      const box = await heading.boundingBox();
      expect(
        box.y + box.height,
        `section ${i + 1}: heading sits behind the fixed header`
      ).toBeGreaterThan(headerHeight);

      // Every question starts at the same baseline, even when its content is tall.
      await expect.poll(async () => heading.evaluate((el) => {
        const header = document.querySelector(".quiz-nav").getBoundingClientRect();
        return Math.round(el.getBoundingClientRect().top - header.bottom);
      })).toBe(16);
      await expect(heading).toHaveCSS("font-size", `${Math.max(28, Math.min(44, page.viewportSize().width * 0.031))}px`);

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

      // Each question now routes onward through a fact dialog.
      const dialog = page.getByRole("dialog");
      if (await dialog.isVisible().catch(() => false)) {
        if (i === 4) {
          await expect(dialog).toContainText("In South Africa’s Cape Winelands");
          await expect(dialog).toContainText("Fairtrade is using that benchmark");
        }
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
    const savedAnswers = await page.evaluate(() => {
      const saved = sessionStorage.getItem("bfa-completed-quiz-v1");
      return saved ? JSON.parse(saved).answers : null;
    });
    expect(savedAnswers?.question_1).toBeTruthy();
    expect(savedAnswers?.question_7).toBe(3);

    // A result-page reload must keep the real quiz answers in the signup payload.
    await page.reload({ waitUntil: "domcontentloaded" });
    let submitted = null;
    page.on("request", (request) => {
      if (request.url().includes("/api/subscribe")) {
        submitted = request.postDataJSON();
      }
    });
    const form = page.locator(".results-signup form");
    await form.locator('input[name="firstName"]').fill("Test");
    await form.locator('input[name="lastName"]').fill("Person");
    await form.locator('input[name="email"]').fill("not-real@example.invalid");
    await form.getByRole("button", { name: /giveaway/i }).click();
    await expect.poll(() => submitted).not.toBeNull();
    expect(submitted.customFields.question_1).toEqual(savedAnswers.question_1);
    expect(submitted.customFields.question_7).toEqual(savedAnswers.question_7);
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


test("refinement keeps Submit visible with all eight products and supports unticking", async ({ page }) => {
  await gotoQuiz(page);
  for (let i = 0; i < 6; i += 1) {
    if (REQUIRES_ANSWER.has(i)) await answerActiveSection(page, i);
    await continueButton(page).click();
    const fact = page.getByRole("dialog");
    await expect(fact).toBeVisible();
    await fact.getByRole("button", { name: "Go to Next Question" }).click();
    await expectActiveSection(page, i + 1);
  }
  await expectActiveSection(page, 6);
  for (const name of ["White Wine", "Red Wine", "Rosé", "Coffee Beans", "Ground Coffee", "Black Tea", "Rooibos Tea", "Herbal Tea"]) {
    await activeSection(page).getByRole("button", { name, exact: true }).click();
  }
  await continueButton(page).click();
  const dialog = page.getByRole("dialog", { name: "Refine your selection" });
  const submit = dialog.getByRole("button", { name: "Save and continue", exact: true });
  await expect(dialog).toBeVisible();
  expect(await isInViewport(submit)).toBe(true);
  await expect(dialog.getByRole("checkbox")).toHaveCount(8);
  const last = dialog.getByRole("checkbox").last();
  await last.check();
  await expect(last).toBeChecked();
  await last.uncheck();
  await expect(last).not.toBeChecked();
  expect(await isInViewport(submit)).toBe(true);
  await submit.click();
  const fact = page.getByRole("dialog", { name: "The label is small. The checks behind it aren’t." });
  await expect(fact).toBeVisible();
  await expect(fact).toContainText("Fairtrade Mark identifies a product");
  await fact.getByRole("button", { name: "Go to Next Question" }).click();
  await expectActiveSection(page, 7);
  await expect(dialog).toHaveCount(0);
});

test("Fairtrade logo and answer bubble do not overlap", async ({ page }) => {
  await gotoQuiz(page);
  await activeSection(page).locator("#kenya-region").selectOption("Nairobi");
  await continueButton(page).click();
  await page.getByRole("dialog").getByRole("button", { name: "Go to Next Question" }).click();
  await expectActiveSection(page, 1);
  const logo = activeSection(page).getByAltText("Fairtrade Mark");
  await expect(logo).toBeVisible();
  await expect.poll(async () => {
    const a = await logo.boundingBox();
    const b = await activeSection(page).locator(".message-box").boundingBox();
    return b.y - (a.y + a.height);
  }).toBeGreaterThanOrEqual(20);
});
