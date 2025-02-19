const express = require("express");
const { sendMessage, getChatHistory } = require("../controllers/chatController");
const authMiddleware = require("../utils/authMiddleware");

const router = express.Router();

router.post("/send-message", authMiddleware, sendMessage);
router.get("/chat-history/:user1Id/:user2Id", authMiddleware, getChatHistory);

module.exports = router;