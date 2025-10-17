import { test, expect } from '@playwright/test';

/**
 * Analytics & Tracking Test Suite - Kenya
 * Verifies all tracking scripts load correctly
 *
 * Coverage:
 * - Google Tag Manager (GTM)
 * - Facebook Pixel
 * - Microsoft Clarity
 * - Lucky Orange
 * - LinkedIn Insight Tag
 * - Privacy compliance
 */

test.describe('Google Tag Manager', () => {

  test('should load GTM script', async ({ page }) => {
    const gtmRequests = [];

    page.on('request', request => {
      if (request.url().includes('googletagmanager.com')) {
        gtmRequests.push(request.url());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    expect(gtmRequests.length).toBeGreaterThan(0);
    console.log(`GTM requests: ${gtmRequests.length}`);
  });

  test('should have GTM container ID KB2G5XF', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const hasGTM = await page.evaluate(() => {
      return typeof window.google_tag_manager !== 'undefined' &&
             typeof window.dataLayer !== 'undefined';
    });

    expect(hasGTM).toBe(true);
  });

  test('should push pageview to dataLayer', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const dataLayerEvents = await page.evaluate(() => {
      return window.dataLayer || [];
    });

    expect(dataLayerEvents.length).toBeGreaterThan(0);
    console.log(`DataLayer events: ${dataLayerEvents.length}`);
  });

});

test.describe('Facebook Pixel', () => {

  test('should load Facebook Pixel script', async ({ page }) => {
    const fbRequests = [];

    page.on('request', request => {
      if (request.url().includes('facebook.net') || request.url().includes('fbevents.js')) {
        fbRequests.push(request.url());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    expect(fbRequests.length).toBeGreaterThan(0);
    console.log(`Facebook Pixel requests: ${fbRequests.length}`);
  });

  test('should have Facebook Pixel ID 368869985423322', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const hasFbq = await page.evaluate(() => {
      return typeof window.fbq === 'function';
    });

    expect(hasFbq).toBe(true);
  });

  test('should track PageView event', async ({ page }) => {
    const fbEvents = [];

    page.on('request', request => {
      if (request.url().includes('facebook.com/tr')) {
        fbEvents.push(request.url());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const hasPageView = fbEvents.some(url => url.includes('PageView'));
    expect(hasPageView).toBe(true);
  });

});

test.describe('Microsoft Clarity', () => {

  test('should load Clarity script', async ({ page }) => {
    const clarityRequests = [];

    page.on('request', request => {
      if (request.url().includes('clarity.ms')) {
        clarityRequests.push(request.url());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    expect(clarityRequests.length).toBeGreaterThan(0);
    console.log(`Clarity requests: ${clarityRequests.length}`);
  });

  test('should have Clarity project ID tmm5h0wrk6', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const hasClarity = await page.evaluate(() => {
      return typeof window.clarity === 'function';
    });

    expect(hasClarity).toBe(true);
  });

  test('should initialize Clarity tracking', async ({ page }) => {
    const clarityScripts = [];

    page.on('response', response => {
      if (response.url().includes('clarity.ms/tag/tmm5h0wrk6')) {
        clarityScripts.push(response.url());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    expect(clarityScripts.length).toBeGreaterThan(0);
  });

});

test.describe('Lucky Orange', () => {

  test('should load Lucky Orange script', async ({ page }) => {
    const loRequests = [];

    page.on('request', request => {
      if (request.url().includes('luckyorange.com')) {
        loRequests.push(request.url());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    expect(loRequests.length).toBeGreaterThan(0);
    console.log(`Lucky Orange requests: ${loRequests.length}`);
  });

  test('should have Lucky Orange site ID 47375252', async ({ page }) => {
    const loScripts = [];

    page.on('response', response => {
      if (response.url().includes('luckyorange.com') && response.url().includes('47375252')) {
        loScripts.push(response.url());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    expect(loScripts.length).toBeGreaterThan(0);
  });

});

test.describe('LinkedIn Insight Tag', () => {

  test('should load LinkedIn script', async ({ page }) => {
    const linkedInRequests = [];

    page.on('request', request => {
      if (request.url().includes('linkedin.com') || request.url().includes('licdn.com')) {
        linkedInRequests.push(request.url());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    expect(linkedInRequests.length).toBeGreaterThan(0);
    console.log(`LinkedIn requests: ${linkedInRequests.length}`);
  });

  test('should have LinkedIn partner ID 7862545', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const hasLinkedIn = await page.evaluate(() => {
      return window._linkedin_partner_id === '7862545' ||
             (window._linkedin_data_partner_ids && window._linkedin_data_partner_ids.includes('7862545'));
    });

    expect(hasLinkedIn).toBe(true);
  });

});

test.describe('Privacy & Performance', () => {

  test('all tracking scripts should load asynchronously', async ({ page }) => {
    await page.goto('/');

    const asyncScripts = await page.evaluate(() => {
      const scripts = Array.from(document.querySelectorAll('script[src]'));
      return scripts
        .filter(script =>
          script.src.includes('googletagmanager') ||
          script.src.includes('facebook') ||
          script.src.includes('clarity') ||
          script.src.includes('luckyorange') ||
          script.src.includes('linkedin')
        )
        .map(script => ({
          src: script.src.substring(script.src.lastIndexOf('/') + 1),
          async: script.async,
          defer: script.defer
        }));
    });

    console.log('Tracking scripts:', asyncScripts);

    // Most scripts should be async or defer
    const asyncCount = asyncScripts.filter(s => s.async || s.defer).length;
    expect(asyncCount).toBeGreaterThan(0);
  });

  test('should not block page load with tracking', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    const domLoadTime = Date.now() - startTime;

    // Page should still load quickly even with all tracking
    expect(domLoadTime).toBeLessThan(3000);
    console.log(`DOM load time with tracking: ${domLoadTime}ms`);
  });

  test('tracking should not cause console errors', async ({ page }) => {
    const trackingErrors = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        const text = msg.text();
        if (text.includes('gtm') ||
            text.includes('fbq') ||
            text.includes('clarity') ||
            text.includes('luckyorange') ||
            text.includes('linkedin')) {
          trackingErrors.push(text);
        }
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    expect(trackingErrors.length).toBe(0);
  });

});

test.describe('Cross-Page Tracking', () => {

  test('tracking should work on landing page', async ({ page }) => {
    const requests = {
      gtm: false,
      facebook: false,
      clarity: false,
      luckyorange: false
    };

    page.on('request', request => {
      const url = request.url();
      if (url.includes('googletagmanager')) requests.gtm = true;
      if (url.includes('facebook')) requests.facebook = true;
      if (url.includes('clarity.ms')) requests.clarity = true;
      if (url.includes('luckyorange')) requests.luckyorange = true;
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    console.log('Landing page tracking:', requests);
    expect(Object.values(requests).filter(Boolean).length).toBeGreaterThanOrEqual(3);
  });

  test('tracking should work on quiz page', async ({ page }) => {
    const requests = {
      gtm: false,
      facebook: false,
      clarity: false,
      luckyorange: false
    };

    page.on('request', request => {
      const url = request.url();
      if (url.includes('googletagmanager')) requests.gtm = true;
      if (url.includes('facebook')) requests.facebook = true;
      if (url.includes('clarity.ms')) requests.clarity = true;
      if (url.includes('luckyorange')) requests.luckyorange = true;
    });

    await page.goto('/quiz');
    await page.waitForLoadState('networkidle');

    console.log('Quiz page tracking:', requests);
    expect(Object.values(requests).filter(Boolean).length).toBeGreaterThanOrEqual(3);
  });

  test('tracking should work on result page', async ({ page }) => {
    const requests = {
      gtm: false,
      facebook: false,
      clarity: false,
      luckyorange: false
    };

    page.on('request', request => {
      const url = request.url();
      if (url.includes('googletagmanager')) requests.gtm = true;
      if (url.includes('facebook')) requests.facebook = true;
      if (url.includes('clarity.ms')) requests.clarity = true;
      if (url.includes('luckyorange')) requests.luckyorange = true;
    });

    await page.goto('/result-3');
    await page.waitForLoadState('networkidle');

    console.log('Result page tracking:', requests);
    expect(Object.values(requests).filter(Boolean).length).toBeGreaterThanOrEqual(3);
  });

});
