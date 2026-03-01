const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");
require("dotenv").config();

const sesClient = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const sendEmail = async ({ to, subject, html }) => {
  try {
    console.log("FROM EMAIL:", process.env.FROM_EMAIL);
    const command = new SendEmailCommand({
      Source: process.env.FROM_EMAIL,
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Subject: {
          Data: subject,
          Charset: "UTF-8",
        },
        Body: {
          Html: {
            Data: html,
            Charset: "UTF-8",
          },
        },
      },
    });

    const response = await sesClient.send(command);
    return response;
  } catch (error) {
    console.error("SES Error:", error);
    throw error;
  }
};

module.exports = sendEmail;