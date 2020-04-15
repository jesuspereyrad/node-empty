'use strict';
const callSendAPI = require('../api')
const connector = require('../connector');

/**
 * Handles messages events
 * This callback will occur when a message has been sent to your Page. Messages are always sent in order. 
 * You may receive text messages or messages with attachments.
 * Read More at: https://developers.facebook.com/docs/messenger-platform/reference/webhook-events/messages
 *
 * @param   {String}          sender_psid - Specific user id to send data to
 * @param   {Object}          received_message - The payload from the request 
 * @returns {Array[String]}
 */
module.exports = (sender_psid) => {

  // Check if the message contains text
    connector.getFacebookTemplate({text: "Transferir a bot"}, sender_psid)
    .then((data) => {
      // Sends the response message
      return callSendAPI(sender_psid, data);    
    })
    .catch((err) => {
      const status = err.code !== undefined && err.code > 0 ? err.code : 500;
      return ({code: status, description: err});
    })
}