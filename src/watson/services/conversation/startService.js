const connector = require('../api');
const assistant = connector.WatsonAssistantConnection();
const CONFIG = require('../config');

// Display user update form on GET.
exports.getSession = () => {
    return new Promise((resolve, reject) => {
      assistant.createSession({assistantId: CONFIG.ASSISTANT_ID || '{assistant_id}'}, (err, response) => {
        if (err) {
          const status = err.code !== undefined && err.code > 0 ? err.code : 500;
          return reject({code: status, description: err});
        } else {
          return resolve(response);
        }
      })
    })
  };