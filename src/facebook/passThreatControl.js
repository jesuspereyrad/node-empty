'use strict';
const request = require('request');
const CONFIG = require('./config');

/**
 * The Pass Thread Control API of the handover protocol is used to pass control of a conversation from one app to another. 
 * The calling app can pass optional metadata to the receiving app in the API request. 
 * When thread control is passed to an app, the pass_thread_control webhook event will be sent to that app's webhook.
 * 
 * Read more at https://developers.facebook.com/docs/messenger-platform/handover-protocol/
 *
 * @param   {String}          sender_psid - Specific user id to send data to
 * @param   {Object|Object[]} messageData - Payloads to send
 * @returns {undefined}
 */
module.exports = (sender_psid, messageData) => {
    const request_body = {
      recipient: {
        id:sender_psid,
      },
      target_app_id:263902037430900,
      metadata:"El bot no pudo responder la pregunta" 
    }
  
    request({
      uri: `https://graph.facebook.com/v6.0/me/pass_thread_control`,
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