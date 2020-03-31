const watsonServices = require('../watson/services');
const components = require("./components");

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
  console.log("result", result);
  return ({
    image: result.source,
    text: result.text,
    option: ({title:result.title, options:result.options}),
    carousel: result,
    pause: result,
    suggestios: result,
  })
}

/**
 * Send messages to the Facebook API.
 *
 * @param   {String}          sender_psid - Specific user id to send data to
 * @param   {Object|Object[]} messageData - Payloads to send
 * @returns {undefined}
 */
exports.getFacebookTemplate = (message) => {
  const session = undefined;
  return new Promise((resolve, reject) => {
    verifySession(session)
    .then((validSessionId) => {
      console.log(message.text);
      watsonServices.sendMessage(validSessionId.result.session_id, message.text, 'text')
      .then((response) => {
        console.log("response", response);
        const type = response.result.output.generic[0].response_type;
        return resolve(components[type](getResultByType(response)[type]))
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