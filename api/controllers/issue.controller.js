const Issue = require('../models/issue.model');
const User = require('../models/user.model'); // For stats

// GET Recent Issues (Homepage)
module.exports.getRecentIssues = async (req, res) => {
  try {
    const issues = await Issue.find({})
      .sort({ date: -1 }) //
      .limit(6); //
    res.status(200).json(issues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET All Issues (All Issues Page) (with filtering)
module.exports.getAllIssues = async (req, res) => {
  try {
    let query = {};
    if (req.query.category) { //
      query.category = req.query.category;
    }
    if (req.query.status) { //
      query.status = req.query.status;
    }
    const issues = await Issue.find(query);
    res.status(200).json(issues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET a single issue by ID (Issue Details Page)
module.exports.getIssueById = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    res.status(200).json(issue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST a new Issue (Add Issue Page)
module.exports.createIssue = async (req, res) => {
  try {
    const newIssue = new Issue(req.body);
    const savedIssue = await newIssue.save();
    res.status(201).json(savedIssue);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT (Update) an issue (My Issues Page)
module.exports.updateIssue = async (req, res) => {
  try {
    // Find by ID and update with the request body
    const updatedIssue = await Issue.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // Return the updated document
    );
    res.status(200).json(updatedIssue);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE an issue (My Issues Page)
module.exports.deleteIssue = async (req, res) => {
  try {
    await Issue.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Issue deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET issues by user email (My Issues Page)
module.exports.getIssuesByEmail = async (req, res) => {
  try {
    const issues = await Issue.find({ email: req.params.email });
    res.status(200).json(issues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET Homepage Stats (Homepage)
module.exports.getStats = async (req, res) => {
  try {
    const totalUsers = await User.estimatedDocumentCount();
    const totalIssues = await Issue.estimatedDocumentCount();
    const resolvedIssues = await Issue.countDocuments({ status: 'ended' });

    res.status(200).json({
      totalUsers,
      totalIssues,
      resolvedIssues,
      pendingIssues: totalIssues - resolvedIssues,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};