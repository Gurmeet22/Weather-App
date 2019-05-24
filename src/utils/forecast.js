const request = require('request');
const Promise = require('promise');

// standard callback method:

// const forecast = (latitude, longitude, callback) => {
//     const url = 'https://api.darksky.net/forecast/897293aac92a9852735dc216648ca991/' + latitude + ',' + longitude + '?lang=en&units=si';
//     request({url: url, json: true}, (error, response) => {
//         if(error){
//             callback('Unable to connect to server!', undefined);
//         } else if(response.body.error) {
//             callback('Invalid location', undefined);
//         } else {
//             const data = response.body;
//             callback(undefined, {
//                 summary: data.daily.data[0].summary,
//                 temperature: data.currently.temperature,
//                 rain: data.currently.precipProbability
//             });
//         }
//     });
// };

//Promise method:

const forecastpromise = (latitude, longitude) => {
    return new Promise((resolve, reject) => {
        
            const url = 'https://api.darksky.net/forecast/897293aac92a9852735dc216648ca991/' + latitude + ',' + longitude + '?lang=en&units=si';
            request({url, json: true}, (error, {body}) => {
                if(error){
                    reject('Unable to connect to server!');
                } else if(body.error) {
                    reject('Invalid location');
                } else {
                    
                    resolve({
                        summary: body.daily.data[0].summary,
                        temperature: body.currently.temperature,
                        rain: body.currently.precipProbability*100
                    });
                }
            });
        
    });
};

// module.exports = forecast;
module.exports = forecastpromise;