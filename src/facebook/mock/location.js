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


const locations = {
    'Región VI-1 o Suroccidente-1': {
        cities: ["Quetzaltenango", "San Marcos", "Sololá"],
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Quetzaltenango%2C_Guatemala.jpg/300px-Quetzaltenango%2C_Guatemala.jpg',
    },
    'Región VI-2 o Suroccidente-2': {
        cities: ["Retalhuleu", "Suchitepéquez", "Totonicapán"],
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Guatemala_town_volcanic_crater.jpg/250px-Guatemala_town_volcanic_crater.jpg',
    },
    "Región I o Metropolitana":	{
        cities: ["Guatemala"],
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Streets_in_Guatemala_City.jpg/300px-Streets_in_Guatemala_City.jpg',
    },
    "Región VII o Noroccidente": {
        cities: ["Huehuetenango", "Quiché"],
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Huehuetenango.jpg/350px-Huehuetenango.jpg',
    },
    "Región V o Central": {
        cities: ["Chimaltenango", "Sacatepéquez", "Escuintla"],
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Mixco_Viejo.jpg/250px-Mixco_Viejo.jpg',
    },
    "Región II o Verapaz": {
        cities: ["Alta Verapaz", "Baja Verapaz"],
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Semuc_Champey.JPG/250px-Semuc_Champey.JPG',
    },
    "Región III o Nororiente": {
        cities: ["Chiquimula", "El Progreso", "Izabal o Zacapa"],
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Chiquimula-Collage.jpg/300px-Chiquimula-Collage.jpg',
    },
    "Región IV o Suroriente": {
        cities: ["Jutiapa", "Jalapa", "Santa Rosa"],
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Jutiapa_Department%2C_Guatemala_-_panoramio_%283%29.jpg/250px-Jutiapa_Department%2C_Guatemala_-_panoramio_%283%29.jpg',
    },
    "Región VIII o Petén": {
        cities: ["Petén"],
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Flickr_-_archer10_%28Dennis%29_-_Guatemala-1619.jpg/250px-Flickr_-_archer10_%28Dennis%29_-_Guatemala-1619.jpg',
    }
}

const renderElements = (region, {cities, image}) => ({
    
    title: region,
    image_url:image,
    buttons: cities.map(renderButtons)
})

const renderButtons = (city) => ({
    "payload": JSON.stringify({title: city, value: city}),
    "type":"postback",
    "title": city,
})


module.exports = (carouselObject) => ({
    message: {
        "attachment":{
            "type":"template",
            "payload":{
                "template_type":"generic",
                "elements": Object.keys(locations).map(location => renderElements(location, locations[location])),
            }
        }
    }
})

