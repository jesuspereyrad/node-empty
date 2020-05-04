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
module.exports = (sender_psid, received_message) => {

  // Check if the message contains text
  if (received_message.text) {    
    // Create the payload for a basic text message
    connector.getFacebookTemplate(received_message, sender_psid)
    .then((dataBatch) => {
      console.log("databatch", JSON.stringify(dataBatch))
      dataBatch.map(data => callSendAPI(sender_psid, data))
    })
    .catch((err) => {
      const status = err.code !== undefined && err.code > 0 ? err.code : 500;
      return ({code: status, description: err});
    })
  }  
}