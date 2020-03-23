# Watson

The Watson module is a wrapper that set the Watson Assistant connection and manage all the responsabilities related to
the watson assistant (Start conversation, Set Session, End conversation).

The purpose of having watson separate of the app.js is trying to decoupling everything, making as tiny as possible to give
single responsabilities. The app.js only responsability is connect the services together, but is not responsible of what 
watson version or watson authentication I am using.

## Structure
* Watson
  * controller
  * routes
  * services
  * webhooks
  * actions
  config.js
  api.js
  index.js
  
## CONFIG FILE

Config File should be the only edit file.

Authentication methods:
  WATSON_ASSISTANT_URL;
  WATSON_ASSISTANT_ID;
  WATSON_ASSISTANT_PASSWORD;
  ATSON_ASSISTANT_IAM_URL;

Timeout variable
  WATSON_ASSISTANT_TIMEOUT;
