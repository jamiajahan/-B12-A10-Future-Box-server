const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db'); // Import DB connection

// Import route files
const issueRoutes = require('./api/routes/issue.routes');
const contributionRoutes = require('./api/routes/contribution.routes');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173', 
    // Add your deployed live site URL here later
  ],
  credentials: true
}));
app.use(express.json()); // Body parser

// --- Connect to Database ---
connectDB();

// --- API Routes ---
// All issue-related routes will be prefixed with /issues
app.use('/issues', issueRoutes); 
// All contribution-related routes will be prefixed with /contributions
app.use('/contributions', contributionRoutes);


// Default server route
app.get('/', (req, res) => {
  res.send('Community Cleanliness Portal Server (v2) is running!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});