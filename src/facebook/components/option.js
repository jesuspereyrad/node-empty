const Button = require('./button');

/**
 * Template Image to send to Facebook graph API.
 *
 * @param   {Object}          optionObject - The structure with all the props for the option
 * @returns {Object}
 */
module.exports = (optionObject) => ({
    messaging_type: "RESPONSE",
    message: {
        text: optionObject.title,
        quick_replies: optionObject.options.map(option => Button["text"]({title: option.label, value: option.value}))
    }
})
