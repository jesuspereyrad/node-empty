var sendText = require('./text');
var sendImage = require('./image');
var sendOption = require('./option');
var sendCarousel = require('./carousel');
var sendPause = require('./pause');

module.exports = {
    text: sendText,
    image: sendImage,
    option: sendOption,
    carousel: sendCarousel,
    pause: sendPause,
}