const facebookController =  require("../controller");
var express = require('express');
var router = express.Router();

/// API WATSON ROUTES ///

// Send Facebook messages
router.post('/webhook', facebookController.messageController.sendMessage);

// Auth facebook app
router.get('/webhook', facebookController.messageController.getMessage);

// Home facebook wrapper
router.get('/', facebookController.homeController.home);

// Facebook Auth Acccount Link
router.get('/login', facebookController.authController.login)

module.exports = router;
