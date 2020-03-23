//
// This is main file containing code implementing the Express server and functionality for the Express echo bot.
//
'use strict';
const request = require('request');
const CONFIG = require('./config');
  
const callSendAPI = (messageData) => {
  request({
    uri: CONFIG.FACEBOOK_URI,
    qs: { access_token: CONFIG.PAGE_ACCESS_TOKEN },
    method: 'POST',
    json: messageData

  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var recipientId = body.recipient_id;
      var messageId = body.message_id;

      console.log("Successfully sent generic message with id %s to recipient %s", 
        messageId, recipientId);
    } else {
      console.error("Unable to send message.");
      console.error(response);
      console.error(error);
    }
  });  
}

module.exports = callSendAPI;