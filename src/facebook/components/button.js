const urlHandle = require("../utils/urlHandle")


/**
 * Template URL Buttons to send to Facebook graph API.
 *
 * @param   {String}          title - The placeholder for the button
 * @param   {string}          url - The redirected url
 * @returns {Object}
 */
const urlButton = ({title, url}) => ({
    type: "web_url",
    url,
    title,
})

/**
 * Template Postback Buttons to send to Facebook graph API.
 *
 * @param   {String}          title - The placeholder for the button
 * @param   {string}          payload - The payload for the postback
 * @returns {Object}
 */
const postbackButton = ({title, payload}) => ({
    type: "postback",
    payload,
    title,
})

/**
 * Template Quick Reply Buttons attached to the template to send to Facebook graph API.
 *
 * @param   {String}          title - The placeholder for the button
 * @param   {string}          url - The payload for the quickreply
 * @returns {Object}
 */
const renderButton = ({title, payload}) => ({
    content_type: "text",
    title: title,
    payload: JSON.stringify(...payload),
})

const renderSingleButton = (payload) => ({
    message: {
        attachment: {
            type: "template",
            payload: {
                template_type: "button",
                text: payload.text,
                buttons: payload.buttonType === 'postback' ? payload.buttons.map(postbackButton) : payload.buttons.map(urlButton)
            }
        }
    } 
})


module.exports = {
    text: renderButton,
    web_url: urlButton,
    postback: postbackButton,
    singleButton: renderSingleButton,
}
