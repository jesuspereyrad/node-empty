const {messageService} = require('../services');

/**
 * Get Message Controller from the Facebook Graph API send payload to login service and return the value.
 *
 * @param   {Request}          req - The request html payload from the routes
 * @param   {Response}         res - The response httml to the route
 * @returns {null}
 */
exports.getMessage = (req, res) => {
    messageService.getMessage({...req.query})
      .then((data) => res.status(200).send(data))
      .catch((err) => res.status(403).send(err))
};
  
/**
 * Send Message payload to the Facebook Graph Api service and return the value.
 *
 * @param   {Request}          req - The request html payload from the routes
 * @param   {Response}         res - The response httml to the route
 * @returns {null}
 */
exports.sendMessage = (req, res) => {
    messageService.sendMessage(req.body)
    res.sendStatus(200)
}
