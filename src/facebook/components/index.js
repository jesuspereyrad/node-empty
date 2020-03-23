var sendText = require('./text');
var sendImage = require('./image');
var sendOption = require('./option');
var sendCarousel = require('./carousel');

module.exports = {
    text: sendText,
    image: sendImage,
    option: sendOption,
    carousel: sendCarousel,
}