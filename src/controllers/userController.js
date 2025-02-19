const User = require("../models/User");

// Fetch users based on their interests
exports.getUsersByInterest = async (req, res) => {
  const { interestedIn } = req.params;

  try {
    // Find users whose `interestedIn` field matches the query
    const users = await User.find({ interestedIn });

    // Return the list of users
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch users based on their hobbies
exports.getUsersByHobbies = async (req, res) => {
  const { hobby } = req.params;

  try {
    // Find users whose `hobbies` array contains the query
    const users = await User.find({ hobbies: hobby });

    // Return the list of users
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a user profile
exports.deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find and delete the user
    await User.findByIdAndDelete(userId);

    // Return success response
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};