var CONFIG = require('../config')

/**
 * Template Image to send to Facebook graph API.
 *
 * @param   {string}          text - The title to complete auth
 * @returns {Object}
 */
module.exports = (text) => ({
    message:{
        attachment:{
          type:"template",
          payload:{
            template_type:"button",
            text:"Por favor inicia sesion para completar la solicitud",
            
            buttons:[
                {
                    "type": "account_link",
                    "url": CONFIG.LOGIN_URI,
                }
            ]
        }
    }
}
})

