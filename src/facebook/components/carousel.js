const Button  = require('./button');

/**
 * Template Carousel to send to Facebook graph API.
 *
 * @param   {Object}          carouselObject - The json with all the props for the carousel
 * @returns {Object}
 */
const renderCard = (carouselObject) => ({
  title: carouselObject.title,
  image_url: carouselObject.image_url,
  subtitle: carouselObject.subtitle,
  default_action: {
      type: web_url,
      url: carouselObject.default_action.url,
      webview_height_ratio: "tall",
  },
  buttons: carouselObject.button.map(button => Button[button.type](button))
}) 

module.exports = (carouselObject) => ({
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