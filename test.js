let request = require('request');
const Promise = require('promise');

const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoicGhhbnRvbTIyIiwiYSI6ImNqdno2YnhzaDBjaXU0OG80YWlvMTF2ZWcifQ.5YbIYs5C2-NYuxBTJ_0CLQ';
var promise = new Promise((resolve, reject) => {
    request({url, json: true}, (error, response) => {
    resolve(response);
});
});
promise.then((data) => {console.log(data)}).catch((error) => {console.log(error)})