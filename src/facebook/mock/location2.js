const zone = [
    "Guatemala",
    "Villa Nueva",
    "Mixco",
    "Santa Catarina Pinula",
    "San José Pinula",
    "San José del Golfo",
    "Palencia",
    "Chinautla",
    "San Pedro Ayampuc",
    "San Pedro Sacatepéquez",
    "San Juan Sacatepéquez",
    "San Raymundo",
    "Otros",
    // "Chuarrancho",
    // "Fraijanes",
    // "Amatitlán",
    // "Villa Canales",
    // "San Miguel Petapa",
]

const renderZones = (zone) => ({
    "content_type":"text",
    "title":zone,
    "payload": JSON.stringify({title: zone, city: zone, zone: zone, value: 1}),
    "image_url":"http://example.com/img/green.png"
})

module.exports = () => ({
    "messaging_type": "RESPONSE",
    "message":{
        "text": "Selecciona una zona:",
        "quick_replies": zone.map(renderZones)
    }
})