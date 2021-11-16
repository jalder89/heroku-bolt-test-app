const tools = require('./tools.js')
const { App, LogLevel } = require('@slack/bolt');

/* 
This sample slack application has been adapted to use HTTP 
instead of Socket Mode. However, Heroku fails to bind
the port even though it is generate and assigned to env var.

Calling tools.startListener will start a HTTP web server listening on 5000.
This avoids the R10 timeout for port binding, but then routing is broken.
*/

// tools.startListener();

// Initializes your app with your bot token and app token
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

// Listens to incoming messages that contain "hello"
app.event('app_home_opened', async ({ event, client }) => {

  try {
    const result = await client.chat.postMessage({
      channel: event.channel,
      blocks: [{
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "_Hey there!_"
        }
      }]
    })
  }

  catch (error){
    console.error(error);
  }
  
});

app.command('/greet', async ({ command, ack, respond }) => {
  // Acknowledge the action
  await ack();
  await respond(`<@${body.user.id}> says hi!`);
});

(async () => {
  // Start your app
  await app.start(Number(process.env.PORT) || 3000);

  console.log('⚡️ Bolt app is running! ' + process.env.PORT);
})();