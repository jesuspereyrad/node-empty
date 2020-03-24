const urlHandle = require("../utils/urlHandle")



const buttonAttachment = (url) => ({
  "type": "web_url",
  "url": url,
  "title": "Mas info aqui",
})

const checkButton = (messageText) => {
  const urls = urlHandle.getUrlsFromString(messageText);
  if(urls && urls.length > 0) {
    return textLinkTemplate(urlHandle.removeUrlFromString(messageText), urls)
  }
  return textTemplate(messageText);
}

//////////////////////////
// Text Template
//////////////////////////
const textTemplate = (messageText) => ({
  message: {
    text: messageText,
  }
})

//////////////////////////
// Text Link Template
//////////////////////////
const textLinkTemplate = (messageText, buttonList) => ({
  message: {
    attachment: {
      type: "template",
      payload: {
        template_type: "button",
        text: messageText,
        buttons: buttonList.map(buttonAttachment)
      }
    }
  }
})

module.exports = (recipientId, messageText) => ({
  recipient: {
    id: recipientId
  },
  ...checkButton(messageText)
})
