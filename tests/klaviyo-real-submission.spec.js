import { test, expect } from '@playwright/test';

/**
 * REAL Klaviyo Submission Test for KENYA
 *
 * This test DOES NOT mock the API - it actually submits to Klaviyo
 * Use this to verify the form works end-to-end with real data
 *
 * Test data:
 *   Name: Martin Shein
 *   Email: marting@diatomic.com
 */

test.describe('Kenya Klaviyo Real Submission Test', () => {

  test('should submit real data to Klaviyo (Kenya)', async ({ page }) => {
    console.log('🚀 Starting real form submission test for Kenya...');

    // Navigate to result page with form
    await page.goto('/result-3');
    console.log('✅ Page loaded');

    // Fill out form with real test data
    await page.fill('input[name="firstName"]', 'Martin');
    console.log('✅ First name filled: Martin');

    await page.fill('input[name="lastName"]', 'Shein');
    console.log('✅ Last name filled: Shein');

    await page.fill('input[name="email"]', 'marting@diatomic.com');
    console.log('✅ Email filled: marting@diatomic.com');

    await page.selectOption('select[name="iAm"]', 'business-partnership');
    console.log('✅ Business type selected: business-partnership');

    // Ensure checkbox is checked
    await page.check('input[name="wouldBuy"]');
    console.log('✅ Checkbox checked');

    // Set up request/response monitoring
    let apiRequestSent = false;
    let apiResponse = null;

    page.on('request', request => {
      if (request.url().includes('/api/subscribe')) {
        console.log('📤 API Request intercepted:');
        console.log('   URL:', request.url());
        console.log('   Method:', request.method());
        apiRequestSent = true;
      }
    });

    page.on('response', async response => {
      if (response.url().includes('/api/subscribe')) {
        apiResponse = response;
        console.log('📥 API Response received:');
        console.log('   Status:', response.status());
        console.log('   Status Text:', response.statusText());

        try {
          const body = await response.json();
          console.log('   Response Body:', JSON.stringify(body, null, 2));
        } catch (e) {
          console.log('   Response Body: (unable to parse)');
        }
      }
    });

    // Submit form
    console.log('🔄 Submitting form...');
    await page.click('button[type="submit"]');

    // Wait a bit for the request to complete
    await page.waitForTimeout(3000);

    // Check if API request was made
    expect(apiRequestSent).toBe(true);
    console.log('✅ API request was sent');

    // Check response status
    if (apiResponse) {
      const status = apiResponse.status();

      if (status === 200) {
        console.log('✅ SUCCESS: Subscription successful (200 OK)');

        // Should redirect to thank you page
        const currentUrl = page.url();
        if (currentUrl.includes('/thanks-for-signing-up')) {
          console.log('✅ SUCCESS: Redirected to thank-you page');
        } else {
          console.log('⚠️  WARNING: Expected redirect but still on:', currentUrl);
        }

        expect(status).toBe(200);
      } else if (status === 400) {
        console.log('❌ FAILED: Bad Request (400)');
        // Check for error message on page
        const errorMsg = await page.locator('p[style*="color: red"]').textContent().catch(() => 'No error message found');
        console.log('   Error displayed:', errorMsg);
        throw new Error(`Subscription failed with 400: ${errorMsg}`);
      } else if (status === 500) {
        console.log('❌ FAILED: Server Error (500)');
        const errorMsg = await page.locator('p[style*="color: red"]').textContent().catch(() => 'No error message found');
        console.log('   Error displayed:', errorMsg);
        throw new Error(`Server error: ${errorMsg}`);
      } else {
        console.log(`⚠️  Unexpected status: ${status}`);
      }
    } else {
      console.log('❌ No API response captured');
    }

    // Take screenshot of final state
    await page.screenshot({ path: 'test-results/kenya-final-state.png', fullPage: true });
    console.log('📸 Screenshot saved to test-results/kenya-final-state.png');
  });

  test('should handle if email already exists (duplicate submission)', async ({ page }) => {
    console.log('🚀 Testing duplicate submission handling for Kenya...');

    await page.goto('/result-3');

    // Submit same email again
    await page.fill('input[name="firstName"]', 'Martin');
    await page.fill('input[name="lastName"]', 'Shein');
    await page.fill('input[name="email"]', 'marting@diatomic.com');
    await page.selectOption('select[name="iAm"]', 'individual-interested');

    let apiResponse = null;

    page.on('response', async response => {
      if (response.url().includes('/api/subscribe')) {
        apiResponse = response;
        console.log('📥 API Response:', response.status());

        try {
          const body = await response.json();
          console.log('   Response:', JSON.stringify(body, null, 2));
        } catch (e) {
          console.log('   (unable to parse response)');
        }
      }
    });

    await page.click('button[type="submit"]');
    await page.waitForTimeout(3000);

    // Even if duplicate (409 internally), our API returns 200
    // with "You are already subscribed!" message or success
    if (apiResponse) {
      const status = apiResponse.status();
      console.log(`✅ Duplicate handled with status: ${status}`);

      // Should be success (our API treats 409 as 200)
      expect([200]).toContain(status);

      // Should still redirect
      const currentUrl = page.url();
      if (currentUrl.includes('/thanks-for-signing-up')) {
        console.log('✅ Properly redirected even for duplicate');
      }
    }
  });
});
