require('dotenv').config({silent: true});

/**
 * Editable file
 * Configuration params, change the variables names
 * with the ones you have in the environment config
 */

// Environment variables
exports.ASSISTANT_URL= process.env.WATSON_ASSISTANT_URL;
exports.ASSISTANT_ID= process.env.WATSON_ASSISTANT_ID;

// IBM Cloud connection parameters
exports.ASSISTANT_IAM_KEY= process.env.WATSON_ASSISTANT_PASSWORD;
exports.ASSISTANT_IAM_URL= process.env.WATSON_ASSISTANT_IAM_URL;

exports.ASSISTANT_TIMEOUT = 12000;