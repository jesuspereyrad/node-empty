var userService = require('../services/userService');

// Display list of all Users.
exports.getUserList = function(req, res) {
    res.send('NOT IMPLEMENTED: User list');
};

// Display user details.
exports.getUser = function(req, res) {
    res.send('NOT IMPLEMENTED: User detail: ' + req.params.id);
};

// Display user create form on GET.
exports.createUser = function(req, res) {
    const user = userService.createUser({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    })
    res.send(`User ${req.body.name} created!`);
};

// Display user delete form on GET.
exports.removeUser = function(req, res) {
    res.send('NOT IMPLEMENTED: User delete GET' + req.params.id);
};

// Display user update form on GET.
exports.updateUser = function(req, res) {
    res.send('NOT IMPLEMENTED: User update GET' + req.params.id);
};


