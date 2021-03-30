//OpenWeatherMap API key
const apiKey = "c1175134deb4968fd0eaf3b28c9d9ed2"

//HTML elements
//HTML elements | location name
const locationName = document.getElementById("location-name")
    //HTML elements | temperature
const currentTemp = document.getElementById("current-temp-span")
const maxTemp = document.getElementsByClassName("max-temp-span")
const minTemp = document.getElementsByClassName("min-temp-span")
    //HTML elements | weather icon
const weatherIcon = document.getElementById("today-weather-icon")
    //HTML elements | weather description
const weatherDesc = document.getElementById("today-weather-desc")
    //HTML elements | turn left and right buttons
const turnRightBtn = document.getElementById("turn-right-btn")
const turnLeftBtn = document.getElementById("turn-left-btn")
    //HTML elements | week forecast
const firstHalf = document.getElementById("first-half-week")
const secondHalf = document.getElementById("second-half-week")

//Getting the current location coordinates
navigator.geolocation.getCurrentPosition(function(position) {
        let lat = position.coords.latitude; //current location latitude
        let long = position.coords.longitude; //current location longitude
        //calling the (One call API) from OpenWeatherMap
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${apiKey}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)

                //get the weather icons of the next week
                getWeatherIcons(data)

                //get maximum temperatures
                getMaxMinTemp(maxTemp, "day", data)


                //get minimum temperatures
                getMaxMinTemp(minTemp, "night", data)

                //get weekdays names
                getDaysName(data)

                //write the timezone name
                locationName.textContent = remContinentName(data["timezone"])

                //Calling (Current Weather Data) API from OpenWeatherMap by the city name to get the current temp, weather icon and weather description
                fetch(`https://api.openweathermap.org/data/2.5/weather?q=${remContinentName(data["timezone"])}&appid=${apiKey}`)
                    .then((cityResponse) => cityResponse.json())
                    .then((cityData) => {
                        console.log(cityData)

                        //Get the current weather icon
                        weatherIcon.innerHTML = `<img  
                        src="//openweathermap.org/img/wn/${cityData["weather"][0]["icon"]}@2x.png">`

                        //write current weather description
                        weatherDesc.textContent = cityData["weather"][0]["description"];
                        //write current temperature
                        currentTemp.textContent = Math.round(cityData["main"]["temp"] - 273.15)
                    })

            })
    })
    //Functions
    //Removing the continent name from the timezone in the api to get the city name only
let remContinentName = (timezone) => {
    for (let x = 0; x < timezone.length; x++) {
        if (timezone[x] == "/") {
            return timezone.substring(x + 1)
        }
    }
}


//turning the weather forecast to left 
let turnLeft = () => {
        turnLeftBtn.style.visibility = "hidden"
        turnRightBtn.style.visibility = "visible"
        firstHalf.style.left = "-105%"
        secondHalf.style.left = "5%"
    }
    //turning the weather forecast to right 
let turnRight = () => {
    turnLeftBtn.style.visibility = "visible"
    turnRightBtn.style.visibility = "hidden"
    firstHalf.style.left = "5%"
    secondHalf.style.left = "105%"
}

//creating weekdays Divs in week forecast
let createWeekDays = (halfWeekOrder, numOfDays) => {
    for (let x = 0; x < numOfDays; x++) {
        halfWeekOrder.innerHTML += `<div class="weekday-weather">
        <div class="weekday-weather-icon"></div>
        <div class="weekday-weather-info">
            <span class="weekday-name"></span>
            <span class="weekday-date"></span>
            <div class="weekday-max-min-temp"><span class ="max-temp-span"></span>/<span class ="min-temp-span"></span><span>&#8451;</span></div>
        </div>`
    }
}

createWeekDays(firstHalf, 4) //create 4 days for the first half of the week forecast
createWeekDays(secondHalf, 3) //create 3 days for the first half of the week forecast

//get the weather icons of the next week
function getWeatherIcons(weekWeatherApi) {
    let weatherIcons = document.getElementsByClassName("weekday-weather-icon")
    for (let x = 0; x < weatherIcons.length; x++) {
        weatherIcons[x].innerHTML = `<img  
        src="//openweathermap.org/img/wn/${weekWeatherApi["daily"][x+1]["weather"][0]["icon"]}@2x.png">`
    }
}

//Get max and min temperature 
function getMaxMinTemp(tempType, time, weekWeatherApi) {
    for (let x = 0; x < tempType.length; x++) {
        tempType[x].textContent = Math.round(weekWeatherApi["daily"][x]["temp"][time] - 273.15)
    }
}

//get weekdays name
function getDaysName(weekWeatherApi) {
    let weekdaysOrder = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let weekdaysName = document.getElementsByClassName("weekday-name")

    let milliseconds;
    for (let x = 0; x < weekdaysName.length; x++) {
        milliseconds = (weekWeatherApi["daily"][x]["dt"] * 1000) //convert seconds to milliseconds
        weekdaysName[x].textContent = weekdaysOrder[new Date(milliseconds).getDay()]
    }
}