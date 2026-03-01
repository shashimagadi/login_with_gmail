const sendEmail = require("../services/emailService");
require("dotenv").config();

// Example: When Admin assigns work to Karigar
const assignWorkController = async (req, res) => {
  try {
    const { karigarEmail, customerName, material, weight, deadline } = req.body;
console.log(karigarEmail, "karigarEmail")
    // 1️⃣ Here normally you will save task in DB
    // await Task.create({...})

    // 2️⃣ Prepare Email Template
    const htmlTemplate = `
      <h2>New Jewellery Task Assigned</h2>
      <p><strong>Customer:</strong> ${customerName}</p>
      <p><strong>Material:</strong> ${material}</p>
      <p><strong>Weight:</strong> ${weight}</p>
      <p><strong>Deadline:</strong> ${deadline}</p>
      <p>Please login to your dashboard to accept or reject the task.</p>
    `;

    // 3️⃣ Send Email
    await sendEmail({
      to: karigarEmail,
      subject: "New Jewellery Work Assigned",
      html: htmlTemplate,
    });

    res.status(200).json({
      success: true,
      message: "Task assigned & email sent successfully",
    });

  } catch (error) {
    console.error("Assign Work Error:", error);

    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports = {
  assignWorkController,
};