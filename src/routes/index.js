var express = require('express');
var router = express.Router();
const userRoutes = require("./userRoutes");
// const foodRouteS = require("./foodRoutes");

/** Routes
 * 
 * Route handle the communication between the outside world and the api
 * 
 */

router.use('/user/', userRoutes);


module.exports = router;
