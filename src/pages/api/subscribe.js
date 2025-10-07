// pages/api/subscribe.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, firstName, lastName, customFields } = req.body;

  // Replace with your actual Klaviyo list ID and private API key
  const LIST_ID = process.env.KLAVIYO_LIST_ID_KE || process.env.KLAVIYO_LIST_ID || "";
  const API_KEY = process.env.KLAVIYO_PRIVATE_API_KEY;
  const PUBLIC_KEY =
    process.env.KLAVIYO_PUBLIC_API_KEY ||
    process.env.KLAVIYO_PUBLIC_KEY ||
    process.env.NEXT_PUBLIC_KLAVIYO_PUBLIC_API_KEY ||
    process.env.NEXT_PUBLIC_KLAVIYO_PUBLIC_KEY ||
    process.env.KLAVIYO_SITE_ID ||
    process.env.NEXT_PUBLIC_KLAVIYO_SITE_ID ||
    "";
  const trimmedListId = (LIST_ID || "").trim();
  const trimmedApiKey = (API_KEY || "").trim();
  const trimmedPublicKey = (PUBLIC_KEY || "").trim();

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }
  if (!trimmedApiKey) {
    return res.status(500).json({ error: "Server missing KLAVIYO_PRIVATE_API_KEY" });
  }
  if (!trimmedListId) {
    return res.status(500).json({ error: "Server missing KLAVIYO_LIST_ID_KE or KLAVIYO_LIST_ID" });
  }

  const profileUrl = "https://a.klaviyo.com/api/profiles";
  const subscribeUrl = `https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs`;

  function getYesterdayDateTime() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toISOString();
  }

  try {
    // If public key present, prefer client subscriptions endpoint (no private key required)
    if (trimmedPublicKey) {
      const clientPayload = {
        data: {
          type: "subscription",
          attributes: {
            profile: {
              data: {
                type: "profile",
                attributes: {
                  email: email,
                  first_name: firstName,
                  last_name: lastName,
                  properties: { ...customFields },
                },
              },
            },
            custom_source: "FTA Quiz",
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

      const clientResp = await fetch("https://a.klaviyo.com/client/subscriptions/", {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          revision: "2024-10-15",
          Authorization: `Klaviyo-API-Key ${trimmedPublicKey}`,
        },
        body: JSON.stringify(clientPayload),
      });

      const clientData = await clientResp.json().catch(() => ({}));
      if (!clientResp.ok) {
        return res.status(clientResp.status).json({ error: clientData?.errors?.[0]?.detail || "Failed to subscribe (client)" });
      }
      return res.status(200).json({ success: true });
    }

    // Step 1 (server flow): Create Profile
    const createProfileResponse = await fetch(`${profileUrl}`, {
      method: "POST",
      headers: {
        accept: "application/vnd.api+json",
        revision: "2024-10-15",
        "content-type": "application/vnd.api+json",
        Authorization: `Klaviyo-API-Key ${trimmedApiKey}`,
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

    let profileId = createProfileData?.data?.id;

    if (!createProfileResponse.ok) {
      // If profile already exists, fetch it by email and continue
      if (createProfileResponse.status === 409 || createProfileResponse.status === 400) {
        const queryEmail = encodeURIComponent(email);
        const getProfileResponse = await fetch(
          `https://a.klaviyo.com/api/profiles/?filter=equals(email,'${queryEmail}')`,
          {
            method: "GET",
            headers: {
              accept: "application/vnd.api+json",
              revision: "2024-10-15",
              Authorization: `Klaviyo-API-Key ${trimmedApiKey}`,
            },
          }
        );
        const getProfileData = await getProfileResponse.json();
        if (!getProfileResponse.ok || !getProfileData?.data?.[0]?.id) {
          return res.status(createProfileResponse.status).json({
            error:
              getProfileData?.errors?.[0]?.detail ||
              createProfileData?.errors?.[0]?.detail ||
              "Failed to create or find existing profile",
          });
        }
        profileId = getProfileData.data[0].id;
      } else {
        return res.status(createProfileResponse.status).json({
          error: createProfileData.errors
            ? createProfileData.errors[0]?.detail || "An unknown error occurred"
            : "Failed to create profile",
        });
      }
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
                  id: profileId,
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
                id: trimmedListId, // Use your actual list ID
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
