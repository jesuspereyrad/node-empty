const connector = require('../api');
const assistant = connector.WatsonAssistantConnection();
const CONFIG = require('../config');



// Display list of all Users.
exports.sendMessage =  (sessionId, input='', messageType='text') => {
    const payload = {
      assistantId: CONFIG.ASSISTANT_ID || '<assistant-id>',
      sessionId: sessionId,
      input: {
        message_type: messageType,
        text: input,
      },
    };
  
    // Send the input to the assistant service
    return new Promise((resolve, reject) => {
      assistant.message(payload, (err, data) => {
        if (err) {
          const status = err.code !== undefined && err.code > 0 ? err.code : 500;
          return reject({code: status, description: err});
        }
        return resolve(data);
      });
    })
  }
  
  