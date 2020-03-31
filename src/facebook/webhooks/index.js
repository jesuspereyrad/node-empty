var handleAccountLink = require('./handleAccountLink');
var handleMessage = require('./handleMessage');
var handlePostback = require('./handlePostback');


/**
 * Webhooks allows you to receive real-time HTTP notifications of changes to specific objects in the Facebook Social Graph.
 * The Messenger Platform sends events to your webhook to notify your bot when a variety of interactions or events happen, 
 * including when a person sends a message. Webhook events are sent by the Messenger Platform as POST requests to your webhook.
 * 
 * Read More at: https://developers.facebook.com/docs/messenger-platform/webhook#development-mode
 */

module.exports = {
    handleAccountLink,
    handleMessage,
    handlePostback    
}