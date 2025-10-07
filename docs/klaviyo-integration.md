# Klaviyo Integration Documentation

## Overview

The FTA Kenya Quiz integrates with Klaviyo to collect email subscriptions and quiz responses. Users who complete the quiz can enter a giveaway by providing their email address, which is then synced to a Klaviyo list.

## Environment Variables

Required environment variables in `.env.local` and Vercel:

```bash
KLAVIYO_PRIVATE_API_KEY=pk_xxxxxxxxxxxxxxxxxxxxx
KLAVIYO_LIST_ID_KE=xxxxxx
```

- **KLAVIYO_PRIVATE_API_KEY**: Private API key for server-side authentication
- **KLAVIYO_LIST_ID_KE**: List ID for Kenya giveaway subscribers

## Implementation

### API Endpoint

**Location**: [src/pages/api/subscribe.js](../src/pages/api/subscribe.js)

### How It Works

The subscription process uses Klaviyo's server-side API with a 2-step approach:

#### Step 1: Create or Fetch Profile

```javascript
POST https://a.klaviyo.com/api/profiles/
```

Creates a new profile with:
- Email address
- First name & last name
- Location (Kenya)
- Custom properties (quiz answers)
- Quiz metadata (completion date, source)

**Handle 409 Conflict**: If profile already exists, fetch the existing profile:

```javascript
GET https://a.klaviyo.com/api/profiles/?filter=equals(email,"user@example.com")
```

#### Step 2: Subscribe to List

```javascript
POST https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/
```

Subscribes the profile to the giveaway list using the bulk subscription endpoint.

### Request Format

```javascript
{
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "customFields": {
    "quiz_result": "result-3",
    "answer_1": "value1",
    "answer_2": "value2",
    // ... other quiz answers
  }
}
```

### Response Format

**Success (200)**:
```json
{
  "success": true,
  "message": "Successfully subscribed to the giveaway!"
}
```

**Error (400)**:
```json
{
  "error": "Email is required"
}
```

**Error (500)**:
```json
{
  "error": "Internal server error. Please try again later."
}
```

## Recent Migration (October 2024)

### Problem

The original implementation used Klaviyo's client-side subscription endpoint with an authorization header:

```javascript
// OLD - BROKEN
POST https://a.klaviyo.com/client/subscriptions/
Headers: Authorization: Klaviyo-API-Key pk_xxxxx
```

This caused **403 "Invalid company"** errors because:
1. The client endpoint is designed for unauthenticated use
2. Adding an authorization header invalidates the request
3. The endpoint doesn't accept private API keys

### Solution

Migrated to Klaviyo's server-side API with proper authentication:

1. **Use server-side profile creation endpoint** with private key
2. **Handle duplicate profiles gracefully** (409 → fetch → subscribe)
3. **Use bulk subscription endpoint** for list subscription
4. **Proper JSON:API format** for all requests

### Benefits

- ✅ No more 403 errors
- ✅ Duplicate emails handled gracefully (no errors shown to users)
- ✅ More robust error handling
- ✅ Better tracking of quiz metadata
- ✅ Follows Klaviyo's recommended server-side approach

## Testing

Tests are located in [/tests](../tests/) and use Playwright for E2E testing.

### Test Coverage

1. **New user submission**: Verifies successful subscription with 200 OK
2. **Duplicate email handling**: Verifies 409 conflicts are handled gracefully
3. **Form validation**: Tests required field validation
4. **Redirect flow**: Verifies redirect to thank-you page

### Running Tests

```bash
# Run all tests
npm test

# Run with UI
npm run test:ui

# Run in headed mode (see browser)
npm run test:headed

# Debug mode
npm run test:debug
```

## Troubleshooting

### 403 "Invalid company" Error

**Cause**: Using client endpoint with authorization header

**Fix**: Use server-side API endpoints as documented above

### 409 Conflict Error

**Cause**: Profile already exists in Klaviyo

**Fix**: Already handled - the API fetches existing profile and proceeds with subscription

### 400 Bad Request

**Cause**: Missing required fields (email)

**Fix**: Ensure email is provided in request body

### Environment Variables Not Found

**Cause**: `.env.local` not configured or Vercel env vars not set

**Fix**:
1. Local: Create `.env.local` with required variables
2. Vercel: Add environment variables in project settings

## API Reference

- [Klaviyo API Documentation](https://developers.klaviyo.com/en/reference/api_overview)
- [Profile API](https://developers.klaviyo.com/en/reference/create_profile)
- [Subscription API](https://developers.klaviyo.com/en/reference/subscribe_profiles)

## Related Files

- API Implementation: [src/pages/api/subscribe.js](../src/pages/api/subscribe.js)
- Form Component: [src/pages/result-3.jsx](../src/pages/result-3.jsx) (and other result pages)
- Tests: [/tests](../tests/)
