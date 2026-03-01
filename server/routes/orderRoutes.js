const express = require("express");
const { assignWork } = require("../controllers/orderController");

const router = express.Router();

router.post("/assign-work", assignWork);

module.exports = router;