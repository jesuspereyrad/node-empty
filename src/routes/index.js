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

router.use('/test', function(req, res) {
    console.log('asd', req.body.params)
    res.status(200);
})

module.exports = router;
