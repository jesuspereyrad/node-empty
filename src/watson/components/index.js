var button = require('./button');
var carousel = require('./carousel');
var link = require('./link');
var options = require('./options');
var quickReply = require('../quickReply');

/**
 * Many types of unstructured content can be sent with the Messenger Platform, including text, audio, images, video, and files.
 * There are also a number of pre-defined message templates available that allow you to send structured messages
 * for a richer experience.
 * 
 * Read More at: https://developers.facebook.com/docs/messenger-platform/send-api-reference/templates
 */

module.exports = {
    carousel: carousel,
    options: options,
    quickReply: quickReply,
    button: button,
    link: link,
}