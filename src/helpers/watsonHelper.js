
import AssistantV2 from 'ibm-watson/assistant/v2'

// Authenticator function, choose the way to connect with the ibm watson assistant.
const authenticator = () => {
  if (process.env.ASSISTANT_IAM_APIKEY) {
    return {
      authenticator: new IamAuthenticator({apikey: process.env.ASSISTANT_IAM_APIKEY})
    }
  } else if (process.env.BEARER_TOKEN) {
    return {
      authenticator: new BearerTokenAuthenticator({bearerToken: process.env.BEARER_TOKEN})
    }
  } else if (process.env.ASSISTANT_USERNAME && process.env.ASSISTANT_PASSWORD) {
    return {
      username: process.env.ASSISTANT_USERNAME,
      password: process.env.ASSISTANT_PASSWORD
    }
  }
}

/**
 * Set the Watson Assistant connection
 * 
 * Complete the url, and authentication in the .env file 
 * 
 * */ 

export const WatsonAssistantConnection = () => {
  try {
    return new AssistantV2({
        version: '2019-02-28',
        AssistantV2,
        ...authenticator,
        url: process.env.ASSISTANT_URL,
        timeout: process.env.ASSISTANT_TIMEOUT,
        disableSslVerification: process.env.DISABLE_SSL_VERIFICATION === 'true' ? true : false,
        headers: {'X-Watson-Learning-Opt-Out': 'false'}
    });
  } catch (error) {
    logger.log('error', `file:conversation -function: assistantInstant - error: ${error}`);
  }
} 
