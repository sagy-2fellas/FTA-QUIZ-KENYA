import { createHash } from "crypto";

const COUNTRY = "Kenya";
const AUDIENCE_ENV = "MAILCHIMP_AUDIENCE_ID_KE";

function getConfig() {
  const apiKey = process.env.MAILCHIMP_API_KEY?.trim();
  const audienceId = (process.env[AUDIENCE_ENV] || process.env.MAILCHIMP_AUDIENCE_ID)?.trim();
  const server = (process.env.MAILCHIMP_SERVER_PREFIX || apiKey?.split("-").pop())?.trim();
  if (!apiKey || !audienceId || !/^us\d+$/.test(server || "")) return null;
  return { apiKey, audienceId, baseUrl: `https://${server}.api.mailchimp.com/3.0` };
}

async function request(config, path, method, body) {
  const response = await fetch(`${config.baseUrl}${path}`, {
    method,
    headers: { Authorization: `Bearer ${config.apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    console.error("[Mailchimp] Request failed", { status: response.status, title: result.title });
    throw new Error("Mailchimp could not save this signup. Please try again.");
  }
  return result;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, firstName, lastName, customFields } = req.body || {};
  const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    return res.status(400).json({ error: "Enter a valid email address" });
  }
  const config = getConfig();
  if (!config) {
    console.error("[Mailchimp] Missing API key, audience ID, or server prefix");
    return res.status(500).json({ error: "Signup is temporarily unavailable" });
  }

  const subscriberHash = createHash("md5").update(normalizedEmail).digest("hex");
  const memberPath = `/lists/${encodeURIComponent(config.audienceId)}/members/${subscriberHash}`;
  const answers = customFields && typeof customFields === "object" && !Array.isArray(customFields)
    ? customFields : {};
  if (
    (typeof answers.question_1 !== "number" &&
      (typeof answers.question_1 !== "string" || !answers.question_1.trim())) ||
    (typeof answers.question_7 !== "number" &&
      (typeof answers.question_7 !== "string" || !answers.question_7.trim()))
  ) {
    return res.status(400).json({ error: "Complete the quiz before signing up so your answers can be saved." });
  }
  const note = JSON.stringify({ source: "BFA Quiz", country: COUNTRY, answers });
  if (note.length > 5000) {
    return res.status(400).json({ error: "Quiz answers are too long to save" });
  }

  try {
    // Existing unsubscribed contacts keep their status.
    const member = await request(config, memberPath, "PUT", {
      email_address: normalizedEmail,
      status_if_new: "subscribed",
      merge_fields: {
        FNAME: typeof firstName === "string" ? firstName.trim() : "",
        LNAME: typeof lastName === "string" ? lastName.trim() : "",
      },
      tags: ["BFA Quiz", COUNTRY],
    });
    if (member.status !== "subscribed") {
      return res.status(409).json({
        error: "This email address is not subscribed. Please contact us to complete your signup.",
      });
    }

    // Notes retain all quiz answers without relying on region-specific merge fields.
    const chunks = note.match(/[\s\S]{1,900}/g) || [];
    for (const [index, chunk] of chunks.entries()) {
      await request(config, `${memberPath}/notes`, "POST", {
        note: `Quiz answers ${index + 1}/${chunks.length}: ${chunk}`,
      });
    }
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("[Mailchimp] Signup failed", error.message);
    return res.status(502).json({ error: error.message });
  }
}
