const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Twitter API credentials
const TWITTER_BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;

// Vercel API credentials
const VERCEL_API_TOKEN = process.env.VERCEL_API_TOKEN;
const VERCEL_V0_URL = 'https://api.vercel.com/v0/generate';

// Function to call Vercel API to generate and deploy the app
const generateAndDeployApp = async (prompt) => {
  try {
    const response = await axios.post(VERCEL_V0_URL, { prompt }, {
      headers: {
        'Authorization': `Bearer ${VERCEL_API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data.url; // Assuming the API returns the deployed app URL
  } catch (error) {
    console.error('Error generating app:', error.response?.data || error.message);
    throw error;
  }
};

// Function to reply to a tweet with the deployed app URL
const replyToTweet = async (tweetId, userHandle, appUrl) => {
  try {
    const response = await axios.post(`https://api.twitter.com/2/tweets`, {
      text: `@${userHandle} Your app is ready: ${appUrl}`,
      in_reply_to_status_id: tweetId
    }, {
      headers: {
        'Authorization': `Bearer ${TWITTER_BEARER_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error replying to tweet:', error.response?.data || error.message);
    throw error;
  }
};

// Twitter webhook endpoint to receive mentions
app.post('/twitter-webhook', async (req, res) => {
  const { tweet_text, tweet_id, user_handle } = req.body;

  if (!tweet_text) {
    return res.status(400).json({ error: 'Tweet text is required' });
  }

  try {
    // Generate and deploy the app
    const appUrl = await generateAndDeployApp(tweet_text);

    // Reply to the tweet with the app URL
    await replyToTweet(tweet_id, user_handle, appUrl);

    res.json({ success: true, appUrl });
  } catch (error) {
    console.error('Error processing Twitter mention:', error);
    res.status(500).json({ error: 'Failed to process tweet' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Bot server running at http://localhost:${port}`);
});
