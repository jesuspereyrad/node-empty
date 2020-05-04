
/**
 * Template hyperlink to send to Facebook graph API.
 *
 * @param   {string}          text - The title to complete auth
 * @returns {Object}
 */
module.exports = (payload) => ({
    message: {
        attachment: {
            type: "template",
            payload: {
                template_type: "generic",
                elements:[
                    {
                    title: payload.title,
                    subtitle: payload.subtitle,
                    default_action: {
                        type: "web_url",
                        url: payload.url,
                        },
                    }
                ]
            }
        }
    } 
})



