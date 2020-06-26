// Web API
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
let apiKey = '180b258c596eebf475f8b004c722e7d1'

// The submit button
document.getElementById('generate').addEventListener('click', performAction)

//Action on click button
function performAction() {
    const zipCode = document.getElementById('zip').value
    const feelings = document.getElementById('feelings').value
    const countryCode = document.getElementById('country').value

    if (countryCode == ',de') {
        tempUnit = '&units=metric'
        tempUnitText = ' °C'
    } else {
        tempUnit = '&units=imperial'
        tempUnitText = ' °F'
    }

    const urlConstruct = baseURL + zipCode + countryCode + '&appid=' + apiKey + tempUnit

    getWeather(urlConstruct)
    .then((data) => {
        const today = new Date()
        const options = { weekday: 'long', month: 'short', day: 'numeric' }
        const date = today.toLocaleDateString('en-En', options)

        postData('/addWeatherData', {
            name: data.name,
            date: date,
            temp: data.main.temp + tempUnitText,
            content: feelings
        })
    })
    .then(() => {
        updateUI()
    })
}

// Update the UI
const updateUI = async () => {
    const request = await fetch('/all')
    try {
        const allData = await request.json()
        document.getElementById('name').innerHTML = allData[0].name
        document.getElementById('date').innerHTML = allData[0].date
        document.getElementById('temp').innerHTML = allData[0].temp
        document.getElementById('content').innerHTML = allData[0].content

    } catch (error) {
      console.log('error', error)
    }
  }

const getWeather = async (url) => {
    const res = await fetch(url)
    try {
        const data = await res.json()
        return data
    } catch (error) {
        console.log('error', error)
    }
}

// POST
const postData = async ( url = '', data = {}) => {

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    try {
        const newData = await response.json()
        return newData
    } catch (error) {
        console.log('error', error)
    }
}