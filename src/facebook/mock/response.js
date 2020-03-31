//////////////////////////
// Carousel template
//////////////////////////
const axios = require('axios');


const locations = {
    'Cajero BI 7a Avenida 11-15': {
        address: '7a Avenida 11-15, Guatemala 01001, Guatemala',
        schedule: '10am-6PM',
        tel: '+502 2411 6140',
        mapUrl: 'https://www.google.com/maps/place/Cajero+BI/@14.6363057,-90.5146884,16.8z/data=!4m8!1m2!2m1!1sguatemala+bi!3m4!1s0x0:0xdf84706f974fc359!8m2!3d14.6379171!4d-90.5129524',
        image: 'https://geo0.ggpht.com/cbk?panoid=qYbNgA-KWkWPQ7tf6iMRbA&output=thumbnail&cb_client=search.gws-prod.gps&thumb=2&w=408&h=240&yaw=110.66565&pitch=0&thumbfov=100',
    },
    'BI 7a Avenida, Guatemala': {
        address: '7a Avenida, Guatemala',
        schedule: '9am-5PM',
        tel: '',
        mapUrl: 'https://www.google.com/maps/place/BI/@14.6363057,-90.5146884,16.8z/data=!4m8!1m2!2m1!1sguatemala+bi!3m4!1s0x0:0x63d10b18f10080e3!8m2!3d14.6310839!4d-90.5137745',
        image: 'https://geo3.ggpht.com/cbk?panoid=ntPbNu8ZsxH6adLe4XwJEg&output=thumbnail&cb_client=search.gws-prod.gps&thumb=2&w=408&h=240&yaw=108.21105&pitch=0&thumbfov=100',
    },
}

const googleDetail = async (id) => {
    try {
        const data = await axios.post(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&fields=name,rating,opening_hours,adr_address,url,formatted_phone_number&key=AIzaSyA4RUEpS93jqpSk_HOsVwQF-pEJ7EbG32c`)
        return renderElements(data.data.result)

    } catch (error) {
        console.log(error); // catches both errors
    }
    // .then((response) => {
    //     console.log(response)
    //     return response.body.result
    // })
    // .catch(error => error)
    //   }, function (error, response, body) {
    //     if (!error && response.statusCode == 200) {
    //         // console.log(renderElements("google Detail", JSON.parse(body).result))
    //         return JSON.parse(body).then(result => result.result)

    //     } else {
    //       console.error("Unable to send message.");
    //       console.error(response);
    //       console.error(error);
    //       return []
    //     }
    // })
}

const googleMaps = async (city, zone) => {
    try {
        const data = await axios.post(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=Bi+${city}+${zone}&key=AIzaSyA4RUEpS93jqpSk_HOsVwQF-pEJ7EbG32c`)
        return data.data.results.slice(0,7)     .map(element => googleDetail(element.place_id))

    } catch (error) {
        console.log(error); // catches both errors
    }
    // .then((response) => response.body.results.map(result => googleDetail(result.place_id)))
    // .catch(error => error)
    // data.
    // return request({
    //     uri: ``,
    //     method: 'POST',
    //   }, function (error, response, body) {
    //     if (!error && response.statusCode == 200) {
    //         // console.log("google search", JSON.parse(body).results);
    //         return JSON.parse(body).then(result => result.results)
    //     } else {
    //       console.error("Unable to send message.");
    //       console.error(response);
    //       console.error(error);
    //       return []
    //     }
    //   });  
}

// address: '7a Avenida 11-15, Guatemala 01001, Guatemala',
//         schedule: '10am-6PM',
//         tel: '+502 2411 6140',
//         mapUrl: 'https://www.google.com/maps/place/Cajero+BI/@14.6363057,-90.5146884,16.8z/data=!4m8!1m2!2m1!1sguatemala+bi!3m4!1s0x0:0xdf84706f974fc359!8m2!3d14.6379171!4d-90.5129524',
//         image: 'https:

const renderElements = (location, {address, schedule, tel, mapUrl, image}) => {
    return ({
    title: location,
    subtitle: `Address: ${address}, Telefono: ${tel}, Horarios: ${schedule}}`,
    image_url: image,
    buttons: [
        {
            "type": "web_url",
            "url": mapUrl,
            "title": "Ver en Google Maps",
        } 
    ]
})
}

module.exports = async (city, zone) => {
    // const response = await googleMaps(city, zone);
    // console.log(response);
    return ({
    message: {
        "attachment":{
            "type":"template",
            "payload":{
                "template_type":"generic",
                "elements": Object.keys(locations).map(location => renderElements(location, locations[location])),
                // "elements": response
            }
        }
    }
})
}

