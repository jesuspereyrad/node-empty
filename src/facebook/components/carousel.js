//////////////////////////
// Carousel template
//////////////////////////

const renderButton = (button) => ({
    "type": button.type,
    "url": button.url,
    "title": button.title,
})

const renderCard = (carouselObject) => ({
  title: carouselObject.title,
  image_url: carouselObject.image_url,
  subtitle: carouselObject.subtitle,
  default_action: {
      type: web_url,
      url: carouselObject.default_action.url,
      webview_height_ratio: "tall",
  },
  buttons: carouselObject.button.map(button => renderButton(button))
}) 

module.exports = (recipientId, carouselObject) => ({
    recipient:{
        id: recipientId
    },
    message: {
        attachment: {
            type: "template",
            payload: {
                template_type: "generic",
                elements: carouselObject.map(option => renderCard(option)),
            }
        }
    } 
})