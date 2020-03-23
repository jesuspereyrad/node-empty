const services = require('../services');

// Incoming events handling

// Validation token with facebook
exports.getMessage = (req, res) => {
  services.getMessage({...req.query})
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(403).send(err))
};

exports.sendMessage = (req, res) => {
  services.sendMessage(req.body)
  res.sendStatus(200)
    // .catch((err) => res.status(err.code).send(err.err))
}

exports.home = (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  var messengerButton = "<html><head><title>Facebook Messenger Bot</title></head><body><h1>Facebook Messenger Bot</h1>This is a bot based on Messenger Platform QuickStart. For more details, see their <a href=\"https://developers.facebook.com/docs/messenger-platform/guides/quick-start\">docs</a>.<script src=\"https://button.glitch.me/button.js\" data-style=\"glitch\"></script><div class=\"glitchButton\" style=\"position:fixed;top:20px;right:20px;\"></div></body></html>";
  res.write(messengerButton);
  res.end();
};