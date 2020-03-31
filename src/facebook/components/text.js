const urlHandle = require("../utils/urlHandle")
const button = require('./button');

/**
 * Template text to send to Facebook graph API.
 *
 * @param   {string}          text - The text you want to send.
 * @returns {Object}
 */
const textTemplate = (text) => ({
  message: {
    text,
  }
})

/**
 * Template Image to send to Facebook graph API.
 *
 * @param   {string}          text - The text you want to send.
 * @param   {Array[Object]}   buttonList - An array of element with structure data to render a button.
 * @returns {Object}
 */
const textLinkTemplate = (text, buttonList) => ({
  message: {
    attachment: {
      type: "template",
      payload: {
        template_type: "button",
        text,
        buttons: buttonList.map((url) => button['web_url']({title: "Mas info aqui", url: url}))
      }
    }
  }
})

module.exports = (messageText) => {
  const urls = urlHandle.getUrlsFromString(messageText);
  console.log("urls", urls);
  if(urls && urls.length > 0) {
    return textLinkTemplate(urlHandle.removeUrlFromString(messageText), urls)
  }
  return textTemplate(messageText);
}
