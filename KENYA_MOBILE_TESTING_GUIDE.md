# 🇰🇪 Kenya Mobile Testing Guide - Fairtrade Quiz

## 🎯 **Testing URLs for Kenya Project**

### **Local Testing:**
- **Development Server**: `http://192.168.0.106:3000`
- **Mobile Test Page**: `http://192.168.0.106:3000/test-mobile.html`
- **Quiz Direct Link**: `http://192.168.0.106:3000/quiz`

### **Deployed Testing:**
- **Vercel URL**: `https://your-kenya-app.vercel.app` (after deployment)

## 📱 **Popular Devices & Browsers in Kenya**

### **Most Common Mobile Devices in Kenya:**

#### **Android Devices (80%+ market share):**
1. **Samsung Galaxy A Series** (A10, A20, A30, A50, A70)
2. **Tecno** (Spark, Camon, Phantom series)
3. **Infinix** (Hot, Note, Zero series)
4. **Huawei** (Y series, Nova series)
5. **Xiaomi** (Redmi series)
6. **Itel** (budget devices)

#### **iOS Devices (15% market share):**
1. **iPhone SE** (1st & 2nd gen)
2. **iPhone 12/13** (higher-end users)
3. **iPhone XR/11** (mid-range)
4. **Older iPhones** (6s, 7, 8)

#### **Tablets:**
1. **iPad** (various models)
2. **Samsung Galaxy Tab**
3. **Huawei MediaPad**

### **Popular Browsers in Kenya:**

#### **Primary Browsers (Must Test):**
1. **Chrome Mobile** (65% usage)
2. **Safari Mobile** (iOS users)
3. **Samsung Internet** (Samsung devices)

#### **Secondary Browsers (Should Test):**
4. **UC Browser** (popular in Africa, data-saving)
5. **Opera Mini** (data compression)
6. **Firefox Mobile**

## 🧪 **Comprehensive Testing Checklist**

### **1. Device-Specific Testing**

#### **Samsung Galaxy A Series:**
- [ ] **Galaxy A10** (6.2", 720x1520, Android 9+)
- [ ] **Galaxy A20** (6.4", 720x1560, Android 9+)
- [ ] **Galaxy A30** (6.4", 1080x2340, Android 9+)
- [ ] **Galaxy A50** (6.4", 1080x2340, Android 9+)

#### **Tecno Devices:**
- [ ] **Tecno Spark 6** (6.8", 720x1640, Android 10)
- [ ] **Tecno Camon 16** (6.8", 720x1640, Android 10)
- [ ] **Tecno Phantom X** (6.7", 1080x2340, Android 11)

#### **Infinix Devices:**
- [ ] **Infinix Hot 10** (6.78", 720x1640, Android 10)
- [ ] **Infinix Note 8** (6.95", 720x1640, Android 10)
- [ ] **Infinix Zero 8** (6.85", 1080x2460, Android 10)

#### **iOS Devices:**
- [ ] **iPhone SE (2020)** (4.7", 750x1334, iOS 13+)
- [ ] **iPhone 12** (6.1", 1170x2532, iOS 14+)
- [ ] **iPhone 13** (6.1", 1170x2532, iOS 15+)

### **2. Screen Size Testing**

#### **Critical Breakpoints:**
- [ ] **320px** (smallest phones)
- [ ] **375px** (iPhone SE, standard phones)
- [ ] **414px** (iPhone Plus, large phones)
- [ ] **768px** (tablets)
- [ ] **1024px** (large tablets)

### **3. Quiz Functionality Testing**

#### **QuestionOne (Map Selection):**
- [ ] Kenya map loads correctly
- [ ] Province selection works with touch
- [ ] Navigation buttons are responsive (44px+)
- [ ] Fact popup displays properly
- [ ] Text "Where do you live in Kenya?" is readable

#### **QuestionTwo (Slider):**
- [ ] Slider interaction is smooth
- [ ] Navigation buttons work
- [ ] Text is readable on small screens
- [ ] Slider values update correctly

#### **QuestionThree (Coffee Slider):**
- [ ] Coffee cup slider works smoothly
- [ ] Answer display is properly sized
- [ ] Navigation buttons are accessible
- [ ] Fact popup works correctly

#### **QuestionFour (Tea Slider):**
- [ ] Tea slider interaction is smooth
- [ ] Navigation buttons are touch-friendly
- [ ] Text sizing is appropriate
- [ ] Slider handle is properly sized (80px)

#### **QuestionFive, Seven, ChocolateConsumer:**
- [ ] Navigation buttons are 44px+ minimum
- [ ] Touch interaction is responsive
- [ ] Text is readable on mobile
- [ ] All interactive elements work

#### **QuestionSix (Shopping Interface):**
- [ ] Shopping cart interface is usable
- [ ] Product selection works on touch
- [ ] Text sizing is appropriate
- [ ] Navigation is smooth

#### **QuestionEight (Consumer Selection):**
- [ ] Consumer selection buttons are touch-friendly
- [ ] Text "Do you work in the FMCG industry?" is readable
- [ ] Form inputs are properly sized
- [ ] Selection works correctly

### **4. Network & Performance Testing**

#### **Connection Types (Kenya-specific):**
- [ ] **4G** (urban areas)
- [ ] **3G** (rural areas)
- [ ] **2G** (very slow connections)
- [ ] **WiFi** (home/office)

#### **Performance Metrics:**
- [ ] **Load Time** < 3s on 3G
- [ ] **First Contentful Paint** < 2s
- [ ] **Largest Contentful Paint** < 2.5s
- [ ] **Cumulative Layout Shift** < 0.1
- [ ] **First Input Delay** < 100ms

### **5. Browser-Specific Testing**

#### **Chrome Mobile (Primary):**
- [ ] All quiz pages load correctly
- [ ] Touch interactions work smoothly
- [ ] Performance is good
- [ ] No console errors

#### **Safari Mobile (iOS):**
- [ ] iOS-specific features work
- [ ] Touch interactions are smooth
- [ ] No iOS-specific bugs
- [ ] Proper viewport handling

#### **Samsung Internet:**
- [ ] Samsung-specific features work
- [ ] Performance is optimized
- [ ] No Samsung-specific issues
- [ ] Proper rendering

#### **UC Browser:**
- [ ] Data-saving mode works
- [ ] Compression doesn't break functionality
- [ ] Performance is acceptable
- [ ] All features accessible

#### **Opera Mini:**
- [ ] Works with data compression
- [ ] Basic functionality preserved
- [ ] Performance is acceptable
- [ ] No critical errors

### **6. Kenya-Specific Considerations**

#### **Network Conditions:**
- [ ] **Slow 3G** (common in rural areas)
- [ ] **Data Usage** (optimized for limited plans)
- [ ] **Network Interruptions** (graceful handling)

#### **Cultural & Language:**
- [ ] **English text** is clear and readable
- [ ] **Color contrast** works in bright sunlight
- [ ] **Touch patterns** work for right/left-handed users
- [ ] **Content** is culturally appropriate for Kenya

#### **Device Characteristics:**
- [ ] **Low RAM** devices (2GB or less)
- [ ] **Slow processors** (budget devices)
- [ ] **Small storage** (16GB or less)
- [ ] **Older Android versions** (8.0+)

### **7. Testing Tools & Methods**

#### **Browser DevTools:**
- [ ] **Chrome DevTools** Device Simulation
- [ ] **Safari Responsive Design Mode**
- [ ] **Firefox Responsive Design Mode**

#### **Online Testing:**
- [ ] **BrowserStack** (free trial)
- [ ] **CrossBrowserTesting**
- [ ] **Responsinator.com**

#### **Real Device Testing:**
- [ ] Test on actual Kenyan devices
- [ ] Test on different network conditions
- [ ] Test with different users
- [ ] Test in different lighting conditions

## 🚀 **Quick Testing Commands**

```bash
# Start development server
npm run dev

# Test on local network
# Access from mobile: http://192.168.0.106:3000

# Run Lighthouse audit
# Chrome DevTools → Lighthouse → Mobile

# Test responsive design
# Chrome DevTools → Device Toolbar → Select device
```

## 📊 **Success Criteria for Kenya**

### **Must Have (Critical):**
- ✅ All touch targets ≥44px
- ✅ Text readable on 320px screens
- ✅ Works on Chrome Mobile & Safari
- ✅ Loads in <3s on 3G
- ✅ No broken functionality
- ✅ Works on Samsung Galaxy A series
- ✅ Works on Tecno/Infinix devices

### **Should Have (Important):**
- ✅ Works on UC Browser & Opera Mini
- ✅ Good performance on low-end devices
- ✅ Accessible to screen readers
- ✅ Works on 2GB RAM devices

### **Nice to Have (Optional):**
- ✅ Excellent performance scores
- ✅ Works on all browsers
- ✅ Perfect accessibility
- ✅ Offline functionality

## 📝 **Testing Results Template**

For each device/browser tested:

**Device**: Samsung Galaxy A10
**Browser**: Chrome Mobile
**Screen Size**: 720x1520
**Network**: 3G
**Issues Found**: 
- [ ] None
- [ ] Minor (describe)
- [ ] Major (describe)

**Overall Rating**: ⭐⭐⭐⭐⭐ (1-5 stars)

## 🎯 **Priority Testing Order**

1. **High Priority**: Samsung Galaxy A series, Chrome Mobile, 3G
2. **Medium Priority**: Tecno/Infinix, Safari Mobile, UC Browser
3. **Low Priority**: Opera Mini, Firefox, 2G networks

## 📱 **Testing Checklist Summary**

- [ ] **Device Testing**: 15+ devices tested
- [ ] **Browser Testing**: 6 browsers tested
- [ ] **Quiz Functionality**: All 8 questions tested
- [ ] **Performance**: Network speeds tested
- [ ] **Accessibility**: Screen readers tested
- [ ] **Cultural Fit**: Kenya-specific considerations

**Total Tests**: 50+ individual tests
**Target**: 95%+ pass rate for critical tests







