const request = require('request');
const Promise = require('promise');

// callback method:

// const geocode = (address, callback) => {
//     const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicGhhbnRvbTIyIiwiYSI6ImNqdno2YnhzaDBjaXU0OG80YWlvMTF2ZWcifQ.5YbIYs5C2-NYuxBTJ_0CLQ&limit=1';
//     request({url: url, json: true}, (error, response) => {
//         if(error){
//             callback('Unable to connect to servers!', undefined);
//         } else if(response.body.message || response.body.features.length === 0){
//             callback('Not found', undefined);
//         } else {
//             const data = response.body;
//             callback(undefined, {
//                 Longitude: data.features[0].center[0],
//                 Latitude : data.features[0].center[1],
//                 Place: data.features[0].place_name
//             });
//         }
//     });
// };

const geocode = (address) => {
    return new Promise((resolve, reject) => {
        const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicGhhbnRvbTIyIiwiYSI6ImNqdno2YnhzaDBjaXU0OG80YWlvMTF2ZWcifQ.5YbIYs5C2-NYuxBTJ_0CLQ&limit=1';
        request({url, json: true}, (error, {body}) => {
            if(error){
                reject('Unable to connect to servers!');
            } else if(body.message || body.features.length === 0){
                reject('Not found');
            } else {
                
                resolve({
                    Longitude: body.features[0].center[0],
                    Latitude : body.features[0].center[1],
                    Place: body.features[0].place_name
                });
            }
        });
    });
};

const reverseGeocode = (latitude, longitude) => {
    return new Promise((resolve, reject) => {
        const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + longitude + ',' + latitude + '.json?access_token=pk.eyJ1IjoicGhhbnRvbTIyIiwiYSI6ImNqdno2YnhzaDBjaXU0OG80YWlvMTF2ZWcifQ.5YbIYs5C2-NYuxBTJ_0CLQ&limit=1';
        request({url, json: true}, (error, {body}) => {
            if(error){
                reject('Unable to connect to servers!');
            } else if(body.features.length === 0){
                reject('Not found');
            } else {
                
                resolve({
                    Place: body.features[0].place_name
                });
            }
        });
    })
}


module.exports = {
    geocode,
    reverseGeocode
}
