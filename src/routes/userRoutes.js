var express = require('express');
var router = express.Router();
const userController =  require("../controllers/userController");

/// AUTHOR ROUTES ///

// GET request for one User.
router.get('/:id', userController.getUser);

// // GET request for list of all User.
router.get('/list', userController.getUserList);

// // POST request for creating User.
router.post('/create', userController.createUser);

// // DELETE request User.
router.delete('/:id/delete', userController.removeUser);

// // GET request to update User.
router.put('/:id/update', userController.updateUser);


module.exports = router;
