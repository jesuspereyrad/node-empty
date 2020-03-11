const userModel = require('../models/userModel');

// Create user in our database
exports.createUser = function(payload) {
  console.log('payload', payload);
    userModel.create({ payload }, function (err, awesome_instance) {
        if (err) return handleError(err);
        // saved!
    });
}