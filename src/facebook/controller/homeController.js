
/**
 * Home Controller to display home site.
 *
 * @param   {Request}          req - The request html payload from the routes
 * @param   {Response}         res - The response httml to the route
 * @returns {null}
 */
exports.home = (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  var messengerButton = "<html><head><title>Facebook Messenger Bot</title></head><body><h1>Facebook Messenger Bot</h1>This is a bot based on Messenger Platform QuickStart. For more details, see their <a href=\"https://developers.facebook.com/docs/messenger-platform/guides/quick-start\">docs</a>.<script src=\"https://button.glitch.me/button.js\" data-style=\"glitch\"></script><div class=\"glitchButton\" style=\"position:fixed;top:20px;right:20px;\"></div></body></html>";
  res.write(messengerButton);
  res.end();
};