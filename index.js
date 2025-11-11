const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173', // Local dev
    // TODO: Add your live Netlify/Firebase URL here after deployment
  ],
  credentials: true
}));
app.use(express.json());

// MongoDB Connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.your-cluster-id.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server (optional, but good practice)
    // await client.connect(); // You can comment this out if you use Vercel's serverless functions
    
    // --- Collection Definitions ---
    // Example: const issueCollection = client.db("cleanCommunityDB").collection("issues");
    // Example: const contributionCollection = client.db("cleanCommunityDB").collection("contributions");


    // --- API Endpoints ---
    
    // TODO: Add your issue routes
    
    // TODO: Add your contribution routes


    // --- Server Ping ---
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close(); // Comment this out for a persistent server
  }
}
run().catch(console.dir);


// Default server route
app.get('/', (req, res) => {
  res.send('Community Cleanliness Portal Server is running!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});