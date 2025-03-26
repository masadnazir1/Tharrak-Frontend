const POSTUSERGOOGLE = require("../models/POSTUSER_Google");
const { OAuth2Client } = require("google-auth-library");

//install it
//npm install google-auth-library

// Replace with your Google Client ID
const CLIENT_ID =
  "411862526595-a9ugd2nrsaidg8e9rutgo10pu12rcsap.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);
//
//
//

const GoogleAuth = async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });

    const payload = ticket.getPayload(); // Extract user details

    // User details extracted from the token
    const user = {
      id: payload.sub,
      name: payload.name,
      email: payload.email,
      picture: payload.picture,
    };

    console.log("User Verified:", user);

    const result = await POSTUSERGOOGLE.POSTUSER(
      // id, username, email, profile_picture,

      user.id,
      user.name,
      user.email,
      user.picture
    );
    console.log("Database Response:", result);

    res.json({
      success: true,
      message: "User verified successfully",
      user,
    });
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

const GetDetails = async (req, res) => {
  const { user_id } = req.body; // Extract from query

  if (!user_id) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const response = await POSTUSERGOOGLE.GETUSERNAMEANDPICTURE(user_id); // Fetch user details
    console.log("GET THE DETAILS OF", user_id);

    res.status(200).json(response); // Send user details
  } catch (error) {
    console.error("Error getting the user details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//

module.exports = { GoogleAuth, GetDetails }; // ✅ Ensure you export the router
