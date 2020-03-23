const facebookController =  require("../controller");
var express = require('express');
var router = express.Router();

/// API WATSON ROUTES ///

// Send webhook from fb to watson
router.post('/webhook', facebookController.sendMessage);

// GET webhook from watson to fb
router.get('/webhook', facebookController.getMessage);

// Init fb
router.get('/', facebookController.home);

module.exports = router;
