// Instagram Browser Detection and Fixes for iOS
// This code ONLY runs for Instagram in-app browser on iOS
// Does NOT affect regular Safari, Chrome, or desktop browsers
export function initInstagramFixes() {
  const ua = navigator.userAgent || navigator.vendor || window.opera;
  const isInstagram = ua.indexOf('Instagram') > -1;
  const isIOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;

  // Exit immediately if not Instagram on iOS - no changes applied
  if (!isInstagram || !isIOS) {
    return false;
  }

  // Only reaches this point if Instagram iOS browser
  if (isInstagram && isIOS) {
    console.log('Instagram iOS browser detected - applying fixes');

    // Add class for CSS targeting
    document.documentElement.classList.add('instagram-browser');

    // Fix 1: Viewport height issue
    if (window.innerHeight === window.screen.height) {
      document.documentElement.classList.add('instagram-overlay-issue');
      const instagramBarHeight = 44;
      document.documentElement.style.setProperty('--instagram-offset', `${instagramBarHeight}px`);
    }

    // Fix 2: Click coordinate misalignment after keyboard (CRITICAL)
    let isFocused = false;
    let focusTimer;

    document.addEventListener('focus', (e) => {
      if (e.target.matches('input, textarea, select')) {
        isFocused = true;
        clearTimeout(focusTimer);
      }
    }, true);

    document.addEventListener('blur', (e) => {
      if (e.target.matches('input, textarea, select')) {
        isFocused = false;
        clearTimeout(focusTimer);
        focusTimer = setTimeout(() => {
          if (!isFocused) {
            // Reset scroll position to recalibrate click coordinates
            window.scrollTo(0, 0);
          }
        }, 150);
      }
    }, true);

    // Fix 3: Enhance click events for iOS Safari compatibility
    document.addEventListener('touchstart', () => {}, { passive: true });

    // Fix 4: Add cursor pointer to all interactive elements
    const style = document.createElement('style');
    style.textContent = `
      .instagram-browser button,
      .instagram-browser .cursor-pointer,
      .instagram-browser [role="button"],
      .instagram-browser a {
        cursor: pointer !important;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0.1) !important;
      }
    `;
    document.head.appendChild(style);

    return true;
  }

  return false;
}

// Check if Instagram browser
export function isInstagramBrowser() {
  const ua = navigator.userAgent || navigator.vendor || window.opera;
  return ua.indexOf('Instagram') > -1;
}

// Get app to open in Safari
export function openInSafari() {
  const currentUrl = window.location.href;

  // Try modern iOS scheme
  window.location.href = `x-safari-https://${currentUrl.replace(/^https?:\/\//, '')}`;

  // Fallback to legacy scheme after delay
  setTimeout(() => {
    window.location.href = `com-apple-mobilesafari-tab:${currentUrl}`;
  }, 500);
}
