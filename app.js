const request = require('request');
const url = 'https://api.darksky.net/forecast/897293aac92a9852735dc216648ca991/37.8267,-122.4233?lang=es&units=si';

request({url: url, json: true}, (error, response) => {
    const data = response.body;
    console.log(data.daily.data[0].summary+' Currently the temperature is '+data.currently.temperature+' and probability of rain is '+data.currently.precipProbability);
});