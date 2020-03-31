/**
 * Template Image to send to Facebook graph API.
 *
 * @param   {string}          imageUrl - The url that display the image
 * @returns {Object}
 */
module.exports = (imageUrl) => ({
    message: {
        attachment: {
            type: "image",
            payload: {
                url: imageUrl,
                is_reusable: true,
            }
        }
    } 
})