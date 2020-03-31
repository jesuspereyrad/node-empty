# Facebook Connector

The Facebook Messenger Connector. Can get messaes from your facebook page and send response to it by different
mechanisims, like (bots, automatically response, etc)


## STRUCTURE
* facebook
  * components
  * controller
  * routes
  * services
  * utils
  * webhooks
  * api.js
  * config.js
  * connector.js
  * index.js

## CONFIG.JS

The only file that should be edited to let facebook works in your server.
* Webhook configuration
  * PAGE_ACCESS_TOKEN
  * VERIFY_TOKEN
  * FACEBOOK_URI

## CONNECTOR.JS

This file will let you connect facebook messenger with a chat-bot. The connector should be change thinking in as
the only place where facebook api will know the what chat bot we will used. In the example we connect facebook
messenger with Watson Assistant.

## COMPONENTS ARCHIVE

This archive has all the different output structure required to present the response in the Facebook Messenger. 


## Challenge

Create a connector to handle the response with google dialog flow instead of watson assistant.

## Facebook Documentation
Please visit https://developers.facebook.com/docs/messenger-platform/introduction for more information
