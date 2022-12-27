const input = document.querySelector('input')
const search = document.querySelector('.search')
const current = document.querySelector('.current')
const city = document.querySelector('.city')
const dayInfo = document.querySelector('.day-info')
const description = document.querySelector('.description')
const temp = document.querySelector('.temp')
const humidity = document.querySelector('.humidity')
const wind = document.querySelector('.wind')
const key = 'ca35573e56f9c2d39e2edcd6425fd8b7'
const apiAddress = 'https://api.openweathermap.org/data/2.5/weather'
const date = new Date()
const weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
]
const day = weekdays[date.getDay()]
const hours = date.getHours()
const minutes = date.getMinutes()
if (hours < 10) {
    hours = `0${hours}`
}
let time = `${hours}:${minutes}`
dayInfo.innerText = `${day}, ${time}`

search.addEventListener('click', (e) => {
    city.innerText = input.value
    const searchUrl = `${apiAddress}?q=${input.value}&appid=${key}&units=metric`
    axios.get(searchUrl).then(getCurrentTemperature);
    if (e.target === 1) {
        location.reload()
    }
})


navigator.geolocation.getCurrentPosition(showUser)


function getCurrentTemperature(response) {
    let currentTemp = Math.round(response.data.main.temp)
    let desc = (response.data.weather[0].main)
    let windSpeed = Math.round(response.data.wind.speed)
    humidity.textContent = `Humidity: ${response.data.main.humidity}%`
    wind.textContent = `Wind: ${windSpeed} km/h`
    description.innerText = desc
    temp.innerText = `${currentTemp}°C`
    console.log(response)
}

function showUser(pos) {
    current.addEventListener('click', () => {
        let latitude = pos.coords.latitude
        let longitude = pos.coords.longitude
        const currentUrl = `${apiAddress}?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`
        axios.get(currentUrl).then(getCurrentTemperature);
        city.innerText += input.value

    })
}