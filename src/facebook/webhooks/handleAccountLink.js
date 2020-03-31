'use strict';
const callSendAPI = require('../api')

/**
 * Account Link Event - This event is called when the Link Account
 * or Unlink Account action has been tapped. Read More at:
 * https://developers.facebook.com/docs/messenger-platform/webhook-reference/account-linking
 *
 * @param   {String}          sender_psid - Specific user id to send data to
 * @param   {Object}          received_postback - The payload from the request 
 * @returns {Array[String]}
 */
module.exports = (senderId, account_linking) => {
  /* eslint-disable camelcase */
  const status = account_linking.status;
  const authCode = account_linking.authorization_code;
  /* eslint-enable camelcase */

  console.log('Received account link event with for user %d with status %s ' +
    'and auth code %s ', senderId, status, authCode);

  switch (status) {
  case 'linked':
    // const linkedUser = UserStore.replaceAuthToken(authCode, senderId);
    // sendApi.sendSignInSuccessMessage(senderId, linkedUser.username);
    callSendAPI(senderId, {message: {text: "Ya estas autenticado!"}})
    break;
  case 'unlinked':
    // UserStore.unlinkMessengerAccount(senderId);
    // sendApi.sendSignOutSuccessMessage(senderId);
    callSendAPI(senderId, {message: {text: "Veulve pronto!"}})
    break;
  default:
    break;
  }
};