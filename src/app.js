const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const errorHandler = require("./utils/errorHandler");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/matches", require("./routes/matchRoutes"));
app.use("/api/chat", require("./routes/chatRoutes"));
app.use("/api/report", require("./routes/reportRoutes"));

// Error handling middleware
app.use(errorHandler);

module.exports = app;