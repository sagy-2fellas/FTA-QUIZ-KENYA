# Comprehensive Test Suite - Kenya Quiz

This directory contains a complete test suite for the Fairtrade Africa Quiz (Kenya edition), covering responsive design, performance, and tracking verification across all popular devices and browsers in Kenya.

## Test Files

### 1. `responsive-usability.spec.js` (361 lines)
Tests the entire user experience across all devices:
- **Landing Page**: Load times, responsive layout, touch targets (44x44px minimum)
- **Quiz Flow**: Navigation, answer selection, fullpage.js scrolling
- **Result Page**: Form display, mobile keyboards, form submission
- **Performance**: Page load under 5 seconds, no console errors, image loading
- **Accessibility**: Semantic HTML, keyboard navigation

### 2. `performance.spec.js` (280+ lines)
Advanced performance metrics and optimization checks:
- **Page Load**: DOM content loaded < 3 seconds across all pages
- **Resource Optimization**: JS < 2MB, CSS < 500KB, images < 500KB each
- **Network Performance**: < 100 requests total, no failed requests, caching headers
- **Core Web Vitals**: FCP < 2s, LCP < 2.5s, CLS < 0.1

### 3. `tracking.spec.js` (330+ lines)
Verifies all analytics scripts load correctly:
- **Google Tag Manager** (GTM-KB2G5XF)
- **Facebook Pixel** (368869985423322)
- **Microsoft Clarity** (tmm5h0wrk6)
- **Lucky Orange** (47375252)
- **LinkedIn Insight Tag** (7862545)
- **Privacy**: Async loading, no blocking, no errors

## Device Coverage (25+ Kenya-Specific Configurations)

### Desktop Browsers
- Chrome (1920x1080)
- Firefox (1920x1080)
- Safari (1920x1080)

### Budget Android (Most Popular in Kenya)
- **Infinix Hot Series** (360x780) - Very popular budget brand
- **Tecno Spark Series** (360x720) - Very popular budget brand
- **Nokia Budget Phone** (360x640) - Entry-level market
- Generic Budget Android with 3G simulation

### Alternative Browsers (Popular in Kenya)
- **Opera Mini** (data saver mode) - Very popular for data saving
- **UC Browser** - Popular alternative browser
- **Samsung Internet Browser** - Pre-installed on Samsung devices

### Mid-Range Android
- Samsung Galaxy A-series (412x915)
- Samsung Galaxy S-series

### Premium Devices
- Samsung Galaxy S23 (360x800, 3x pixel density)

### iPhones
- iPhone 13
- iPhone 13 Pro
- iPhone 14
- iPhone SE

### Tablets
- iPad (gen 7)
- iPad Pro 11
- Android Tablet (768x1024)

### Special Cases
- Small Screen Portrait (320x568) - Very old devices still in use
- Landscape Mode (915x412)
- Low-end device simulation (slowMo: 200)

## Running Tests

### Run All Tests
```bash
npm test
```
This runs all tests across all 25+ device/browser combinations. Takes 20-40 minutes.

### Run Specific Test Suites
```bash
# Only responsive and usability tests
npm run test:responsive

# Only performance tests
npm run test:performance

# Only tracking verification tests
npm run test:tracking
```

### Run Specific Device Types
```bash
# Only mobile devices (Infinix, Tecno, Nokia, Opera Mini, etc.)
npm run test:mobile

# Only desktop browsers
npm run test:desktop
```

### Interactive Testing
```bash
# Visual UI mode - see tests running in browser
npm run test:ui

# Headed mode - see browser automation
npm run test:headed

# Debug mode - step through tests
npm run test:debug
```

### View Test Reports
```bash
# Generate and open HTML report
npm run test:report
```

## Test Output

Tests generate multiple artifacts:

### Screenshots
- `test-results/landing-{device}.png` - Landing page on each device
- `test-results/quiz-start-{device}.png` - Quiz page
- `test-results/quiz-answered-{device}.png` - After answer selection
- `test-results/form-filled-{device}.png` - Filled form
- `test-results/form-success-{device}.png` - Success state

### Reports
- `playwright-report/` - HTML report with pass/fail for each test
- `test-results/results.json` - JSON format for CI/CD integration

### Videos & Traces
- Videos captured on test failure
- Traces captured on first retry (for debugging)

## Kenya-Specific Testing Considerations

### Popular Devices
Kenya's mobile market is dominated by budget Chinese brands:
- **Infinix**: Budget-friendly smartphones, very popular
- **Tecno**: Sister brand to Infinix, equally popular
- **Nokia**: Entry-level feature phones and smartphones

### Browser Preferences
- **Opera Mini**: Extremely popular due to data compression
- **UC Browser**: Popular for fast loading and data saving
- **Chrome**: Standard on newer devices
- **Samsung Internet**: Pre-installed on Samsung devices

### Network Conditions
- **Urban Areas**: 4G/LTE available
- **Rural Areas**: 2G/3G common, slower speeds
- **Data Costs**: Users prioritize data-saving features

### Performance Priorities
1. **Page Size**: Keep total page weight low (< 2MB)
2. **Load Time**: Must work well on 3G
3. **Image Optimization**: Compress images aggressively
4. **Data Saver Mode**: Test with Opera Mini's compression

## Understanding Test Results

### Expected Pass Rate
- **First Run**: 80-95% pass rate (Kenya has more variable network conditions)
- **After Fixes**: 95-100% pass rate

### Common Failures

**Performance Tests**:
- Large images may fail on budget devices
- 3G/2G simulation may timeout frequently
- Opera Mini may render differently
- Solution: Aggressive image optimization, reduce bundle size

**Responsive Tests**:
- Touch targets < 44px on small screens
- Text may be too small on budget devices
- Solution: Larger touch targets, responsive typography

**Tracking Tests**:
- Data saver browsers may block tracking
- Opera Mini may not execute all JavaScript
- Solution: Expected behavior, ensure core functionality works

## CI/CD Integration

Tests are configured for continuous integration:
- Retries: 2 attempts on CI, 1 locally
- Workers: 2 parallel on CI, unlimited locally
- Screenshots: Only on failure
- Videos: Only on failure

## Network Simulation

Tests include multiple network simulations:
- **3G**: Download ~750 Kbps, Upload ~250 Kbps, Latency ~100ms
- **Low-end devices**: Additional slowMo: 200 for CPU constraints
- **Opera Mini**: Data compression simulation

## Performance Benchmarks

### Target Metrics (Kenya Market)
- **DOM Load**: < 3 seconds on 3G
- **Full Load**: < 5 seconds on 3G
- **Total JS**: < 2MB (< 1MB ideal for Opera Mini)
- **Total CSS**: < 500KB
- **Images**: < 500KB each, prefer WebP/AVIF
- **Requests**: < 100 total
- **Total Page Size**: < 2MB compressed

### Core Web Vitals Targets
- **FCP** (First Contentful Paint): < 2 seconds
- **LCP** (Largest Contentful Paint): < 2.5 seconds
- **CLS** (Cumulative Layout Shift): < 0.1

## Troubleshooting

### Tests Won't Run
```bash
# Install Playwright browsers
npx playwright install

# Install dependencies
npm install
```

### All Tests Failing
```bash
# Check if site is accessible
curl https://ft-kenya.vercel.app

# Run single test to debug
npm run test:debug
```

### Slow Test Execution
```bash
# Reduce parallelism
npm test -- --workers=1

# Run only one browser
npm test -- --project="Desktop Chrome"

# Skip slow 3G tests
npm test -- --grep-invert "3G"
```

### Opera Mini Issues
Opera Mini uses server-side rendering which may cause some tests to fail. This is expected - ensure core functionality works even if some tests fail.

## Contributing

When adding new tests:
1. Add to appropriate spec file
2. Follow existing test patterns
3. Include descriptive console.log for metrics
4. Set realistic timeouts (5-10 seconds for 3G/2G)
5. Filter known third-party errors
6. Take screenshots for visual verification
7. Consider data-saving browsers like Opera Mini

## Live Testing URLs

- **Production**: https://ft-kenya.vercel.app
- **Landing**: https://ft-kenya.vercel.app/
- **Quiz**: https://ft-kenya.vercel.app/quiz
- **Result Example**: https://ft-kenya.vercel.app/result-3

## Data Optimization Tips

For Kenya market, prioritize:
1. Image compression (use WebP, compress JPEG/PNG)
2. Minimize JavaScript bundle size
3. Use system fonts when possible
4. Lazy load images below the fold
5. Enable gzip/brotli compression
6. Use CDN for static assets
7. Implement service worker for offline support

---

**Last Updated**: 2025-10-08
**Playwright Version**: 1.56.0
**Total Tests**: 40+ across 25+ device configurations
**Market Focus**: Kenya (Infinix, Tecno, Nokia, Opera Mini, UC Browser)
