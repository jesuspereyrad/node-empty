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
const getResultByType = (result) => {
  // const result = response.result.output.generic[0];
  const type = ({
    image: result.source,
    text: result.text,
    option: ({title:result.title, options:result.options}),
    carousel: result,
    pause: result,
    suggestios: result,
    error: result,
    carousel: result.elements,
    SingIn: result.text,
    SingOut: ({title:result.title, options:result.options}),
    PassThread: result,
    button: result,
    link: result,
  })

  return type[result.response_type];
}

// /**
//  * Map the result from Actions in Watson Assistant to Facebook Messenger .
//  *
//  * @param   {String}          response - Watson json response
//  * @returns {Object}
//  */
// const getResultByTypeAction = (result) => {
//   const actions =  ({
//     carousel: result.elements,
//     SingIn: result.text,
//     SingOut: ({title:result.title, options:result.options}),
//     PassThread: result,
//     button: result,
//     image: result.source,
//     text: result.text,
//     option: ({title:result.title, options:result.options}),
//     carousel: result,
//     pause: result,
//     suggestios: result,
//     error: result,
//   })

//   return actions[result.response_type];
// }



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
        console.log("responses", response)
        if(response && response.components && response.components.length > 0) {
          responses = response.components.map(component => components[component.response_type](getResultByType(component)))
          return resolve(responses)
        }
        // if(response.result.output.user_defined && response.result.output.user_defined.actions !== undefined) {
        //   responses = response.result.output.user_defined.actions.map(action =>  components[action.response_type](getResultByType(action)))
        //   // const actions = response.result.output.user_defined.actions[0];
        //   // const type = actions.response_type;
        //   // return resolve(components[type](getResultByTypeAction(action)))
        //   console.log("responses", responses)
        //   return resolve(responses)
          
        // } else {
        //   if(response.result.output && response.result.output.generic[0] && response.result.output.generic[0].response_type) {
        //     responses = response.result.output.generic.map(generic =>  components[generic.response_type](getResultByType(generic)))
        //     return resolve(responses)
        //   }
        //   return resolve(components['error']())
        // }
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