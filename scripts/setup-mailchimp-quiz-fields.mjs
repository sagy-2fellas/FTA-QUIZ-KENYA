import { QUIZ_MERGE_FIELDS } from "../src/utils/mailchimpQuizFields.js";

const apiKey = process.env.MAILCHIMP_API_KEY?.trim();
const audienceId = (process.env.MAILCHIMP_AUDIENCE_ID_KE || process.env.MAILCHIMP_AUDIENCE_ID)?.trim();
const server = (process.env.MAILCHIMP_SERVER_PREFIX || apiKey?.split("-").pop())?.trim();

if (!apiKey || !audienceId || !/^us\d+$/.test(server || "")) {
  throw new Error("Mailchimp API key, audience ID, or server prefix is missing.");
}

const url = `https://${server}.api.mailchimp.com/3.0/lists/${encodeURIComponent(audienceId)}/merge-fields`;
async function request(path, options = {}) {
  const response = await fetch(`${url}${path}`, {
    ...options,
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(`Mailchimp merge field request failed (${response.status}: ${data.title || "Unknown error"}).`);
  return data;
}

const current = await request("?count=100");
const existing = new Set(current.merge_fields.map((field) => field.tag));
let created = 0;
for (const field of QUIZ_MERGE_FIELDS) {
  if (existing.has(field.tag)) continue;
  await request("", {
    method: "POST",
    body: JSON.stringify({ ...field, type: "text", public: false, required: false }),
  });
  created += 1;
}
const verified = await request("?count=100");
const tags = new Set(verified.merge_fields.map((field) => field.tag));
if (!QUIZ_MERGE_FIELDS.every((field) => tags.has(field.tag))) {
  throw new Error("One or more quiz merge fields are missing after setup.");
}
console.log(`Quiz fields ready: ${QUIZ_MERGE_FIELDS.length} verified, ${created} created.`);
