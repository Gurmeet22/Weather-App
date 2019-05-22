const geocode = require('./utils/geocode.js');
// const weather = require('./utils/weather.js');
const request = require('request');

const weather = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/897293aac92a9852735dc216648ca991/' + latitude + ',' + longitude + '?lang=es&units=si';
    request({url: url, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect to server!', undefined);
        } else if(response.body.error) {
            callback('invalid location', undefined);
        } else {
            const data = response.body;
            callback(undefined, {
                summary: data.daily.data[0].summary,
                temperature: data.currently.temperature,
                rain: data.currently.precipProbability
            });
        }
    });
};



geocode('Jamshedpur', (error, data) => {
    if(error){
        console.log(error);
    } else{
        console.log('Longitude: ', data.Longitude);
        console.log('Latitude: ', data.Latitude);
        console.log('Place: ', data.Place);
    }
});

weather(37.8267,-122.4233, (error, data) => {
    if(error){
        console.log(error);
    } else{
        console.log('Summary: ', data.summary);
        console.log('Temperature: ', data.temperature);
        console.log('Probability of rain: ', data.rain*100);
    }
});