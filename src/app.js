const path = require ('path')
const express = require ('express')
const hbs = require ('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Leart Mekolli'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About me',
        name: 'Leart Mekolli'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help',
        message: 'Having trouble? Contact us by leartmekolli@gmail.com',
        name:'Leart Mekolli'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Address must be provided!'
        })
    }

    geocode.geocode(req.query.address, (error, {latitude, longitude, location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast.forecast(latitude, longitude, (error, forecastData)=>{
            if (error){
                return res.send({error})
            }
            
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: 'Search term must be provided'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404page',{
        title: '404',
        message: 'Help article not found',
        name: 'Leart Mekolli'
    })
})

app.get('*', (req, res)=>{
    res.render('404page', {
        title: '404',
        message: 'Page not found',
        name: 'Leart Mekolli'
    })
})


app.listen(port, ()=>{
    console.log(`Server is up on port ${port}!`)
})