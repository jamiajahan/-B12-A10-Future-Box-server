const Contribution = require('../models/contribution.model');

// POST a new contribution (Issue Details Page)
module.exports.createContribution = async (req, res) => {
  try {
    const newContribution = new Contribution(req.body);
    const savedContribution = await newContribution.save();
    res.status(201).json(savedContribution);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET contributions for a specific issue (Issue Details Page)
module.exports.getContributionsByIssue = async (req, res) => {
  try {
    const contributions = await Contribution.find({ issueId: req.params.issueId });
    res.status(200).json(contributions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET contributions by user email (My Contribution Page)
module.exports.getContributionsByEmail = async (req, res) => {
  try {
    const contributions = await Contribution.find({ email: req.params.email });
    res.status(200).json(contributions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};