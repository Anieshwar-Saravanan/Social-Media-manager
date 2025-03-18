require("dotenv").config({ path: "./LinkedIn_variables.env" });
const axios = require("axios");

const ACCESS_TOKEN = process.env.LINKEDIN_ACCESS_TOKEN;

// Function to get LinkedIn Member ID
async function getLinkedInMemberId(accessToken) {
    try {
        const response = await axios.get("https://api.linkedin.com/v2/me", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data.id; // Returns the correct LinkedIn Member ID
    } catch (error) {
        console.error("Error fetching LinkedIn Member ID:", error.response ? error.response.data : error);
        return null;
    }
}

// Function to post content on LinkedIn
async function postToLinkedIn(accessToken, content) {
    try {
        const memberId = await getLinkedInMemberId(accessToken);
        if (!memberId) {
            throw new Error("Failed to retrieve LinkedIn Member ID");
        }

        const payload = {
            author: `urn:li:member:${memberId}`,
            lifecycleState: "PUBLISHED",
            specificContent: {
                "com.linkedin.ugc.ShareContent": {
                    shareCommentary: {
                        text: content
                    },
                    shareMediaCategory: "NONE"
                }
            },
            visibility: {
                "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
            }
        };

        const response = await axios.post(
            "https://api.linkedin.com/v2/ugcPosts",
            payload,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "X-Restli-Protocol-Version": "2.0.0",
                    "Content-Type": "application/json"
                }
            }
        );

        console.log("Successfully posted to LinkedIn:", response.data);
    } catch (error) {
        console.error("Error posting to LinkedIn:", error.response ? error.response.data : error);
    }
}

// Call the function with content
postToLinkedIn(ACCESS_TOKEN, "Hello, this is a test post from my LinkedIn API integration!");
