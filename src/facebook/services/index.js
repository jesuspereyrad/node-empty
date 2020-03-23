const CONFIG = require('../config');
const connector = require('../connector');

// Incoming events handling

// Validation token with facebook
exports.getMessage = (input) => {
  return new Promise((resolve, reject) => {
    if (input['hub.mode'] === 'subscribe' && input['hub.verify_token'] === CONFIG.VERIFY_TOKEN) {
      return resolve(input['hub.challenge']);
    } else {
      return reject({code: 500, err: "Failed validation. Make sure the validation tokens match."});
    }
  })
};

exports.sendMessage = (data) => {
    // Make sure this is a page subscription
    console.log('entry', data.entry[0].messaging)
    if (data.object === 'page') {
      // Iterate over each entry - there may be multiple if batched
      data.entry.forEach(function(entry) {
        // Iterate over each messaging event
        entry.messaging.forEach(function(event) {
          if (event.message) {
            console.log("Received message");
            var sessionId = undefined;
            connector.sendToAssistant(sessionId, event)
            .then((data) => {
              console.log('data', data)
              return (data);
            })
            .catch((err) => {
              const status = err.code !== undefined && err.code > 0 ? err.code : 500;
              return ({code: status, description: err});
            })            
          } else {
            return ({code: 403, err: `Webhook received unknown event: ${event}`});
          }
      });
    });
  };
};
   