const uuid = require('uuid');

/**
 * Auth Link Service to secure business account with Facebook Messenger.
 *
 * @param   {Object}           data - Account Token and the redirect link 
 * @returns {String}
 */
exports.login = (data) => {
  /*
    The auth code can be any thing you can use to uniquely identify a user.
    Once the redirect below happens, this bot will receive an account link
    message containing this auth code allowing us to identify the user.

    NOTE: It is considered best practice to use a unique id instead of
    something guessable like a users username so that malicious
    users cannot spoof a link.
   */
  const authCode = uuid();

  const accountLinkingToken = data.account_linking_token;

  const redirectURI = data.redirect_uri;

  // res.render('login', {accountLinkingToken, redirectURI});

    // Redirect users to this URI on successful login
  return `${redirectURI}&authorization_code=${authCode}`;
};


exports.logout = (body) => {
  return reject({code: 500, err: "Failed validation. Make sure the validation tokens match."});
};
   