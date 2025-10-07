# Project Architecture

## Overview

The FTA Kenya Quiz is a Next.js application that guides users through an interactive quiz about their purchasing preferences and offers them a chance to enter a giveaway for Kenyan consumers.

## Tech Stack

- **Framework**: Next.js 12.3.0 (Pages Router)
- **React**: 18.2.0
- **State Management**: Redux Toolkit (@reduxjs/toolkit)
- **Styling**: Tailwind CSS 3.1.8
- **Animation**: Framer Motion 7.6.1
- **Data Visualization**: D3.js 7.9.0
- **Fullpage Scrolling**: @fullpage/react-fullpage
- **Icons**: React Icons 5.3.0
- **Form Handling**: React Hook Form (via result pages)
- **Analytics**: Google Tag Manager (react-gtm-module)
- **Testing**: Playwright 1.56.0
- **Deployment**: Vercel

## Project Structure

```
ft-kenya-main/
├── src/
│   ├── components/          # React components
│   │   ├── Layout/         # Layout wrapper
│   │   ├── QuizCard/       # Quiz question card
│   │   ├── ResultCard/     # Result display card
│   │   └── ...
│   ├── pages/              # Next.js pages (Pages Router)
│   │   ├── api/           # API routes
│   │   │   └── subscribe.js  # Klaviyo subscription endpoint
│   │   ├── _app.jsx       # App wrapper (Redux, GTM)
│   │   ├── _document.jsx  # HTML document wrapper
│   │   ├── index.jsx      # Landing page
│   │   ├── quiz.jsx       # Main quiz page
│   │   ├── result-[1-16].jsx  # 16 different quiz results
│   │   └── thanks-for-signing-up.jsx  # Success page
│   ├── slices/            # Redux slices
│   │   └── quizSlice.js   # Quiz state management
│   ├── data/              # Static data (GeoJSON, etc.)
│   ├── constants/         # App constants
│   ├── styles/            # Global styles
│   ├── store.js           # Redux store configuration
│   └── style.js           # Styled components/theme
├── public/                # Static assets
│   ├── images/
│   └── ...
├── tests/                 # Playwright E2E tests
├── docs/                  # Documentation (this directory)
├── .env.local            # Environment variables (local)
├── next.config.js        # Next.js configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── playwright.config.js  # Playwright test configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies and scripts
```

## Pages Router Architecture

This project uses **Next.js Pages Router** (not App Router), which means:

- ✅ Routes defined in `/src/pages/` directory
- ✅ File-based routing: `pages/quiz.jsx` → `/quiz`
- ✅ API routes in `/src/pages/api/`
- ✅ `_app.jsx` for global app wrapper
- ✅ `_document.jsx` for HTML document customization

**Note**: There is NO `/app` directory in this project. That's correct for Pages Router.

## Key Features

### 1. Interactive Quiz Flow

**Location**: [src/pages/quiz.jsx](../src/pages/quiz.jsx)

- Fullpage scrolling experience
- Multiple choice questions
- Progress tracking
- Redux state management for answers
- Smooth animations with Framer Motion

### 2. Dynamic Results

**Location**: [src/pages/result-[1-16].jsx](../src/pages/)

- 16 different result pages based on quiz answers
- Personalized product recommendations
- Email signup form for giveaway
- Custom result messaging

### 3. Klaviyo Integration

**Location**: [src/pages/api/subscribe.js](../src/pages/api/subscribe.js)

- Server-side API route
- Email subscription handling
- Quiz data sync to Klaviyo
- See [klaviyo-integration.md](./klaviyo-integration.md) for details

### 4. State Management

**Location**: [src/slices/quizSlice.js](../src/slices/quizSlice.js)

Redux Toolkit slice managing:
- Quiz answers
- Current question
- Result calculation
- Navigation state

### 5. Analytics

**Location**: [src/pages/_app.jsx](../src/pages/_app.jsx)

Google Tag Manager integration for:
- Page views
- Quiz interactions
- Form submissions
- Conversion tracking

### 6. Data Visualization

The Kenya project includes D3.js for data visualization capabilities:
- Geographic data visualization (GeoJSON)
- Interactive charts
- Custom map rendering

## Data Flow

```
User Interaction
    ↓
Quiz Component
    ↓
Redux Action Dispatch
    ↓
Quiz Slice Reducer
    ↓
Redux Store Update
    ↓
Component Re-render
    ↓
Result Calculation
    ↓
Result Page Display
    ↓
Form Submission
    ↓
API Route (/api/subscribe)
    ↓
Klaviyo API
    ↓
Success/Error Response
    ↓
Thank You Page
```

## API Routes

### POST /api/subscribe

Handles email subscriptions to Klaviyo.

**Request**:
```javascript
{
  email: string,
  firstName: string,
  lastName: string,
  customFields: object
}
```

**Response**:
```javascript
{
  success: boolean,
  message: string
}
```

See [klaviyo-integration.md](./klaviyo-integration.md) for full API documentation.

## Environment Variables

Required in `.env.local` and Vercel:

```bash
# Klaviyo API
KLAVIYO_PRIVATE_API_KEY=pk_xxxxxxxxxxxxxxxxxxxxx
KLAVIYO_LIST_ID_KE=xxxxxx

# Google Tag Manager (optional)
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

## Deployment

### Vercel Configuration

- **Platform**: Vercel
- **Production URL**: https://fta-quiz-kenya.vercel.app
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Node Version**: 18.x

### Environment Variables in Vercel

Set the same environment variables in Vercel project settings:
1. Go to Project Settings → Environment Variables
2. Add `KLAVIYO_PRIVATE_API_KEY`
3. Add `KLAVIYO_LIST_ID_KE`
4. Select environments: Production, Preview, Development

### Deployment Process

```bash
# Automatic deployment on push to main branch
git push origin main

# Vercel will:
# 1. Install dependencies
# 2. Run build command
# 3. Deploy to production
# 4. Assign production URL
```

## Development Workflow

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Testing

```bash
# Run Playwright tests
npm test

# Run tests with UI
npm run test:ui

# Debug tests
npm run test:debug
```

### Building for Production

```bash
# Create production build
npm run build

# Test production build locally
npm start
```

## Component Patterns

### Quiz Card Component

Reusable component for displaying quiz questions with:
- Question text
- Multiple choice options
- Progress indicator
- Navigation controls

### Result Card Component

Displays personalized results with:
- Result title and description
- Product recommendations
- Call-to-action button
- Social sharing (optional)

### Layout Component

Global layout wrapper providing:
- Header/navigation
- Footer
- Common styling
- Meta tags

## Redux Store Structure

```javascript
{
  quiz: {
    answers: {
      question1: "answer1",
      question2: "answer2",
      // ...
    },
    currentQuestion: 0,
    result: null,
    // ...
  }
}
```

## Styling Approach

- **Tailwind CSS** for utility-first styling
- **Custom theme** in `tailwind.config.js`
- **Global styles** in `src/styles/globals.css`
- **Component-specific styles** using Tailwind classes
- **Framer Motion** for animations

## TypeScript Configuration

This project includes TypeScript configuration (`tsconfig.json`) for type checking:
- Type definitions for D3.js
- Type definitions for GeoJSON
- Type definitions for Node.js
- Enables better IDE support and type safety

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Considerations

- **Code splitting**: Automatic with Next.js
- **Image optimization**: Next.js Image component
- **CSS optimization**: Tailwind CSS purging
- **Bundle size**: Monitored via Vercel analytics

## Testing Strategy

### E2E Testing (Playwright)

- User flows (quiz completion, form submission)
- API integration tests
- Mobile responsiveness

### Test Files

Located in [/tests](../tests/):
- `klaviyo-real-submission.spec.js` - Klaviyo API integration
- `kenya-mobile-test.html` - Mobile browser testing
- `test-mobile.html` - Legacy mobile testing

## Differences from Africa Project

The Kenya project has some unique features:

1. **D3.js Integration**: Additional data visualization capabilities
2. **GeoJSON Support**: Geographic data handling for Kenya-specific mapping
3. **TypeScript Config**: Enhanced type checking support
4. **Additional Dependencies**: D3, GeoJSON types

## Related Documentation

- [Klaviyo Integration](./klaviyo-integration.md)
- [Mobile Testing Guide](./mobile-testing-guide.md)
- [Testing Checklist](./testing-checklist.md)
- [Legacy Mobile Testing Guide](./mobile-testing-guide-legacy.md)
- [Legacy Mobile Testing Checklist](./mobile-testing-checklist-legacy.md)
