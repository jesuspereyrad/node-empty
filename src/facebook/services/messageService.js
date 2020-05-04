const CONFIG = require('../config');
const {handleMessage, handlePostback, handleAccountLink, handleThreadControl}  = require('../webhooks');

// Incoming events handling

/**
 * Validation token with facebook.
 *
 * @param   {Object}           input - Account Token for facebook
 * @returns {String}
 */
exports.validateWebhook = (input) => {
  console.log("input", input);
  return new Promise((resolve, reject) => {
    if (input['hub.mode'] === 'subscribe' && input['hub.verify_token'] === CONFIG.VERIFY_TOKEN) {
      return resolve(input['hub.challenge']);
    } else {
      return reject({code: 500, err: "Failed validation. Make sure the validation tokens match."});
    }
  })
};

/**
 *  Creates the endpoint for our webhook.
 *
 * @param   {Object}           body - The object to send message or postback to facebook 
 * @returns {String}
 */
exports.receivedMessage = (body) => {
  if (body.object === 'page') {
    // Iterate over each entry - there may be multiple if batched
    body.entry.forEach(function(entry) {
      // Iterate over each messaging event

      if(entry && entry.standby) {
        entry.standby.map(element => {
          console.log("sender", element.sender)
          console.log("recipient", element.recipient)
          console.log("message", element.message)
        })

      }

      if(entry && entry.messaging && entry.messaging[0]) { 
      // Gets the body of the webhook event
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);

      // Get the sender PSID
      let sender_psid = webhook_event.sender.id;
      console.log('Sender PSID: ' + sender_psid);

      // Check if the event is a message or postback and
      // pass the event to the appropriate handler function
      if (webhook_event.message && webhook_event.message.quick_reply) {
        handlePostback(sender_psid, webhook_event.message.quick_reply);
        return ({code: (200), data: ('POSTBACK_RECEIVED')})
      }
      
      if (webhook_event.message) {
        handleMessage(sender_psid, webhook_event.message);        
        return ({code: (200), data: ('EVENT_RECEIVED')})
      } else if (webhook_event.postback) {
        handlePostback(sender_psid, webhook_event.postback);
        return ({code: (200), data: ('POSTBACK_RECEIVED')})
      } else if (webhook_event.account_linking) { // eslint-disable-line camelcase, max-len
        handleAccountLink(sender_psid, webhook_event.account_linking);
        return ({code: (200), data: ('POSTBACK_RECEIVED')})
      } else if (webhook_event.pass_thread_control) {
        handleThreadControl(sender_psid, webhook_event.pass_thread_control)
        return ({code: (200), data: ('PASS THREAD CONTROL RECEIVED')})
      } else if(webhook_event){
        return ({code: 403, err: `Webhook received unknown event: ${webhook_event}`});
      } else {
        return ({code: 403, err: `Webhook did not received event: ${body.Object}`});
      }
    }
    });
  };
};
   