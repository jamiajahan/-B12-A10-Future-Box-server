const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb'); // <-- Import ObjectId

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
app.use(express.json());

// MongoDB Connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.your-cluster-id.mongodb.net/?retryWrites=true&w=majority`; // <-- !! MAKE SURE TO UPDATE THIS !!

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // --- Collection Definitions ---
    const issueCollection = client.db("cleanCommunityDB").collection("issues");
    const contributionCollection = client.db("cleanCommunityDB").collection("contributions");
    const userCollection = client.db("cleanCommunityDB").collection("users"); // For stats

    
    // --- API Endpoints ---
    
    [cite_start]// GET Recent Issues (Homepage) [cite: 42]
    app.get('/issues/recent', async (req, res) => {
      const result = await issueCollection
        .find()
        .sort({ date: -1 }) // -1 means sort in descending order (newest first)
        [cite_start].limit(6) // [cite: 42]
        .toArray();
      res.send(result);
    });

    // POST a new Issue (Add Issue Page)
    app.post('/issues', async (req, res) => {
      const newIssue = req.body;
      const result = await issueCollection.insertOne(newIssue);
      res.send(result);
    });

    // GET All Issues (All Issues Page) (with filtering)
    app.get('/issues', async (req, res) => {
      let query = {}; // Start with an empty query object
      
      [cite_start]if (req.query.category) { // [cite: 162]
        query.category = req.query.category;
      }
      [cite_start]if (req.query.status) { // [cite: 162]
        query.status = req.query.status;
      }

      const result = await issueCollection.find(query).toArray();
      res.send(result);
    });

    // GET a single issue by ID (Issue Details Page)
    app.get('/issues/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await issueCollection.findOne(query);
      res.send(result);
    });

    // PUT (Update) an issue (My Issues Page)
    app.put('/issues/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedIssue = req.body;
      const options = { upsert: false }; 

      const updateDoc = {
        $set: {
          title: updatedIssue.title,
          category: updatedIssue.category,
          amount: updatedIssue.amount,
          description: updatedIssue.description,
          status: updatedIssue.status,
        },
      };
      
      const result = await issueCollection.updateOne(filter, updateDoc, options);
      res.send(result);
    });

    // DELETE an issue (My Issues Page)
    app.delete('/issues/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await issueCollection.deleteOne(query);
      res.send(result);
    });

    // GET issues by user email (My Issues Page)
    app.get('/issues-by-email/:email', async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const result = await issueCollection.find(query).toArray();
      res.send(result);
    });

    // POST a new contribution (Issue Details Page)
    app.post('/contributions', async (req, res) => {
      const newContribution = req.body;
      const result = await contributionCollection.insertOne(newContribution);
      res.send(result);
    });

    // GET contributions for a specific issue (Issue Details Page)
    app.get('/contributions/:issueId', async (req, res) => {
      const issueId = req.params.issueId;
      const query = { issueId: issueId }; 
      const result = await contributionCollection.find(query).toArray();
      res.send(result);
    });

    // GET contributions by user email (My Contribution Page)
    app.get('/contributions-by-email/:email', async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const result = await contributionCollection.find(query).toArray();
      res.send(result);
    });

    // GET Homepage Stats (Homepage)
    app.get('/stats', async (req, res) => {
      const totalUsers = await userCollection.estimatedDocumentCount();
      const totalIssues = await issueCollection.estimatedDocumentCount();
      const resolvedIssues = await issueCollection.countDocuments({ status: 'ended' });

      res.send({
        totalUsers,
        totalIssues,
        resolvedIssues,
        pendingIssues: totalIssues - resolvedIssues,
      });
    });
    

    // --- Server Ping ---
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

  } finally {
    // await client.close();
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