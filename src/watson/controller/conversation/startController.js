const services = require('../../services')

/**
 * Conversation Start Controller
 * 
 * Get the data to start a conversation and then call conversation start service
 * to handle the request action.
 */
exports.module = (req, res) => {
    const {channel = "", tenant = "", email = "", preview = "", data = undefined} = req.body;
    if(data) {
        services.conversation.startSevice(data, channel, tenant, email, preview)
        .then((data) => {
          return res.send(data)
        })
        .catch((err) => {
          return res.status(err.code).send(err); 
        })
    }
    // If data doesn't exist return error 500 with request data not found
    return res.status(500).send("Request data not found")
  };