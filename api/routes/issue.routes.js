const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issue.controller');
const verifyToken = require('../middlewares/verifyToken'); // Import middleware

// --- Public Routes ---
// Anyone can see recent issues, all issues, and stats
router.get('/recent', issueController.getRecentIssues);
router.get('/', issueController.getAllIssues);
router.get('/stats', issueController.getStats);

// --- Private Routes ---
// User must be logged in (verified) to perform these actions
router.get('/:id', verifyToken, issueController.getIssueById);
router.post('/', verifyToken, issueController.createIssue);
router.put('/:id', verifyToken, issueController.updateIssue);
router.delete('/:id', verifyToken, issueController.deleteIssue);

// Get issues by email (Note: Add logic in controller to check req.user.email)
router.get('/by-email/:email', verifyToken, issueController.getIssuesByEmail);

module.exports = router;