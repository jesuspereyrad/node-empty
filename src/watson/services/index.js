const connector = require('../api');
const assistant = connector.WatsonAssistantConnection();
const CONFIG = require('../config');


const processOutput = (response) => {
  console.log("response: ", response)

  const generic = response.result.output.generic;
  const actions = response.result.output.user_defined && response.result.output.user_defined.actions ? response.result.output.user_defined.actions : [];
  let genericCp = generic;
  let actionsCp = [];
  if (actions) {
    actions.map(action => {
      if(action.response_index === 0) {
        genericCp = [action, ...genericCp]
      }
      else if(action.response_index > 0) {
        genericCp = [...genericCp.slice(0, action.response_index + 1), action, ...genericCp.slice(action.response_index + 1, genericCp.length + 1)]
      } else {
        genericCp.push(action)
      }
    })
  }

  const formatedResponse = ({
    "components": genericCp,
    "actions": actionsCp
  })
  
  console.log("processResponse", JSON.stringify(formatedResponse))

  return formatedResponse;
}


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
    assistant.message(payload, (err, answer) => {
      if (err) {
        const status = err.code !== undefined && err.code > 0 ? err.code : 500;
        return reject({code: status, description: err});
      }
      return resolve(processOutput(answer));
    });
  })
}

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
