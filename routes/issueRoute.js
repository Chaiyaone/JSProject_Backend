const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issuesController');

router.post('/',issueController.createIssue)

module.exports = router;