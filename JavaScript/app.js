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
const curWeatherIcon = document.getElementById("today-weather-icon")
    //HTML elements | weather description
const curWeatherDesc = document.getElementById("today-weather-desc")
    //HTML elements | turn left and right buttons
const turnRightBtn = document.getElementById("turn-right-btn")
const turnLeftBtn = document.getElementById("turn-left-btn")
    //HTML elements | week forecast
const forecastContainer = document.getElementById("weather-forecast-container")
const secondHalf = document.getElementById("second-half-week")

//Getting the current location coordinates
navigator.geolocation.getCurrentPosition(function(position) {
    let lat = position.coords.latitude; //current location latitude
    let long = position.coords.longitude; //current location longitude

    //calling the (5 Day / 3 Hour Forecast)API from OpenWeatherMap
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)

            //get weekdays names
            writeDaysName(data)

            //get weekday date in the week forecast
            writeDaysDate(data)

            writeMonName(data)

            //Remove the data of the current day from the (5 Day / 3 Hour Forecast)API
            rmTodayData(data)

            console.log(data.list)

            //show today weather icon ,description and current temp
            getTodayWeather(data)

            //The Week forecast

            //show the weather icons in the week forecast
            showcurWeatherIcons(data)

            //push Maximum temperatures to one array
            let MaxTempsObj = new Object
            collectMaxMinTemps(MaxTempsObj, data, "temp_max")

            //push Minimum temperatures to one array
            let MinTempsObj = new Object
            collectMaxMinTemps(MinTempsObj, data, "temp_min")

            //write maximum and minimum temperatures in the week forecast
            showMaxTemps(MaxTempsObj)
            showMinTemps(MinTempsObj)
        })
})

//Functions

//Calling (Current Weather Data) API from OpenWeatherMap by the city name to get the current temp, weather icon and weather description
function getTodayWeather(weekWeatherApi) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${weekWeatherApi.city.name}&appid=${apiKey}&units=metric`)
        .then((cityResponse) => cityResponse.json())
        .then((cityData) => {
            console.log(cityData)

            //write current temperature
            currentTemp.textContent = Math.round(cityData["main"]["temp"])

            //write current weather description
            curWeatherDesc.textContent = cityData["weather"][0]["description"];

            //get the current weather icon
            curWeatherIcon.innerHTML = `<div><i class = "wi wi-owm-${cityData["weather"][0]["id"]}"></i></div>`

        })
}


//creating weekdays Divs in week forecast
let createWeekDays = (halfWeekOrder, numOfDays) => {
    for (let x = 0; x < numOfDays; x++) {
        halfWeekOrder.innerHTML += `<div class="weekday-weather">
        <div class="weekday-weather-icon"></div>
        <div class="weekday-weather-info">
            <span class="weekday-name"></span>
            <span class="weekday-date"><span class= "weekday-date-num"></span><span class= "weekday-date-month"></span></span>
            <div class="weekday-max-min-temp"><span class ="max-temp-span"></span>/<span class ="min-temp-span"></span><span>&#8451;</span></div>
        </div>`
    }
}

createWeekDays(forecastContainer, 4) //create 4 days for the  weather forecast




//collect the date info of all the days in a one array
function makeDateArr(weekWeatherApi) {
    let milliseconds;
    let dateArr = [] //to push the date values inside it
    for (let x = 0; x < 5; x++) { //(8) : sum of today and the 7 days of the next week
        milliseconds = (weekWeatherApi.list[x + (7 * x)]["dt"] * 1000) //convert seconds to milliseconds
        dateArr.push(new Date(milliseconds)) //add each day date to the array
    }
    return dateArr
}

//write weekdays name
function writeDaysName(weekWeatherApi) {
    let weekdaysName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    let weekdaysNamesSpans = document.getElementsByClassName("weekday-name")

    for (let x = 0; x < weekdaysNamesSpans.length; x++) {
        weekdaysNamesSpans[x].textContent = weekdaysName[makeDateArr(weekWeatherApi)[x].getDay()]
    }
}

//write weekday date in the week forecast
function writeDaysDate(weekWeatherApi) {
    let weekdaysDate = document.getElementsByClassName("weekday-date-num")
    for (let x = 0; x < weekdaysDate.length; x++) {
        weekdaysDate[x].textContent = `${makeDateArr(weekWeatherApi)[x].getDate()} `
    }
}

//write month name in the forecast
function writeMonName(weekWeatherApi) {
    let monNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
    let monNameSpans = document.getElementsByClassName("weekday-date-month")

    for (let x = 0; x < monNameSpans.length; x++) {
        monNameSpans[x].textContent = monNames[makeDateArr(weekWeatherApi)[x].getMonth()]
    }
}

//Remove the data of the current day from the (5 Day / 3 Hour Forecast)API
function rmTodayData(data) {
    for (let x = 0; x < 1; x++) {

        //elements that contains the current day data
        let currentDateApi = new Date((data.list[x].dt) * 1000).getDay()

        //the current day date
        let currentDate = new Date().getDay()

        //if the date of the elements equal the date of the current day
        if (currentDateApi == currentDate) {
            data.list.shift() //remove that elements
            x-- //return x value again to 0
        }
    }
}


//collect the maximum and minimum temperatures during all the parts of the day for the next 4 days
function collectMaxMinTemps(object, data, tempType) {
    for (let dayIndex = 0; dayIndex < 4; dayIndex++) {
        //add new property to the empty object that represent the maximum or minimum temps during one day only
        object[`day${dayIndex}`] = new Array()
        for (let threeHoursIndex = 0; threeHoursIndex < 8; threeHoursIndex++) {
            //add the maximum or the minimum temps of each part of the day to the object
            object[`day${dayIndex}`].push(data.list[(dayIndex + threeHoursIndex) + (dayIndex * 7)]["main"][tempType])
        }
    }
}

//show maximum temperatures in the week forecast
function showMaxTemps(object) {
    for (let x = 0; x < 4; x++) {
        maxTemp[x].textContent = Math.round(Math.max(...object[`day${x}`]))
    }
}

//show minimum temperatures in the week forecast
function showMinTemps(object) {
    for (let x = 0; x < 4; x++) {
        minTemp[x].textContent = Math.round(Math.min(...object[`day${x}`]))
    }
}

//show the weather icons in the week forecast
//the icons is for the weather at 12 pm
function showcurWeatherIcons(weekWeatherApi) {
    let curWeatherIcons = document.getElementsByClassName("weekday-weather-icon")
    for (let x = 0; x < 4; x++) {
        curWeatherIcons[x].innerHTML = `<diV><i class = "wi wi-owm-${weekWeatherApi.list[(8*x)+4]["weather"][0]["id"]}"></i></div>`
    }
}