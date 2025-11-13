// Social Media Browser Detection and Fixes for iOS
// This code ONLY runs for social media in-app browsers on iOS (Instagram, Facebook, TikTok, etc.)
// Does NOT affect regular Safari, Chrome, or desktop browsers
export function initInstagramFixes() {
  const ua = navigator.userAgent || navigator.vendor || window.opera;
  const isIOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;

  // Detect specific social media browsers
  const isInstagram = /Instagram/i.test(ua);
  const isFacebook = /FBAN|FBAV/i.test(ua);
  const isTikTok = /TikTok|Bytedance/i.test(ua);
  const isSnapchat = /Snapchat/i.test(ua);
  const isLinkedIn = /LinkedInApp/i.test(ua);

  const isSocialBrowser = isInstagram || isFacebook || isTikTok || isSnapchat || isLinkedIn;

  // Exit immediately if not a social media browser on iOS - no changes applied
  if (!isSocialBrowser || !isIOS) {
    return false;
  }

  // Determine which browser for logging
  let browserName = 'Unknown';
  if (isInstagram) browserName = 'Instagram';
  else if (isFacebook) browserName = 'Facebook';
  else if (isTikTok) browserName = 'TikTok';
  else if (isSnapchat) browserName = 'Snapchat';
  else if (isLinkedIn) browserName = 'LinkedIn';

  console.log(`${browserName} iOS browser detected - applying WKWebView fixes`);

  // Add classes for CSS targeting
  document.documentElement.classList.add('social-browser');
  if (isInstagram) document.documentElement.classList.add('instagram-browser');
  if (isFacebook) document.documentElement.classList.add('facebook-browser');
  if (isTikTok) document.documentElement.classList.add('tiktok-browser');
  if (isSnapchat) document.documentElement.classList.add('snapchat-browser');
  if (isLinkedIn) document.documentElement.classList.add('linkedin-browser');

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
    .social-browser button,
    .social-browser .cursor-pointer,
    .social-browser [role="button"],
    .social-browser a {
      cursor: pointer !important;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0.1) !important;
    }
  `;
  document.head.appendChild(style);

  return true;
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
