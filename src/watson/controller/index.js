const services = require('../services');
const request = require('request')

// Send message to assistant
exports.sendMessage = (req, res) => {
  services.sendMessage(req.body.session_id, req.body.text, 'text')
    .then((data) => {
      return res.json(data)
    })
    .catch((err) => {
      return res.status(err.code).json(err); 
    })
}

// Get user session
exports.getSession = (req, res) => {
  services.getSession()
    .then((data) => {
      return res.send(data)
    })
    .catch((err) => {
      return res.status(err.code).send(err); 
    })
};


// Get user session
exports.getWebhook = (req, res) => {
  console.log("webhook", req.body.webhook_option);
  console.log("payload", req.body.payload);
  
  request({
    uri: "https://maps.googleapis.com/maps/api/place/textsearch/json?query=donde esta ubicado banco industrial avenida las americas&key=AIzaSyA4RUEpS93jqpSk_HOsVwQF-pEJ7EbG32c",
    // qs: {query: req.body.payload, key: 'AIzaSyA4RUEpS93jqpSk_HOsVwQF-pEJ7EbG32c', },
    method: 'POST',

  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      results = JSON.parse(body).results
      console.log("Successfully sent generic message %s, body: %s", response, results.toString());
    } else {
      console.error("Unable to send message.");
      console.error(response);
      console.error(error);
    }
  });

  return res.status(200).send('text: good');
};