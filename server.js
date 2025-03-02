const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

// Connect to MongoDB using Atlas URI from environment variables
mongoose
  .connect(process.env.ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB database connection established successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ✅ API routes should come BEFORE serving React static files
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

// Connection to routes
// const DetailsRouter = require("./routes/Details.js");
// app.use("/details", DetailsRouter);

// Serve React static files (after running npm run build)
app.use(express.static(path.join(__dirname, "build")));

// Handle client-side routing (React Router)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
