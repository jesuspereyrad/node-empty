const {authService} = require('../services');
 
/**
 * Login Controller send payload to login service and return the value.
 *
 * @param   {Request}          req - The request html payload from the routes
 * @param   {Response}         res - The response httml to the route
 * @returns {null}
 */
exports.login = (req, res) => {
    redirectURISuccess = authService.login(req.query)
    res.redirect(redirectURISuccess)
}