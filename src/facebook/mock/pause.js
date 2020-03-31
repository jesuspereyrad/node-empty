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

module.exports = (carouselObject) => ({
    message: {
        "attachment":{
            "type":"template",
            "payload":{
                "template_type":"generic",
                "elements":[
                    {
                    "title":"Tarjeta Lago!",
                    "image_url":"https://www.corporacionbi.com/assets/img/_2rFuMKlago.jpg",
                    "subtitle":"La tarjeta prepago Bi Credit es la solución perfecta cuando se busca tener seguridad, control y flexibilidad.  Puede funcionar como una caja chica en donde sólo se deposita la cantidad de dinero que se desea utilizar en un período determinado o para una compra determinada. ",
                    "default_action": {
                        "type": "web_url",
                        "url":"https://www.corporacionbi.com/gt/bancoindustrial/tarjeta-lago",
                        "webview_height_ratio": "tall",
                    },
                    "buttons":[
                        {
                        "type":"web_url",
                        "url":"https://www.corporacionbi.com/gt/bancoindustrial/tarjeta-lago",
                        "title":"Ver Tarjeta"
                        },           
                    ]      
                    },
                    {
                        "title":"Tu Billetera",
                        "image_url":"https://www.corporacionbi.com/assets/img/_sF4E3r4.3.3%20Tu%20Billetera.jpg",
                        "subtitle":"Es un monedero electrónico internacional VISA manejar efectivo de manera más segura y fácil.",
                        "default_action": {
                        "type": "web_url",
                        "url":"https://www.corporacionbi.com/gt/bancoindustrial/tu-billetera",
                        "webview_height_ratio": "tall",
                        },
                        "buttons":[
                        {
                            "type":"web_url",
                            "url":"https://www.corporacionbi.com/gt/bancoindustrial/tu-billetera",
                            "title":"Ver Tarjeta"
                        },
                        ]      
                    },
                    {
                        "title":"TCard",
                        "image_url":"https://www.corporacionbi.com/assets/img/_hVbXRcbanco-industrial-tcard.png",
                        "subtitle":"TCard es una Tarjeta Prepago con la cual los jóvenes (13 a 17 años) aprenden a administrar su presupuesto, además es una tarjeta internacional que puede ser utilizada en dólares o quetzales.",
                        "default_action": {
                        "type": "web_url",
                        "url":"https://www.corporacionbi.com/gt/bancoindustrial/tu-billetera",
                        "webview_height_ratio": "tall",
                        },
                        "buttons":[
                        {
                            "type":"web_url",
                            "url":"https://www.corporacionbi.com/gt/bancoindustrial/tu-billetera",
                            "title":"Ver Tarjeta"
                        },
                        ]      
                    }
                ]
            }
        }
    }
})

