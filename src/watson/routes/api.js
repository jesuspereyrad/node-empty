const watsonController =  require("../controller");
var express = require('express');
var router = express.Router();

/// API WATSON ROUTES ///

// Send message to watson assistant.
router.post('/api/message', watsonController.sendMessage);

// // GET session for watson assistant.
router.get('/api/session', watsonController.getSession);

// webhooks
router.post('/webhook', watsonController.getWebhook);

module.exports = router;
