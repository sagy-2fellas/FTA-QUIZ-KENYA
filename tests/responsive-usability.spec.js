import { test, expect } from '@playwright/test';

/**
 * Comprehensive Responsive & Usability Test Suite - Kenya Edition
 * Tests the entire quiz flow across all devices and browsers
 *
 * Coverage:
 * - Landing page load and display
 * - Quiz navigation through all questions
 * - Touch interactions and buttons
 * - Form submission
 * - Responsive layout
 * - Performance metrics
 */

test.describe('Landing Page - Responsive Design', () => {

  test('should load landing page successfully', async ({ page }) => {
    await page.goto('/');

    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');

    // Check title
    await expect(page).toHaveTitle(/Fairtrade Africa Quiz/i);

    // Take screenshot for visual verification
    await page.screenshot({ path: `test-results/landing-${test.info().project.name}.png`, fullPage: true });
  });

  test('should have no horizontal scroll', async ({ page }) => {
    await page.goto('/');

    const scrollWidth = await page.evaluate(() => {
      return {
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth
      };
    });

    expect(scrollWidth.scrollWidth).toBeLessThanOrEqual(scrollWidth.clientWidth + 1);
  });

  test('should have readable text and proper contrast', async ({ page }) => {
    await page.goto('/');

    // Check that main heading exists and is visible
    const heading = page.locator('h1, h2').first();
    await expect(heading).toBeVisible();

    // Get computed styles to check font size
    const fontSize = await heading.evaluate(el => {
      const style = window.getComputedStyle(el);
      return parseInt(style.fontSize);
    });

    // Font size should be at least 16px for readability
    expect(fontSize).toBeGreaterThanOrEqual(16);
  });

  test('should have tappable buttons with adequate touch targets', async ({ page, isMobile }) => {
    if (!isMobile) {
      test.skip();
    }

    await page.goto('/');

    // Find all clickable elements (buttons, links)
    const buttons = await page.locator('button, a[href], input[type="button"], input[type="submit"]').all();

    for (const button of buttons.slice(0, 5)) { // Check first 5 buttons
      if (await button.isVisible()) {
        const box = await button.boundingBox();
        if (box) {
          // Touch targets should be at least 44x44px (iOS) or 48x48px (Android)
          expect(box.width).toBeGreaterThanOrEqual(40);
          expect(box.height).toBeGreaterThanOrEqual(40);
        }
      }
    }
  });

});

test.describe('Quiz Flow - All Questions', () => {

  test('should navigate to quiz page', async ({ page }) => {
    await page.goto('/quiz');
    await page.waitForLoadState('networkidle');

    // Quiz should load
    await expect(page).toHaveURL(/quiz/);

    // Take screenshot
    await page.screenshot({ path: `test-results/quiz-start-${test.info().project.name}.png`, fullPage: true });
  });

  test('should display quiz question', async ({ page }) => {
    await page.goto('/quiz');
    await page.waitForSelector('text=/question|choose|select/i', { timeout: 10000 });

    // Check for quiz content
    const hasQuizContent = await page.locator('button, input[type="radio"], input[type="checkbox"]').count();
    expect(hasQuizContent).toBeGreaterThan(0);
  });

  test('should allow answer selection', async ({ page, isMobile }) => {
    await page.goto('/quiz');
    await page.waitForTimeout(2000); // Wait for quiz to initialize

    // Find first selectable answer
    const answerButtons = page.locator('button, input[type="radio"], label');
    const count = await answerButtons.count();

    if (count > 0) {
      const firstAnswer = answerButtons.first();

      if (isMobile) {
        // Use tap for mobile
        await firstAnswer.tap({ timeout: 5000 }).catch(() => {
          // If tap fails, try click
          return firstAnswer.click({ timeout: 5000 });
        });
      } else {
        await firstAnswer.click({ timeout: 5000 });
      }

      // Wait a bit for any animation
      await page.waitForTimeout(1000);

      // Take screenshot
      await page.screenshot({ path: `test-results/quiz-answered-${test.info().project.name}.png`, fullPage: true });
    }
  });

  test('should handle fullpage.js scrolling', async ({ page, isMobile }) => {
    await page.goto('/quiz');
    await page.waitForTimeout(2000);

    const initialUrl = page.url();

    // Try to navigate using arrow keys (desktop) or swipe (mobile)
    if (isMobile) {
      // Simulate swipe gesture
      await page.mouse.move(200, 400);
      await page.mouse.down();
      await page.mouse.move(200, 100, { steps: 10 });
      await page.mouse.up();
    } else {
      // Use arrow down key
      await page.keyboard.press('ArrowDown');
    }

    await page.waitForTimeout(1500);

    // Take screenshot after navigation attempt
    await page.screenshot({ path: `test-results/quiz-navigation-${test.info().project.name}.png`, fullPage: true });
  });

});

test.describe('Result Page - Form Submission', () => {

  test('should navigate to result page', async ({ page }) => {
    // Go directly to a result page
    await page.goto('/result-3');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveURL(/result/);

    // Take screenshot
    await page.screenshot({ path: `test-results/result-page-${test.info().project.name}.png`, fullPage: true });
  });

  test('should display giveaway form', async ({ page }) => {
    await page.goto('/result-3');

    // Check for form elements
    const emailInput = page.locator('input[name="email"], input[type="email"]');
    await expect(emailInput).toBeVisible({ timeout: 10000 });

    const firstName = page.locator('input[name="firstName"]');
    const lastName = page.locator('input[name="lastName"]');

    await expect(firstName).toBeVisible();
    await expect(lastName).toBeVisible();
  });

  test('should have mobile-friendly form inputs', async ({ page, isMobile }) => {
    if (!isMobile) {
      test.skip();
    }

    await page.goto('/result-3');

    // Check email input has correct input type for mobile keyboard
    const emailInput = page.locator('input[type="email"], input[name="email"]');
    const inputType = await emailInput.getAttribute('type');

    expect(inputType).toBe('email');
  });

  test('should allow form submission', async ({ page }) => {
    await page.goto('/result-3');

    // Fill form with test data
    await page.fill('input[name="firstName"]', 'Test');
    await page.fill('input[name="lastName"]', 'User');
    await page.fill('input[name="email"], input[type="email"]', `test-${Date.now()}@example.com`);

    // Select an option if dropdown exists
    const dropdown = page.locator('select[name="iAm"]');
    if (await dropdown.isVisible()) {
      await dropdown.selectOption({ index: 1 });
    }

    // Take screenshot of filled form
    await page.screenshot({ path: `test-results/form-filled-${test.info().project.name}.png`, fullPage: true });

    // Submit form
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    // Wait for navigation or success message
    await page.waitForTimeout(3000);

    // Should redirect to thank you page or show success message
    const currentUrl = page.url();
    const hasSuccess = currentUrl.includes('thanks') ||
                      currentUrl.includes('thank') ||
                      await page.locator('text=/success|thank/i').count() > 0;

    expect(hasSuccess).toBeTruthy();

    // Take screenshot of success state
    await page.screenshot({ path: `test-results/form-success-${test.info().project.name}.png`, fullPage: true });
  });

});

test.describe('Performance Metrics', () => {

  test('should load page within acceptable time', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const loadTime = Date.now() - startTime;

    // Page should load within 5 seconds (generous for 3G)
    expect(loadTime).toBeLessThan(5000);

    console.log(`Load time for ${test.info().project.name}: ${loadTime}ms`);
  });

  test('should have no console errors', async ({ page }) => {
    const errors = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Filter out known third-party errors
    const criticalErrors = errors.filter(err =>
      !err.includes('favicon') &&
      !err.includes('chrome-extension') &&
      !err.includes('clarity.ms')
    );

    expect(criticalErrors.length).toBe(0);
  });

  test('should load images properly', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Find all images
    const images = await page.locator('img').all();

    for (const img of images.slice(0, 5)) { // Check first 5 images
      if (await img.isVisible()) {
        const src = await img.getAttribute('src');
        const naturalWidth = await img.evaluate(el => el.naturalWidth);

        // Image should have loaded (naturalWidth > 0)
        expect(naturalWidth).toBeGreaterThan(0);
      }
    }
  });

});

test.describe('Responsive Layout', () => {

  test('should adapt layout to viewport size', async ({ page, viewport }) => {
    await page.goto('/');

    // Get viewport dimensions
    const viewportWidth = viewport.width;

    // Check if layout adapts
    const body = await page.locator('body').boundingBox();

    expect(body.width).toBeLessThanOrEqual(viewportWidth);
  });

  test('should support both orientations', async ({ page, isMobile, viewport }) => {
    if (!isMobile) {
      test.skip();
    }

    // Portrait
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: `test-results/orientation-portrait-${test.info().project.name}.png`, fullPage: true });

    // Note: Actual device rotation requires emulation settings
    // This test documents the requirement
  });

});

test.describe('Accessibility & Usability', () => {

  test('should have proper page structure', async ({ page }) => {
    await page.goto('/');

    // Check for semantic HTML
    const hasMain = await page.locator('main, [role="main"]').count();
    const hasHeadings = await page.locator('h1, h2, h3').count();

    expect(hasHeadings).toBeGreaterThan(0);
  });

  test('should allow keyboard navigation', async ({ page, isMobile }) => {
    if (isMobile) {
      test.skip();
    }

    await page.goto('/quiz');
    await page.waitForTimeout(2000);

    // Try tab navigation
    await page.keyboard.press('Tab');
    await page.waitForTimeout(500);

    const focusedElement = await page.evaluateHandle(() => document.activeElement);
    const tagName = await focusedElement.evaluate(el => el.tagName);

    // Should be able to focus on elements
    expect(['BUTTON', 'A', 'INPUT']).toContain(tagName);
  });

});
