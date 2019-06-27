const express = require('express'); 
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode'); 
const forecast = require('./utils/forecast');


const app = express(); 

// Define path for Express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, "../templates/partials")

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDir))

// Routes
app.get('', (req, res) => { 
    res.render('index', { 
        title: 'Weather App', 
        name: 'Terry Threatt'
    })
})

app.get('/about', (req, res) => { 
    res.render('about', { 
        title: 'About Page', 
        name: 'Terry Threatt'
    })
})

app.get('/help', (req, res) => { 
    res.render('help', { 
        title: 'Help page', 
        helpText: 'Help', 
        name: 'Terry Threatt'
    })
})

app.get('/weather', (req, res) =>{
    if (!req.query.address) { 
        return res.send({ 
            error: 'You must provide an address!'
        })
    } 

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => { 
        if (error) { 
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => { 
            if (error) { 
                return res.send({ error })
            }

            res.send({ 
                forecast: forecastData, 
                location, 
                address: req.query.address
            })
        })
    })
})


    console.log(req.query.search) 
    res.send({ 
        products: []
    })
})

app.get('/help/*', (req, res) => { 
    res.render('404', { 
        title: '404',
        name: 'Terry Threatt', 
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => { 
    res.render('404', { 
        title: '404', 
        name: 'Terry Threatt', 
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => { 
    console.log('Server is up on port 3000.')
})