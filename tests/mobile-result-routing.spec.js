import { test, expect } from "@playwright/test";
import { getResultRoute } from "../src/utils/resultRoute";

test("every designed result has a matching answer combination", () => {
  const tea = "Black Tea";
  const coffee = "Coffee Beans";
  const wine = "Red Wine";
  const combinations = [
    [[], [], 16],
    [[tea], [], 6], [[coffee], [], 5], [[wine], [], 7],
    [[tea, coffee], [], 2], [[tea, wine], [], 4], [[coffee, wine], [], 3],
    [[tea, coffee, wine], [], 1],
    [[tea], [tea], 10], [[coffee], [coffee], 11], [[wine], [wine], 12],
    [[tea, coffee], [tea, coffee], 13], [[tea, wine], [tea, wine], 15],
    [[coffee, wine], [coffee, wine], 14],
    [[tea, coffee, wine], [tea, coffee, wine], 9],
    [[tea, coffee], [tea], 8],
  ];
  for (const [products, certified, expected] of combinations) {
    expect(getResultRoute(products, certified), `route ${expected}`).toBe(expected);
  }
});

async function goToShop(page) {
  await page.goto("/quiz", { waitUntil: "domcontentloaded" });
  await page.locator("#kenya-region").selectOption("Nairobi");
  const anchors = ["Question-2", "Question-3", "Question-4", "Question-5", "Chocolate-consumer", "Question-6"];
  for (const anchor of anchors) {
    await page.locator(".section.active .quiz-mobile-nav button[aria-label='Continue to the next question']").click();
    await page.getByRole("dialog").getByRole("button", { name: "Go to Next Question" }).click();
    await expect(page.locator(".section.active")).toHaveAttribute("data-anchor", anchor);
  }
}

async function finishFromShop(page, products, fairtradeProducts) {
  await goToShop(page);
  for (const product of products) {
    await page.locator(".section.active .quiz-shop-product").filter({ hasText: product }).click();
  }
  await page.locator(".section.active .quiz-mobile-nav button[aria-label='Continue to the next question']").click();
  const refine = page.getByRole("dialog", { name: "Refine your selection" });
  await expect(refine).toBeVisible();
  for (const product of fairtradeProducts) {
    await refine.locator(`input[name="${product}"]`).check();
  }
  await refine.getByRole("button", { name: "Save and continue" }).click();
  await page.getByRole("dialog", { name: "The label is small. The checks behind it aren’t." })
    .getByRole("button", { name: "Go to Next Question" }).click();
  await expect(page.locator(".section.active")).toHaveAttribute("data-anchor", "Question-7");
  await page.locator(".section.active .quiz-mobile-nav button[aria-label='View your results']").click();
  await page.getByRole("dialog", { name: "Tea can move uphill. Farmers can’t move a mountain overnight." })
    .getByRole("button", { name: "View your results" }).click();
}

test("mixed Fairtrade choices within one product type reach the mixed result", async ({ page }) => {
  await finishFromShop(page, ["Black Tea", "Herbal Tea"], ["Black Tea"]);
  await expect(page).toHaveURL(/\/result-8$/);
});

test("shoppers who buy none of the listed products can reach their result", async ({ page }) => {
  await goToShop(page);
  const none = page.getByRole("button", { name: "I don't buy any of these" });
  await expect(none).toBeInViewport();
  await none.click();
  await page.locator(".section.active .quiz-mobile-nav button[aria-label='Continue to the next question']").click();
  await page.getByRole("dialog", { name: "The label is small. The checks behind it aren’t." })
    .getByRole("button", { name: "Go to Next Question" }).click();
  await expect(page.locator(".section.active")).toHaveAttribute("data-anchor", "Question-7");
  await page.locator(".section.active .quiz-mobile-nav button[aria-label='View your results']").click();
  await page.getByRole("dialog", { name: "Tea can move uphill. Farmers can’t move a mountain overnight." })
    .getByRole("button", { name: "View your results" }).click();
  await expect(page).toHaveURL(/\/result-16$/);
  const savedAnswers = await page.evaluate(() =>
    Object.entries(sessionStorage)
      .filter(([key]) => key.toLowerCase().includes("quiz"))
      .map(([, value]) => value)
  );
  expect(savedAnswers.some((value) => value.includes('"shopping_cart":[]'))).toBe(true);
});
