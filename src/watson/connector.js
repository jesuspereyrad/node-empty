

const AssistantV2 = require('ibm-watson/assistant/v2')
const CONFIG = require('./config')
const { IamAuthenticator, BearerTokenAuthenticator } = require('ibm-watson/auth');

// Authenticator function, choose the way to connect with the ibm watson assistant.
const authenticator = () => {
  if (CONFIG.ASSISTANT_IAM_KEY) {
    return {
      authenticator: new IamAuthenticator({apikey: CONFIG.ASSISTANT_IAM_KEY})
    }
  } else if (process.env.BEARER_TOKEN) {
    return {
      authenticator: new BearerTokenAuthenticator({bearerToken: CONFIG.BEARER_TOKEN})
    }
  } else if (CONFIG.ASSISTANT_ID && CONFIG.ASSISTANT_IAM_KEY) {
    return {
      username: CONFIG.ASSISTANT_ID,
      password: CONFIG.ASSISTANT_IAM_KEY
    }
  }
}

/**
 * Set the Watson Assistant connection
 * 
 * Complete the url, and authentication in the .env file 
 * 
 * */ 

exports.WatsonAssistantConnection = () => {
  try {
    return new AssistantV2({
        version: '2019-02-28',
        AssistantV2,
        ...authenticator(),
        url: CONFIG.ASSISTANT_URL,
        timeout: CONFIG.ASSISTANT_TIMEOUT,
        disableSslVerification: process.env.DISABLE_SSL_VERIFICATION === 'true' ? true : false,
        headers: {'X-Watson-Learning-Opt-Out': 'false'}
    });
  } catch (error) {
    console.log('error', `file:conversation -function: assistantInstant - error: ${error}`);
  }
}


