# Mobile Testing Guide for Kenya & South Africa

## 🎯 Target Browsers & Devices

### Popular Browsers in Kenya & South Africa:
1. **Chrome Mobile** (60%+ usage)
2. **Safari Mobile** (iOS users)
3. **Samsung Internet** (Android Samsung devices)
4. **UC Browser** (data-saving, popular in Africa)
5. **Opera Mini** (data compression)
6. **Firefox Mobile**

### Common Device Types:
- **Low-end Android**: Samsung Galaxy A series, Tecno, Infinix, Itel
- **Mid-range Android**: Samsung Galaxy S series, Huawei, Xiaomi
- **iOS**: iPhone SE, iPhone 12/13, older iPhones
- **Tablets**: iPad, Android tablets

## 🧪 Testing Methods

### 1. Browser Developer Tools (Chrome/Safari)
```bash
# Open your deployed site and use:
# Chrome: F12 → Device Toolbar → Select device
# Safari: Develop → Enter Responsive Design Mode
```

### 2. Online Testing Tools
- **BrowserStack** (free trial available)
- **CrossBrowserTesting**
- **LambdaTest**
- **Responsinator.com** (free)

### 3. Real Device Testing
- **Chrome DevTools Device Simulation**
- **Safari Responsive Design Mode**
- **Firefox Responsive Design Mode**

## 📱 Test Scenarios

### Critical Test Cases:
1. **Touch Targets**: All buttons ≥44px
2. **Text Readability**: Font sizes on small screens
3. **Slider Interaction**: Coffee/tea sliders work smoothly
4. **Map Selection**: Province selection on mobile
5. **Navigation**: Next/Previous buttons
6. **Fact Popups**: Modal displays correctly
7. **Shopping Cart**: QuestionSix interface
8. **Form Inputs**: Consumer selection (QuestionEight)

### Performance Tests:
1. **Load Time**: On slow 3G connections
2. **Image Loading**: Optimized for mobile
3. **Animation Performance**: Smooth on low-end devices
4. **Memory Usage**: No memory leaks

## 🌍 Regional Considerations

### Network Conditions:
- **3G/4G**: Test on slow connections
- **Data Usage**: Optimize for limited data plans
- **Offline Behavior**: Graceful degradation

### Cultural Considerations:
- **Language**: English text readability
- **Color Contrast**: High contrast for bright sunlight
- **Touch Patterns**: Right-handed vs left-handed usage

## 🚀 Quick Testing Steps

### Step 1: Local Testing
```bash
# Start development server
npm run dev

# Test on local network
# Access from mobile device using your computer's IP
```

### Step 2: Deployed Testing
1. Deploy to Vercel
2. Test on real devices
3. Use browser dev tools for simulation
4. Test on different network speeds

### Step 3: Performance Testing
- Use Chrome DevTools Lighthouse
- Test on slow 3G
- Check Core Web Vitals

## 📊 Testing Checklist

### Mobile Responsiveness:
- [ ] Text is readable on 320px screens
- [ ] Buttons are easily tappable (44px+)
- [ ] Sliders work smoothly on touch
- [ ] Map selection is accurate
- [ ] Navigation buttons are accessible
- [ ] Fact popups display correctly
- [ ] Shopping interface is usable
- [ ] Consumer selection works

### Performance:
- [ ] Loads quickly on 3G
- [ ] Images are optimized
- [ ] Animations are smooth
- [ ] No layout shifts
- [ ] Good Core Web Vitals scores

### Accessibility:
- [ ] Screen reader compatible
- [ ] Keyboard navigation works
- [ ] High contrast ratios
- [ ] Touch targets are adequate
- [ ] ARIA labels are present

## 🔧 Tools for Testing

### Browser Extensions:
- **Mobile/Responsive Web Design Tester**
- **Lighthouse** (Chrome)
- **WebPageTest**

### Online Services:
- **BrowserStack** (free trial)
- **CrossBrowserTesting**
- **Responsinator.com**

### Local Testing:
- **Chrome DevTools**
- **Safari Web Inspector**
- **Firefox Developer Tools**
