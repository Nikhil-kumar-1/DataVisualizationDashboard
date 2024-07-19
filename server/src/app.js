const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const apiRoutes = require("./routes/api");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  throw new Error("MONGODB_URI environment variable is not defined");
}

mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1); // Exit the process with failure
  });

// Routes
app.use("/api", apiRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
