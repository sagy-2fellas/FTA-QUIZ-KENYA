# Mailchimp quiz signup

The end-of-quiz form posts to `POST /api/subscribe`. The API route writes to Mailchimp on the server. Klaviyo is no longer called.

## Configuration

Set these in the Vercel project and in `.env.local` for local runs:

- `MAILCHIMP_API_KEY`: Mailchimp Marketing API key. Keep it server-side.
- `MAILCHIMP_AUDIENCE_ID_KE`: audience ID for Kenya.
- `MAILCHIMP_SERVER_PREFIX` (optional): data center such as `us20`. The route otherwise reads the suffix of the API key.

Do not use a `NEXT_PUBLIC_` prefix for the key. The route returns an availability error until both required values are configured.

## Data saved

The route upserts the email, first name, last name, and quiz answers in the same Mailchimp member request. `BFA Quiz` and `Kenya` tags identify the signup. Each answer has a visible audience field (`BFAQ1` through `BFAQ8`, plus `BFAQ7FT` for Fairtrade basket items); `BFACTRY`, `BFARESULT`, `BFAINTER`, and `BFAWBUY` record country, result page, interest, and purchase intent. Field values are limited to Mailchimp's 255-byte maximum. A full snapshot is also stored in contact notes, split below Mailchimp's 1,000-character note limit.

Before deploying this version against a new audience, run `node --env-file=.env.local scripts/setup-mailchimp-quiz-fields.mjs` to create missing fields. The script is safe to rerun and verifies all 13 fields. South Africa and Kenya currently use the same audience, so setup only needs to run once for that audience.

Only new contacts are set to `subscribed`. An existing unsubscribed or cleaned contact retains its status and the form shows an error instead of claiming a successful entry.

## Country email flow

South Africa and Kenya currently use the same `FTA Marketplace` audience. This quiz adds the `Kenya` tag; the South Africa quiz adds the `South Africa` tag. Create a separate Mailchimp marketing automation flow for each country in that audience, with **Tag added** set to its country tag. Each flow should contain that country's email sequence. The quiz adds the tag; it does not create or activate the flow.

When the email sequences are ready, activate both flows before expecting automated emails from new quiz signups. Contacts tagged before a flow is active will not enter it retroactively. Test each quiz with a fresh, consented address and verify entry into only the matching country flow.

## Verification

Run `npm run test:mailchimp` for mocked API checks. After configuring credentials, submit one consented test address through the deployed form and verify its status, tags, quiz fields, and notes in the intended audience. The Playwright files named `klaviyo-*` document the previous integration and should not be used as Mailchimp verification.

API references: [upsert member](https://mailchimp.com/developer/marketing/api/lists/members/upsert-member), [member notes](https://mailchimp.com/developer/marketing/api/lists/create-member-note), [tag-triggered flows](https://mailchimp.com/help/send-tags/).
