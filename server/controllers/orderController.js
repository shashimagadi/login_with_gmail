const { sendWhatsAppMessage } = require("../services/whatsappService");

const assignWork = async (req, res) => {
  try {
    const { karigarPhone, karigarName, orderId } = req.body;

    // 👉 Here you can save order to MongoDB

    const message = `
Hello ${karigarName},

You have been assigned a new jewellery work.
Order ID: ${orderId}

Please check the application.
    `;

    const sid = await sendWhatsAppMessage(karigarPhone, message);

    res.status(200).json({
      success: true,
      message: "Work assigned & WhatsApp sent",
      messageSid: sid
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to send WhatsApp"
    });
  }
};

module.exports = { assignWork };