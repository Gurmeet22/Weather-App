const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const address = process.argv[2];
if(!address){
    console.log('No address provided');
}
else{
    geocode(address, (error, data) => {
        if(error){
            console.log(error);
        } else{
            forecast(data.Latitude, data.Longitude, (error, fdata) => {
                if(error){
                    console.log(error);
                } else{
                    console.log('Place: ', data.Place);
                    console.log('Summary: ', fdata.summary);
                    console.log('Temperature: ', fdata.temperature);
                    console.log('Probability of rain: ', fdata.rain*100+'%');
                }
            });
        }
    });
}

