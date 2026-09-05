import { defineConfig } from "@playwright/test";

/**
 * Mobile usability regression config.
 *
 * Deliberately separate from playwright.config.js, which targets the live
 * deployment. This one only ever runs against a locally started server, so no
 * test traffic, analytics event or Klaviyo profile can reach production.
 *
 *   npx playwright test -c tests/playwright.mobile.config.js
 */

const PORT = process.env.MOBILE_TEST_PORT || "3102";
const BASE_URL = process.env.MOBILE_TEST_BASE_URL || `http://127.0.0.1:${PORT}`;

if (!/^https?:\/\/(127\.0\.0\.1|localhost)(:|\/|$)/.test(BASE_URL)) {
  throw new Error(
    `Refusing to run the mobile suite against a non-local target: ${BASE_URL}`
  );
}

export default defineConfig({
  testDir: "./",
  testMatch: /(mobile-.*|keyboard-desktop)\.spec\.js/,
  timeout: 120 * 1000,
  expect: { timeout: 15 * 1000 },
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [["list"]],
  outputDir: "./test-results/mobile",

  use: {
    baseURL: BASE_URL,
    // Use the full Chromium build rather than the headless shell.
    channel: "chromium",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    actionTimeout: 20 * 1000,
  },

  projects: [
    {
      name: "320x480",
      use: { viewport: { width: 320, height: 480 } },
      testMatch: /mobile-.*\.spec\.js/,
    },
    {
      name: "360x540",
      use: { viewport: { width: 360, height: 540 } },
      testMatch: /mobile-.*\.spec\.js/,
    },
    {
      name: "360x640",
      use: { viewport: { width: 360, height: 640 } },
      testMatch: /mobile-.*\.spec\.js/,
    },
    {
      // Desktop must be untouched by the mobile keyboard shielding.
      name: "desktop-1280x800",
      use: { viewport: { width: 1280, height: 800 } },
      testMatch: /keyboard-desktop\.spec\.js/,
    },
  ],

  webServer: {
    command: `npm run start -- --port ${PORT}`,
    url: BASE_URL,
    reuseExistingServer: true,
    timeout: 180 * 1000,
  },
});
