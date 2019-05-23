const geocodepromise = require('./utils/geocode.js');
const forecastpromise = require('./utils/forecast.js');
const promise = require('promise');

const address = process.argv[2];
if(!address){
    console.log('No address provided');
}
else{
    // geocode(address, (error, data) => {
    //     if(error){
    //         console.log(error);
    //     } else{
    //         forecast(data.Latitude, data.Longitude, (error, fdata) => {
    //             if(error){
    //                 console.log(error);
    //             } else{
    //                 console.log('Place: ', data.Place);
    //                 console.log('Summary: ', fdata.summary);
    //                 console.log('Temperature: ', fdata.temperature);
    //                 console.log('Probability of rain: ', fdata.rain*100+'%');
    //             }
    //         });
          
    //     }
    // });


    geocodepromise(address).then(( {Latitude, Longitude, Place} ) => {
        forecastpromise(Latitude, Longitude).then(( {summary, temperature, rain} ) => {
            console.log(Place);
            console.log(summary);
            console.log(temperature);
            console.log(rain);
        }).catch((error) => {
            console.log(error);
        })
    }).catch((error) => {
        console.log(error);
    })
}

