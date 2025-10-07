// pages/api/subscribe.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email, firstName, lastName, customFields } = req.body;

    // Validate required fields
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Get environment variables
    const LIST_ID = process.env.KLAVIYO_LIST_ID_KE || process.env.KLAVIYO_LIST_ID || "";
    const API_KEY = process.env.KLAVIYO_PRIVATE_API_KEY || "";
    const trimmedListId = (LIST_ID || "").trim();
    const trimmedApiKey = (API_KEY || "").trim();

    if (!trimmedListId) {
      console.error("[Klaviyo] Missing KLAVIYO_LIST_ID_KE or KLAVIYO_LIST_ID");
      return res.status(500).json({ error: "Server configuration error: Missing list ID" });
    }

    if (!trimmedApiKey) {
      console.error("[Klaviyo] Missing KLAVIYO_PRIVATE_API_KEY");
      return res.status(500).json({ error: "Server configuration error: Missing API key" });
    }

    // Log subscription attempt (safe info only)
    console.log("[Klaviyo] Subscription attempt:", {
      email: email.substring(0, 3) + "***",
      hasFirstName: Boolean(firstName),
      hasLastName: Boolean(lastName),
      listId: trimmedListId,
      customFieldsCount: Object.keys(customFields || {}).length,
    });

    // Step 1: Create or update profile with server-side API
    const profilePayload = {
      data: {
        type: "profile",
        attributes: {
          email: email,
          first_name: firstName || "",
          last_name: lastName || "",
          location: {
            country: "Kenya",
          },
          properties: {
            ...(customFields || {}),
            quiz_completed: true,
            quiz_completion_date: new Date().toISOString(),
            source: "FTA Quiz Form",
          },
        },
      },
    };

    const profileResponse = await fetch("https://a.klaviyo.com/api/profiles/", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        revision: "2024-10-15",
        Authorization: `Klaviyo-API-Key ${trimmedApiKey}`,
      },
      body: JSON.stringify(profilePayload),
    });

    let profileData = await profileResponse.json().catch(() => ({}));
    let profileId = profileData?.data?.id;

    // If profile already exists (409), fetch it
    if (profileResponse.status === 409) {
      console.log("[Klaviyo] Profile exists, fetching...");

      const getProfileResponse = await fetch(
        `https://a.klaviyo.com/api/profiles/?filter=equals(email,"${email}")`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            revision: "2024-10-15",
            Authorization: `Klaviyo-API-Key ${trimmedApiKey}`,
          },
        }
      );

      const getProfileData = await getProfileResponse.json().catch(() => ({}));
      profileId = getProfileData?.data?.[0]?.id;

      if (!profileId) {
        console.error("[Klaviyo] Failed to fetch existing profile");
        return res.status(500).json({ error: "Failed to process existing profile" });
      }
    } else if (!profileResponse.ok) {
      console.error("[Klaviyo] Profile creation failed:", {
        status: profileResponse.status,
        error: profileData?.errors?.[0]?.detail || profileData,
      });
      return res.status(profileResponse.status).json({
        error: profileData?.errors?.[0]?.detail || "Failed to create profile",
        details: profileData,
      });
    }

    console.log("[Klaviyo] Profile ready, ID:", profileId?.substring(0, 8) + "***");

    // Step 2: Subscribe profile to list using server-side API
    const subscribePayload = {
      data: {
        type: "profile-subscription-bulk-create-job",
        attributes: {
          profiles: {
            data: [
              {
                type: "profile",
                id: profileId,
                attributes: {
                  email: email,
                  subscriptions: {
                    email: {
                      marketing: {
                        consent: "SUBSCRIBED",
                      },
                    },
                  },
                },
              },
            ],
          },
        },
        relationships: {
          list: {
            data: {
              type: "list",
              id: trimmedListId,
            },
          },
        },
      },
    };

    const subscribeResponse = await fetch(
      "https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          revision: "2024-10-15",
          Authorization: `Klaviyo-API-Key ${trimmedApiKey}`,
        },
        body: JSON.stringify(subscribePayload),
      }
    );

    // Handle subscription response
    if (subscribeResponse.status === 202) {
      console.log("[Klaviyo] Subscription job accepted (202)");
      return res.status(200).json({
        success: true,
        message: "Successfully subscribed to the giveaway!",
      });
    }

    if (subscribeResponse.ok) {
      console.log("[Klaviyo] Subscription successful");
      return res.status(200).json({
        success: true,
        message: "Successfully subscribed to the giveaway!",
      });
    }

    const subscribeData = await subscribeResponse.json().catch(() => ({}));
    console.error("[Klaviyo] Subscription failed:", {
      status: subscribeResponse.status,
      error: subscribeData?.errors?.[0]?.detail || subscribeData,
    });

    return res.status(subscribeResponse.status).json({
      error: subscribeData?.errors?.[0]?.detail || "Failed to subscribe to list",
      details: subscribeData,
    });
  } catch (error) {
    console.error("[Klaviyo] Server error:", error);
    return res.status(500).json({
      error: "Internal server error. Please try again later.",
      details: error.message,
    });
  }
}
