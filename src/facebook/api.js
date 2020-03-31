'use strict';
const request = require('request');
const CONFIG = require('./config');

/**
 * Send messages to the Facebook graph API.
 *
 * @param   {String}          sender_psid - Specific user id to send data to
 * @param   {Object|Object[]} messageData - Payloads to send
 * @returns {undefined}
 */
module.exports = (sender_psid, messageData) => {
  let request_body = {
    recipient: {
      id: sender_psid
    },
    ...messageData
  }

  request({
    uri: CONFIG.FACEBOOK_URI,
    qs: { access_token: CONFIG.PAGE_ACCESS_TOKEN },
    method: 'POST',
    json: request_body

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