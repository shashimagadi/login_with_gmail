const twilio = require("twilio");

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const sendWhatsAppMessage = async (to, messageBody) => {
  try {
    const message = await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: `whatsapp:${to}`, // Example: +919876543210
      body: messageBody
    });

    console.log("WhatsApp sent:", message.sid);
    return message.sid;

  } catch (error) {
    console.error("Twilio Error:", error.message);
    throw error;
  }
};

module.exports = { sendWhatsAppMessage };