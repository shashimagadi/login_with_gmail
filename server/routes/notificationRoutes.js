const express = require("express");
const router = express.Router();
const { assignWorkController } = require("../controllers/notificationController");

router.post("/assign-work-by-mail", assignWorkController);

module.exports = router;