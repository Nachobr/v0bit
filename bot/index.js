const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Mock Grok API function (since no real API exists yet)
const mockGrokResponse = async (prompt) => {
  console.log(`Processing prompt with Grok: ${prompt}`);
  // Simulate Grok interpreting the prompt and returning a refined version
  return `Generate a React app: ${prompt}`;
};

// Placeholder Vercel @v0 endpoint (hypothetical)
const VERCEL_V0_URL = 'https://v0.vercel.com/generate';

// Bot endpoint to handle prompts
app.post('/generate', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    // Step 1: Send prompt to Grok (mocked)
    const grokResult = await mockGrokResponse(prompt);
    console.log(`Grok result: ${grokResult}`);

    // Step 2: Pass result to Vercel @v0 with query parameter (as per Goncy's suggestion)
    const redirectUrl = `${VERCEL_V0_URL}?prompt=${encodeURIComponent(grokResult)}`;
    console.log(`Redirecting to: ${redirectUrl}`);

    // Step 3: Simulate redirect (since we can't actually trigger @v0 here)
    // In a real scenario, @v0 would generate and return a deployed app URL
    const simulatedAppUrl = `https://generated-app-${Date.now()}.vercel.app`;
    
    res.json({
      message: 'Generation triggered',
      redirectUrl: redirectUrl,
      appUrl: simulatedAppUrl // Mocked response
    });
  } catch (error) {
    console.error('Error in bot:', error);
    res.status(500).json({ error: 'Failed to generate app' });
  }
});

// Start the server
 
//app.listen(port, () => {
  //console.log(`Bot server running at http://localhost:${port}`);
//});

// Example usage via command line (optional CLI mode)
const runCLI = async () => {
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

  readline.question('Enter your prompt: ', async (prompt) => {
    const grokResult = await mockGrokResponse(prompt);
    const redirectUrl = `${VERCEL_V0_URL}?prompt=${encodeURIComponent(grokResult)}`;
    console.log(`Would redirect to: ${redirectUrl}`);
    console.log(`Simulated app URL: https://generated-app-${Date.now()}.vercel.app`);
    readline.close();
  });
};

// Uncomment to run in CLI mode instead of server
runCLI();