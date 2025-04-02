# V0Bit Project

## Overview

V0Bit is a monorepo project consisting of two main components: a bot application and a dashboard application. The bot is designed to interact with users on X (Twitter) and generate web applications using Vercel's v0 platform based on user prompts. The dashboard is a Next.js application that provides a user interface for managing and monitoring the bot's activities.

## Components

### Bot

- **Technology**: Node.js, Express.js
- **Functionality**: 
  - Listens for mentions on X (Twitter) using Twitter's API.
  - Generates and deploys web applications using Vercel's v0 API.
  - Replies to user tweets with the URL of the deployed application.

### Dashboard

- **Technology**: Next.js, React, Tailwind CSS
- **Functionality**: 
  - Provides a user interface for monitoring bot activities.
  - Displays status indicators for different stages of app generation and deployment.
  - Allows users to interact with the bot and view generated applications.

## Getting Started

### Bot

1. **Install Dependencies**:
   ```bash
   cd bot
   npm install

2. Run the Bot :
   
   ```bash
   node index.js
    ```
3. Environment Variables :
   
   - Set up TWITTER_BEARER_TOKEN and VERCEL_API_TOKEN in a .env file.
### Dashboard
1. Install Dependencies :
   
   ```bash
   cd dashboard
   npm install
    ```
2. Run the Development Server :
   
   ```bash
   npm run dev
    ```
3. Open in Browser :
   
   - Visit http://localhost:3000 to view the dashboard.
## Deployment
- The dashboard can be deployed using the Vercel platform. Refer to the Next.js deployment documentation for more details.
## License
This project is licensed under the ISC License.

## Contact
For questions or feedback, please contact the project author.   