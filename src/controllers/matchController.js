const Match = require("../models/Match");
const User = require("../models/User");

// Send a love request
exports.sendLoveRequest = async (req, res) => {
  const { senderId, receiverId } = req.body;

  try {
    // Check if the receiver exists
    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({ message: "Receiver not found" });
    }

    // Create a new match request
    const match = new Match({
      user1: senderId,
      user2: receiverId,
      status: "pending",
    });

    // Save the match request
    await match.save();

    // Add the love request to the receiver's profile
    await User.findByIdAndUpdate(receiverId, { $push: { loveRequests: senderId } });

    // Return success response
    res.status(201).json({ message: "Love request sent successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Respond to a love request
exports.respondToLoveRequest = async (req, res) => {
  const { matchId, status } = req.body;

  try {
    // Find the match request
    const match = await Match.findById(matchId);
    if (!match) {
      return res.status(404).json({ message: "Match request not found" });
    }

    // Update the match status
    match.status = status;
    await match.save();

    // If the request is accepted, add each user to the other's matches list
    if (status === "accepted") {
      await User.findByIdAndUpdate(match.user1, { $push: { matches: match.user2 } });
      await User.findByIdAndUpdate(match.user2, { $push: { matches: match.user1 } });
    }

    // Return success response
    res.status(200).json({ message: `Love request ${status}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch all matches for a user
exports.getUserMatches = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the user and populate their matches
    const user = await User.findById(userId).populate("matches");

    // Return the list of matches
    res.status(200).json(user.matches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};