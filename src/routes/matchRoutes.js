const express = require("express");
const { sendLoveRequest, respondToLoveRequest, getUserMatches } = require("../controllers/matchController");
const authMiddleware = require("../utils/authMiddleware");

const router = express.Router();

router.post("/send-request", authMiddleware, sendLoveRequest);
router.post("/respond-to-request", authMiddleware, respondToLoveRequest);
router.get("/matches/:userId", authMiddleware, getUserMatches);

module.exports = router;