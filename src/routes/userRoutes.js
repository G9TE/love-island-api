const express = require("express");
const { getUsersByInterest, getUsersByHobbies, deleteUser } = require("../controllers/userController");
const authMiddleware = require("../utils/authMiddleware");

const router = express.Router();

router.get("/users/interested-in/:interestedIn", authMiddleware, getUsersByInterest);
router.get("/users/hobbies/:hobby", authMiddleware, getUsersByHobbies);
router.delete("/users/:userId", authMiddleware, deleteUser);

module.exports = router;