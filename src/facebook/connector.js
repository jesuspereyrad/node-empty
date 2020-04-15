const watsonServices = require('../watson/services');
const components = require("./components");
const passThreat = require('./passThreatControl');

/**
 * Verify Session with Watson Assistant.
 *
 * @param   {String}          session - Session Id from Watson assistant
 * @returns {String}
 */
const verifySession = (session=undefined) => {
  if(session !== undefined) {
    return session;
  } 
  return watsonServices.getSession()
}

/**
 * Map the result from Watson Assistant to Facebook Messenger .
 *
 * @param   {String}          response - Watson json response
 * @returns {Object}
 */
const getResultByType = (response) => {
  const result = response.result.output.generic[0];
  const type = ({
    image: result.source,
    text: result.text,
    option: ({title:result.title, options:result.options}),
    carousel: result,
    pause: result,
    suggestios: result,
    error: result,
  })

  return type[result.response_type];
}

/**
 * Map the result from Actions in Watson Assistant to Facebook Messenger .
 *
 * @param   {String}          response - Watson json response
 * @returns {Object}
 */
const getResultByTypeAction = (result) => {
  const actions =  ({
    carousel: result.elements,
    SingIn: result.text,
    SingOut: ({title:result.title, options:result.options}),
    PassThread: result,
  })

  return actions[result.response_type];
}



/**
 * Send messages to the Facebook API.
 *
 * @param   {String}          sender_psid - Specific user id to send data to
 * @param   {Object|Object[]} messageData - Payloads to send
 * @returns {undefined}
 */
exports.getFacebookTemplate = (message, sender_psid) => {
  const session = undefined;
  return new Promise((resolve, reject) => {
    verifySession(session)
    .then((validSessionId) => {
      console.log(message.text);
      watsonServices.sendMessage(validSessionId.result.session_id, message.text, 'text')
      .then((response) => {
        if(response.result.output.user_defined && response.result.output.user_defined.actions !== undefined) {
          const actions = response.result.output.user_defined.actions[0];
          const type = actions.response_type;
          return resolve(components[type](getResultByTypeAction(actions)))
        } else {
          if(response.result.output && response.result.output.generic[0] && response.result.output.generic[0].response_type) {
            const type = response.result.output.generic[0].response_type;
            return resolve(components[type](getResultByType(response)))
          }
          return resolve(components['error']())
        }
      })
      .catch((err) => {
        console.log("err", err);
        return reject(err);
      })
    })
    .catch((err) => {
      console.log("err", err);
      return reject(err);
    })
  })
}


exports.sendToChannel = (output) => {

}