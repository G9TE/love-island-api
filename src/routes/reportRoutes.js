const express = require("express");
const { reportUser } = require("../controllers/reportController");
const authMiddleware = require("../utils/authMiddleware");

const router = express.Router();

router.post("/report", authMiddleware, reportUser);

module.exports = router;