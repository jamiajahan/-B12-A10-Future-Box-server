const mongoose = require('mongoose');
require('dotenv').config();

// Construct the MongoDB URI from your .env variables
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER_URL}/cleanCommunityDB?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    // Attempt to connect to the database
    await mongoose.connect(uri);
    console.log("MongoDB connected successfully using Mongoose.");
  } catch (error) {
    // Log any errors and exit the application
    console.error("MongoDB connection error:", error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;