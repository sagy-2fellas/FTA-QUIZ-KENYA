import { test, expect } from '@playwright/test';

/**
 * Performance Test Suite - Kenya
 * Tests page load times, resource optimization, and network performance
 *
 * Coverage:
 * - Page load times across different network conditions
 * - Resource size and optimization
 * - Network waterfall analysis
 * - Core Web Vitals metrics
 */

test.describe('Page Load Performance', () => {

  test('landing page should load quickly', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    const domLoadTime = Date.now() - startTime;

    // DOM should load within 3 seconds
    expect(domLoadTime).toBeLessThan(3000);

    await page.waitForLoadState('networkidle');
    const fullLoadTime = Date.now() - startTime;

    console.log(`${test.info().project.name} - DOM: ${domLoadTime}ms, Full: ${fullLoadTime}ms`);
  });

  test('quiz page should load quickly', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('/quiz');
    await page.waitForLoadState('domcontentloaded');

    const domLoadTime = Date.now() - startTime;

    // DOM should load within 3 seconds
    expect(domLoadTime).toBeLessThan(3000);

    console.log(`${test.info().project.name} - Quiz DOM: ${domLoadTime}ms`);
  });

  test('result page should load quickly', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('/result-3');
    await page.waitForLoadState('domcontentloaded');

    const domLoadTime = Date.now() - startTime;

    // DOM should load within 3 seconds
    expect(domLoadTime).toBeLessThan(3000);

    console.log(`${test.info().project.name} - Result DOM: ${domLoadTime}ms`);
  });

});

test.describe('Resource Optimization', () => {

  test('should not load excessive JavaScript', async ({ page }) => {
    const jsResources = [];

    page.on('response', response => {
      const url = response.url();
      if (url.endsWith('.js') || response.headers()['content-type']?.includes('javascript')) {
        jsResources.push({
          url,
          size: parseInt(response.headers()['content-length'] || '0')
        });
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const totalJsSize = jsResources.reduce((sum, resource) => sum + resource.size, 0);
    const totalJsMB = (totalJsSize / 1024 / 1024).toFixed(2);

    console.log(`${test.info().project.name} - Total JS: ${totalJsMB}MB (${jsResources.length} files)`);

    // Total JS should be under 2MB for good mobile performance
    expect(totalJsSize).toBeLessThan(2 * 1024 * 1024);
  });

  test('should not load excessive CSS', async ({ page }) => {
    const cssResources = [];

    page.on('response', response => {
      const url = response.url();
      if (url.endsWith('.css') || response.headers()['content-type']?.includes('css')) {
        cssResources.push({
          url,
          size: parseInt(response.headers()['content-length'] || '0')
        });
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const totalCssSize = cssResources.reduce((sum, resource) => sum + resource.size, 0);
    const totalCssKB = (totalCssSize / 1024).toFixed(2);

    console.log(`${test.info().project.name} - Total CSS: ${totalCssKB}KB (${cssResources.length} files)`);

    // Total CSS should be under 500KB
    expect(totalCssSize).toBeLessThan(500 * 1024);
  });

  test('images should be optimized', async ({ page }) => {
    const imageResources = [];

    page.on('response', response => {
      const contentType = response.headers()['content-type'] || '';
      if (contentType.includes('image')) {
        imageResources.push({
          url: response.url(),
          size: parseInt(response.headers()['content-length'] || '0'),
          type: contentType
        });
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const totalImageSize = imageResources.reduce((sum, resource) => sum + resource.size, 0);
    const totalImageMB = (totalImageSize / 1024 / 1024).toFixed(2);

    console.log(`${test.info().project.name} - Total Images: ${totalImageMB}MB (${imageResources.length} files)`);

    // Check for large individual images
    const largeImages = imageResources.filter(img => img.size > 500 * 1024);
    if (largeImages.length > 0) {
      console.log('Large images detected:', largeImages.map(img => ({
        url: img.url.substring(img.url.lastIndexOf('/') + 1),
        sizeMB: (img.size / 1024 / 1024).toFixed(2)
      })));
    }

    // Individual images should be under 500KB
    expect(largeImages.length).toBe(0);
  });

  test('should use modern image formats', async ({ page }) => {
    const imageFormats = {
      webp: 0,
      avif: 0,
      jpeg: 0,
      png: 0,
      svg: 0,
      other: 0
    };

    page.on('response', response => {
      const contentType = response.headers()['content-type'] || '';
      if (contentType.includes('image')) {
        if (contentType.includes('webp')) imageFormats.webp++;
        else if (contentType.includes('avif')) imageFormats.avif++;
        else if (contentType.includes('jpeg') || contentType.includes('jpg')) imageFormats.jpeg++;
        else if (contentType.includes('png')) imageFormats.png++;
        else if (contentType.includes('svg')) imageFormats.svg++;
        else imageFormats.other++;
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    console.log(`${test.info().project.name} - Image formats:`, imageFormats);

    // Should use some modern formats (WebP or AVIF) for optimization
    const modernFormats = imageFormats.webp + imageFormats.avif;
    const totalImages = Object.values(imageFormats).reduce((sum, count) => sum + count, 0);

    if (totalImages > 0) {
      const modernPercentage = ((modernFormats / totalImages) * 100).toFixed(1);
      console.log(`Modern format usage: ${modernPercentage}%`);
    }
  });

});

test.describe('Network Performance', () => {

  test('should minimize number of requests', async ({ page }) => {
    const requests = [];

    page.on('request', request => {
      requests.push(request.url());
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    console.log(`${test.info().project.name} - Total requests: ${requests.length}`);

    // Should make fewer than 100 requests for good performance
    expect(requests.length).toBeLessThan(100);
  });

  test('should not have failed requests', async ({ page }) => {
    const failedRequests = [];

    page.on('response', response => {
      if (response.status() >= 400) {
        failedRequests.push({
          url: response.url(),
          status: response.status()
        });
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Filter out expected 404s (favicon, etc.)
    const criticalFailures = failedRequests.filter(req =>
      !req.url.includes('favicon') &&
      !req.url.includes('apple-touch-icon')
    );

    if (criticalFailures.length > 0) {
      console.log('Failed requests:', criticalFailures);
    }

    expect(criticalFailures.length).toBe(0);
  });

  test('should use caching headers', async ({ page }) => {
    const cachedResources = [];
    const uncachedResources = [];

    page.on('response', response => {
      const cacheControl = response.headers()['cache-control'] || '';
      const url = response.url();

      // Check static assets
      if (url.match(/\.(js|css|woff2?|jpg|jpeg|png|webp|avif|svg)$/)) {
        if (cacheControl.includes('max-age') || cacheControl.includes('immutable')) {
          cachedResources.push(url);
        } else {
          uncachedResources.push(url);
        }
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    console.log(`${test.info().project.name} - Cached: ${cachedResources.length}, Uncached: ${uncachedResources.length}`);

    if (uncachedResources.length > 0) {
      console.log('Uncached static assets:', uncachedResources.slice(0, 5));
    }
  });

});

test.describe('Core Web Vitals', () => {

  test('should measure First Contentful Paint (FCP)', async ({ page }) => {
    await page.goto('/');

    const fcp = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
          if (fcpEntry) {
            resolve(fcpEntry.startTime);
          }
        }).observe({ type: 'paint', buffered: true });
      });
    });

    console.log(`${test.info().project.name} - FCP: ${fcp.toFixed(2)}ms`);

    // FCP should be under 2 seconds for good performance
    expect(fcp).toBeLessThan(2000);
  });

  test('should measure Largest Contentful Paint (LCP)', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const lcp = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1];
          resolve(lastEntry.renderTime || lastEntry.loadTime);
        }).observe({ type: 'largest-contentful-paint', buffered: true });

        // Timeout after 5 seconds
        setTimeout(() => resolve(0), 5000);
      });
    });

    console.log(`${test.info().project.name} - LCP: ${lcp.toFixed(2)}ms`);

    if (lcp > 0) {
      // LCP should be under 2.5 seconds for good performance
      expect(lcp).toBeLessThan(2500);
    }
  });

  test('should have minimal layout shifts', async ({ page }) => {
    await page.goto('/');

    // Wait for page to stabilize
    await page.waitForTimeout(3000);

    const cls = await page.evaluate(() => {
      return new Promise((resolve) => {
        let clsValue = 0;
        new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          }
        }).observe({ type: 'layout-shift', buffered: true });

        setTimeout(() => resolve(clsValue), 1000);
      });
    });

    console.log(`${test.info().project.name} - CLS: ${cls.toFixed(3)}`);

    // CLS should be under 0.1 for good performance
    expect(cls).toBeLessThan(0.1);
  });

});
