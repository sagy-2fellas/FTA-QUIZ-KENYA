# Fair Trade Africa Quiz - Kenya

An interactive quiz application that helps Kenyan users discover Fair Trade products aligned with their purchasing preferences, with a chance to enter a giveaway by subscribing to the mailing list.

## 🌍 Project Overview

This Next.js application provides an engaging quiz experience for Kenyan consumers to:
- Answer questions about their purchasing preferences
- Receive personalized Fair Trade product recommendations
- Enter a giveaway by subscribing via Klaviyo integration
- Learn about Fair Trade practices and impact in Kenya

**Production URL**: https://fta-quiz-kenya.vercel.app

## 🚀 Tech Stack

- **Framework**: Next.js 12.3.0 (Pages Router)
- **React**: 18.2.0
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS 3.1.8
- **Animation**: Framer Motion 7.6.1
- **Data Visualization**: D3.js 7.9.0
- **Email Integration**: Klaviyo API
- **Analytics**: Google Tag Manager
- **Testing**: Playwright 1.56.0
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Klaviyo account with API key and list ID

## 🛠️ Getting Started

### 1. Clone and Install

```bash
# Navigate to project directory
cd ft-kenya-main

# Install dependencies
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Klaviyo Configuration
KLAVIYO_PRIVATE_API_KEY=pk_xxxxxxxxxxxxxxxxxxxxx
KLAVIYO_LIST_ID_KE=xxxxxx

# Google Tag Manager (Optional)
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

**Important**: Never commit `.env.local` to version control. It's already in `.gitignore`.

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### 4. Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
ft-kenya-main/
├── src/
│   ├── components/          # React components
│   ├── pages/              # Next.js pages (Pages Router)
│   │   ├── api/           # API routes
│   │   │   └── subscribe.js  # Klaviyo subscription endpoint
│   │   ├── result-[1-16].jsx  # Quiz result pages
│   │   ├── quiz.jsx       # Main quiz page
│   │   └── index.jsx      # Landing page
│   ├── slices/            # Redux slices
│   ├── data/              # Static data (GeoJSON, etc.)
│   ├── constants/         # Constants and configurations
│   ├── styles/            # Global styles
│   └── store.js           # Redux store
├── public/                # Static assets
├── tests/                 # Playwright E2E tests (local only)
├── docs/                  # Project documentation
├── .env.local            # Environment variables (not in git)
├── tsconfig.json         # TypeScript configuration
└── playwright.config.js  # Test configuration
```

**Note**: This project uses Next.js **Pages Router** (not App Router). Routes are defined in `/src/pages/`, and there is no `/app` directory.

## 🧪 Testing

### Run Tests

```bash
# Run all tests
npm test

# Run with UI mode
npm run test:ui

# Run in headed mode (see browser)
npm run test:headed

# Debug tests
npm run test:debug
```

**Important**: Test files are kept local and excluded from Vercel deployment via `.gitignore`.

### Test Coverage

- ✅ Klaviyo subscription flow
- ✅ Form validation
- ✅ Duplicate email handling
- ✅ Quiz completion flow
- ✅ API endpoint integration
- ✅ Mobile browser testing

## 🚀 Deployment

### Vercel Deployment

This project is automatically deployed to Vercel on push to `main` branch.

**Production URL**: https://fta-quiz-kenya.vercel.app

### Environment Variables in Vercel

Set these in Vercel Project Settings → Environment Variables:

1. `KLAVIYO_PRIVATE_API_KEY` - Your Klaviyo private API key
2. `KLAVIYO_LIST_ID_KE` - Your Klaviyo list ID for Kenya
3. `NEXT_PUBLIC_GTM_ID` (optional) - Google Tag Manager ID

### Manual Deployment

```bash
# Vercel CLI
npm install -g vercel
vercel --prod
```

## 🔑 Key Features

### Interactive Quiz
- Fullpage scrolling experience
- Multiple choice questions
- Real-time progress tracking
- Smooth animations

### Personalized Results
- 16 different result pages
- Customized product recommendations
- Tailored messaging based on answers

### Klaviyo Integration
- Email subscription handling
- Quiz data sync to Klaviyo
- Duplicate email handling
- Custom profile properties
- Kenya-specific list management

### Data Visualization
- D3.js integration for interactive charts
- GeoJSON support for geographic data
- Custom visualizations for Kenya market

### Analytics
- Google Tag Manager integration
- Event tracking
- Conversion monitoring

## 📡 API Routes

### POST /api/subscribe

Handles email subscriptions to Klaviyo.

**Request Body**:
```json
{
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "customFields": {
    "quiz_result": "result-3",
    "answer_1": "value1"
  }
}
```

**Response**:
```json
{
  "success": true,
  "message": "Successfully subscribed to the giveaway!"
}
```

See [docs/klaviyo-integration.md](docs/klaviyo-integration.md) for detailed API documentation.

## 🔧 Recent Updates

### October 2024: Klaviyo API Migration

**Problem**: Form submissions were returning 403 "Invalid company" errors.

**Root Cause**: Using client-side Klaviyo endpoint with authorization header (incorrect approach).

**Solution**: Migrated to server-side Klaviyo API with proper authentication:
- ✅ Server-side profile creation with private key
- ✅ Graceful duplicate email handling (409 → fetch → subscribe)
- ✅ Bulk subscription endpoint for list management
- ✅ Proper JSON:API format
- ✅ Kenya-specific list configuration (KLAVIYO_LIST_ID_KE)

**Result**: All form submissions now work correctly with no errors.

See [docs/klaviyo-integration.md](docs/klaviyo-integration.md) for technical details.

## 🐛 Troubleshooting

### "Email is required" Error
**Cause**: Missing email field in form submission
**Fix**: Ensure email input is filled before submitting

### Environment Variables Not Found
**Cause**: `.env.local` missing or Vercel env vars not set
**Fix**:
- Local: Create `.env.local` with required variables
- Vercel: Add environment variables in project settings

### Build Fails on Vercel
**Cause**: Missing dependencies or environment variables
**Fix**:
- Check Vercel build logs
- Verify all environment variables are set
- Ensure `package-lock.json` is committed

### Tests Not Running
**Cause**: Playwright not installed
**Fix**: Run `npx playwright install` to install browser binaries

### TypeScript Errors
**Cause**: Type definitions missing or incorrect
**Fix**: Run `npm install` to ensure all type definitions are installed

## 📚 Documentation

Comprehensive documentation is available in the `/docs` directory:

- **[Architecture](docs/architecture.md)** - Project structure and technical architecture
- **[Klaviyo Integration](docs/klaviyo-integration.md)** - Email subscription implementation details
- **[Mobile Testing Guide](docs/mobile-testing-guide.md)** - Mobile testing procedures for Kenya
- **[Testing Checklist](docs/testing-checklist.md)** - QA checklist for Kenya deployment
- **[Legacy Mobile Testing Guide](docs/mobile-testing-guide-legacy.md)** - Historical testing documentation
- **[Legacy Mobile Testing Checklist](docs/mobile-testing-checklist-legacy.md)** - Historical checklist

## 🤝 Development Workflow

### Making Changes

1. Create a feature branch: `git checkout -b feat/your-feature`
2. Make your changes
3. Test locally: `npm run dev`
4. Run tests: `npm test`
5. Build: `npm run build`
6. Commit: `git commit -m "Description"`
7. Push: `git push origin feat/your-feature`
8. Deploy: Merge to `main` for automatic Vercel deployment

### Best Practices

- ✅ Keep environment variables in `.env.local` (never commit)
- ✅ Test changes locally before pushing
- ✅ Run Playwright tests before deploying
- ✅ Update documentation when adding features
- ✅ Use meaningful commit messages
- ✅ Keep dependencies up to date (security patches)
- ✅ Test on mobile devices before deploying

## 🌍 Kenya-Specific Features

This project is customized for the Kenyan market:

- **Klaviyo List**: Uses `KLAVIYO_LIST_ID_KE` for Kenya subscribers
- **Location**: Profile location set to "Kenya"
- **Currency**: Kenya Shilling (KES) considerations
- **Data Visualization**: D3.js with Kenya-specific GeoJSON data
- **Content**: Localized for Kenyan audience

## 🔗 Related Projects

This project is part of the Fair Trade Africa quiz family:

- **South Africa**: https://fta-quiz.vercel.app ([fair-trade-africa-main](../fair-trade-africa-main/))
- **Kenya**: https://fta-quiz-kenya.vercel.app (this project)

Both projects share the same codebase architecture but are deployed separately with region-specific configurations.

## 📞 Support

For issues or questions:
1. Check [documentation](docs/)
2. Review [troubleshooting](#-troubleshooting) section
3. Check Vercel deployment logs
4. Review Klaviyo API logs

## 📄 License

This project is proprietary and confidential.

---

**Last Updated**: October 2024
**Maintained By**: Be Fair Right Now Team
**Region**: Kenya
