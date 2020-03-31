require('dotenv').config({silent: true});

/**
 * Editable file
 * Configuration params, change the variables names
 * with the ones you have in the environment config
 */

// FACEBOOK variables
exports.PAGE_ACCESS_TOKEN= process.env.PAGE_ACCESS_TOKEN;
exports.ASSISTANT_WORKSPACEID= process.env.ASSISTANT_WORKSPACEID;
exports.VERIFY_TOKEN= process.env.VERIFY_TOKEN;
exports.ASSISTANT_ID= process.env.WATSON_ASSISTANT_ID;
exports.FACEBOOK_URI= process.env.FACEBOOK_URI;
exports.LOGIN_URI= process.env.LOGIN_URI;