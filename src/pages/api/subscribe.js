// pages/api/subscribe.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, firstName, lastName, customFields } = req.body;

  // Replace with your actual Klaviyo list ID and private API key
  const LIST_ID = "VyReQX";
  const API_KEY = process.env.KLAVIYO_PRIVATE_API_KEY;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const profileUrl = "https://a.klaviyo.com/api/profiles";
  const subscribeUrl = `https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs`;

  function getYesterdayDateTime() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toISOString();
  }

  try {
    // Step 1: Create Profile
    const createProfileResponse = await fetch(`${profileUrl}`, {
      method: "POST",
      headers: {
        accept: "application/vnd.api+json",
        revision: "2024-10-15",
        "content-type": "application/vnd.api+json",
        Authorization: `Klaviyo-API-Key ${API_KEY}`,
      },
      body: JSON.stringify({
        data: {
          type: "profile",
          attributes: {
            email: email,
            first_name: firstName,
            last_name: lastName,
            location: {
              country: "Kenya",
            },
            properties: { ...customFields },
          },
        },
      }),
    });

    const createProfileData = await createProfileResponse.json();

    if (!createProfileResponse.ok) {
      return res.status(createProfileResponse.status).json({
        error: createProfileData.errors
          ? createProfileData.errors[0]?.detail || "An unknown error occurred"
          : "Failed to create profile",
      });
    }

    console.log("Profile created successfully");
    console.log("Assigning to list");
    console.log("Profile ID:", createProfileData.data.id);
    console.log("List ID:", LIST_ID);

    // Step 2: Subscribe Profile to List
    const subscribeResponse = await fetch(`${subscribeUrl}`, {
      method: "POST",
      headers: {
        accept: "application/vnd.api+json",
        revision: "2024-10-15",
        "content-type": "application/vnd.api+json",
        Authorization: `Klaviyo-API-Key ${API_KEY}`,
      },
      body: JSON.stringify({
        data: {
          type: "profile-subscription-bulk-create-job",
          attributes: {
            profiles: {
              data: [
                {
                  type: "profile",
                  id: createProfileData.data.id,
                  attributes: {
                    subscriptions: {
                      email: {
                        marketing: {
                          consent: "SUBSCRIBED", // Email marketing consent
                          //   consented_at: getYesterdayDateTime(),
                        },
                      },
                    },
                    email: email,
                  },
                },
              ],
            },
            // historical_import: true, // Indicates whether this is a historical import
          },
          relationships: {
            list: {
              data: {
                type: "list",
                id: LIST_ID, // Use your actual list ID
              },
            },
          },
        },
      }),
    });

    console.log("Subscribe Profile Status:", subscribeResponse.status);

    if (!subscribeResponse.ok) {
      console.error("Error subscribing profile to list");
      return res.status(subscribeResponse.status).json({
        error: "Failed to subscribe profile to list",
      });
    }

    // Handle empty response body for 202
    if (subscribeResponse.status === 202) {
      console.log("Subscription request accepted for processing.");
      return res.status(200).json({
        success: true,
        message: "Subscription request accepted for processing.",
      });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error in API handler:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
