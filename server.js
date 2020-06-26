// Express to run server and routes
const express = require('express')

// Start up an instance of app
const app = express()

// Dependencies
const bodyParser = require('body-parser')
// Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const cors = require('cors')
app.use(cors())

// Initialize the main project folder
app.use(express.static('website'))

const port = 3000
const server = app.listen(port, listening)
function listening(){
    console.log(`running on localhost: ${port}`)
}

//Create GET route
const weatherData = []

app.get('/all', getData)

function getData(req,res){
    res.send(weatherData)
    console.log(weatherData)
}

//Create a POST route
app.post('/addWeatherData', addWeatherData)

function addWeatherData(req,res){
    newEntry = {
        name: req.body.name,
        date: req.body.date,
        temp: req.body.temp,
        content: req.body.content
    }

    weatherData.push(newEntry)
    res.send(weatherData)
}