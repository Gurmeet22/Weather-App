const request = require('request');
const darkurl = 'https://api.darksky.net/forecast/897293aac92a9852735dc216648ca991/37.8267,-122.4233?lang=es&units=si';
const mapurl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoicGhhbnRvbTIyIiwiYSI6ImNqdno2YnhzaDBjaXU0OG80YWlvMTF2ZWcifQ.5YbIYs5C2-NYuxBTJ_0CLQ&limit=1';

request({url: darkurl, json: true}, (error, response) => {
    if(error){
        console.log('Unable to connect to server!');
    } else if(response.body.error) {
        console.log('invalid location');
    } else {
        const data = response.body;
        console.log(data.daily.data[0].summary+' Currently the temperature is '+data.currently.temperature+' and probability of rain is '+data.currently.precipProbability);
    }
});

request({url: mapurl, json: true}, (error, response) => {
    if(error){
        console.log('Unable to connect to servers!');
    } else if(response.body.message || response.body.features.length === 0){
        console.log('Not found');
    } else {
        const data = response.body;
        console.log('Longitude: '+data.features[0].center[0] +' and Latitude = '+data.features[0].center[1]);
    }
});