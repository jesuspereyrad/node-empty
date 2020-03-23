const facebookApi = require('./api');
const watsonServices = require('../watson/services');
const helper = require("./components/helper");

exports.verifySession = (session=undefined) => {
  if(session !== undefined) {
    return session;
  } 
  return watsonServices.getSession()
}

const getResultByType = (response) => {
  const result = response.result.output.generic[0];
  return ({
    image: result.source,
    text: result.text,
    option: ({title:result.title, options:result.options}),
    carousel: result,
  })
}

exports.sendToAssistant = (session, event) => {
  return new Promise((resolve, reject) => {
    this.verifySession(session)
    .then((validSessionId) => {
      console.log(event.message.text);
      watsonServices.sendMessage(validSessionId.result.session_id, event.message.text, 'text')
      .then((response) => {
        console.log("response", response);
        const type = response.result.output.generic[0].response_type;
        return resolve(facebookApi(helper(event, type, getResultByType(response)[type])))
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