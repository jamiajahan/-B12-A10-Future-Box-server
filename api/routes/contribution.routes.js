const express = require('express');
const router = express.Router();
const contributionController = require('../controllers/contribution.controller');
const verifyToken = require('../middlewares/verifyToken'); // Import middleware

// --- Private Routes ---
// All contribution routes require a valid token
router.post('/', verifyToken, contributionController.createContribution);
router.get('/:issueId', verifyToken, contributionController.getContributionsByIssue);
router.get('/by-email/:email', verifyToken, contributionController.getContributionsByEmail);

module.exports = router;