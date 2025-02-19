const Report = require("../models/Report");
const User = require("../models/User");

// Report a user
exports.reportUser = async (req, res) => {
  const { reporterId, reportedUserId, reason } = req.body;

  try {
    // Create a new report
    const report = new Report({
      reporter: reporterId,
      reportedUser: reportedUserId,
      reason,
    });

    // Save the report
    await report.save();

    // Add the report to the reported user's profile
    await User.findByIdAndUpdate(reportedUserId, { $push: { reportedBy: reporterId } });

    // Return success response
    res.status(201).json({ message: "User reported successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};