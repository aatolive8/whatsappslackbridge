const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const {
  SLACK_WEBHOOK_URL,
  SLACK_CHANNEL_ID,
  TWILIO_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_WHATSAPP_FROM,
} = process.env;

async function sendWhatsApp(to, body) {
  const url = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json`;

  const payload = new URLSearchParams({
    From: TWILIO_WHATSAPP_FROM,
    To: `whatsapp:${to}`,
    Body: body,
  });

  await axios.post(url, payload, {
    auth: {
      username: TWILIO_SID,
      password: TWILIO_AUTH_TOKEN,
    },
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
}

app.post('/incoming-whatsapp', async (req, res) => {
  const from = req.body.From.replace('whatsap
