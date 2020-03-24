exports.module = {
  "recipient":{
    "id":"<PSID>"
  },
  "message":{
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
                    },{
                    "type":"postback",
                    "title":"Start Chatting",
                    "payload":"DEVELOPER_DEFINED_PAYLOAD"
                    }              
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
                    },{
                        "type":"postback",
                        "title":"Start Chatting",
                        "payload":"DEVELOPER_DEFINED_PAYLOAD"
                    }              
                    ]      
                }
            ]
        }
    }
    }
}