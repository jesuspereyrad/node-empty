const Button  = require('./button');

/**
 * Template Carousel to send to Facebook graph API.
 *
 * @param   {Object}          carouselObject - The structure with all the props for the carousel
 * @returns {Object}
 */
const renderCard = (carouselObject) => ({
  title: carouselObject.title,
  image_url: carouselObject.image_url,
  subtitle: carouselObject.subtitle,
  default_action: {
      type: carouselObject.default_action.type,
      url: carouselObject.default_action.url,
      webview_height_ratio: "tall",
  },
  buttons: carouselObject.buttons.map(button => Button[button.type](button))
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