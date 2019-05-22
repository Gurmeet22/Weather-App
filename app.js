const request = require('request');
const url = 'https://api.darksky.net/forecast/897293aac92a9852735dc216648ca991/37.8267,-122.4233';

request(url, (error, response) => {
    const data = JSON.parse(response.body);
    console.log(data);
});