const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Gurmeet Singh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Gurmeet Singh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Just enter your address in the search box provided and get the real-time weather forecast.',
        title: 'Help',
        name: 'Gurmeet Singh'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Address not provided'
        })
    }
    const address = req.query.address;
    geocode(address).then(( {Latitude, Longitude, Place} ) => {
        forecast(Latitude, Longitude).then(( {summary, temperature, rain} ) => {
            res.send({
                forecast: summary + '. Temperature is ' + temperature + ' C. Probability of rain is '+rain+'%.',
                location: Place,
            })
            // console.log(Place);
            // console.log(summary);
            // console.log(temperature);
            // console.log(rain);
        }).catch((error) => {
            return res.send({
                error
            });
        })
    }).catch((error) => {
        return res.send({
            error
        });
    })

    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Invalid URl'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+port)
})