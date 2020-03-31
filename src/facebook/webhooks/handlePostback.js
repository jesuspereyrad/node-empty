'use strict';
const callSendAPI = require('../api')

/**
 * Handles messaging_postbacks events
 * Postbacks occur when a postback button, Get Started button, or persistent menu item is tapped.
 * Read More at: https://developers.facebook.com/docs/messenger-platform/reference/webhook-events/messaging_postbacks
 * 
 * @param   {String}          sender_psid - Specific user id to send data to
 * @param   {Object}          received_postback - The payload from the request 
 * @returns {Array[String]}
 */
exports.handlePostback = async (sender_psid, received_postback) => {
  let response;
  console.log("Payload", received_postback.payload)
  // Get the payload for the postback
  let payload = JSON.parse(received_postback.payload);

  console.log("Payload", payload.value)

  response = {message: {"text": "No tenemos disponible cerca de usted" }}
  // Set the response based on the postback payload 
//   if (payload.value === 'Guatemala') {
//     response = location2();
//   } else if (payload.value === 1) {
//     response = await finalResponse(payload.city, payload.zone);
//   } else {
//     response = {message: {"text": "No tenemos disponible cerca de usted" }}
//   }
  // Send the message to acknowledge the postback
  callSendAPI(sender_psid, response);
}