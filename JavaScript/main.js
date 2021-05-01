//OpenWeatherMap API key
const apiKey = "c1175134deb4968fd0eaf3b28c9d9ed2"

//HTML elements | body tag
const mainContainer = document.getElementById("main-container")

//HTML elements | location name
let locationName

//HTML elements | current temperature
let currentTemp

//HTML elements | current weather icon
let curWeatherIcon

//HTML elements | current weather description
let curWeatherDesc

//HTML elements | days of week names
let weekdaysNames

//HTML elements | days of week Date
let weekdaysDate

//HTML elements | months name 
let monthNames

//HTML elements | week forecast weather icons
let foreCastIcons

//HTML elements | maximum temperatures in the weather forecast
let maxTemp

//HTML elements | minimum temperatures in the weather forecast
let minTemp

//Getting the current location coordinates
navigator.geolocation.getCurrentPosition(function(position) {
    let lat = position.coords.latitude; //current location latitude
    let long = position.coords.longitude; //current location longitude

    //calling the (5 Day / 3 Hour Forecast)API from OpenWeatherMap
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`)
        .then((response) => response.json())
        .then((data) => {

            collectWeatherData(data)
        })
})

//Functions

//The main function
function collectWeatherData(data) {

    //create the weather forecast section
    createWeekDays(document.querySelectorAll(".weather-forecast-container"), 4)

    //write the city name
    writeCityName(data)

    //write weekdays names
    writeDaysName(data)

    //write weekday date in the week forecast
    writeDaysDate(data)

    //write months names in the weather forecast
    writeMonName(data)

    //Remove the data of the current day from the (5 Day / 3 Hour Forecast)API
    rmTodayData(data)

    //show today weather icon ,description and current temp
    getTodayWeather(data)

    //show the weather icons in the week forecast
    showForeCastIcons(data)

    //push Maximum temperatures to one array
    let MaxTempsObj = new Object
    collectMaxMinTemps(MaxTempsObj, data, "temp_max")

    //push Minimum temperatures to one array
    let MinTempsObj = new Object
    collectMaxMinTemps(MinTempsObj, data, "temp_min")

    //write maximum and minimum temperatures in the week forecast
    showMaxTemps(MaxTempsObj)
    showMinTemps(MinTempsObj)
}


//Calling (Current Weather Data) API from OpenWeatherMap by the city name to get the current temp, weather icon and weather description
function getTodayWeather(weekWeatherApi) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${weekWeatherApi.city.name}&appid=${apiKey}&units=metric`)
        .then((cityResponse) => cityResponse.json())
        .then((cityData) => {

            //write current temperature
            writeCurrenTemp(cityData)


            //write current weather description
            writeCurrentWeaDesc(cityData)

            //get the current weather icon
            showCurrenIcon(cityData)

        })
}

//write the current temperature
function writeCurrenTemp(cityData) {
    currentTemp = document.querySelectorAll(".current-temp-span")
    currentTemp[currentTemp.length - 1].textContent = Math.round(cityData["main"]["temp"])
}

//write the current weather description
function writeCurrentWeaDesc(cityData) {
    curWeatherDesc = document.querySelectorAll(".today-weather-desc")
    curWeatherDesc[curWeatherDesc.length - 1].textContent = cityData["weather"][0]["description"];
}

//get the current weather icon
function showCurrenIcon(cityData) {
    curWeatherIcon = document.querySelectorAll(".today-weather-icon")
    curWeatherIcon[curWeatherIcon.length - 1].innerHTML = `<div><i class = "wi wi-owm-${cityData["weather"][0]["id"]}"></i></div>`
}

//write the city name
function writeCityName(weekWeatherApi) {
    locationName = document.querySelectorAll(".location-name")
    locationName[locationName.length - 1].textContent = weekWeatherApi.city.name
}


//creating weekdays Divs in week forecast
let createWeekDays = (halfWeekOrder, numOfDays) => {
    for (let x = 0; x < numOfDays; x++) {
        halfWeekOrder[halfWeekOrder.length - 1].innerHTML += `<div class="weekday-weather">
        <div class="weekday-weather-icon"></div>
        <div class="weekday-weather-info">
            <span class="weekday-name"></span>
            <span class="weekday-date"><span class= "weekday-date-num"></span><span class= "weekday-date-month"></span></span>
            <div class="weekday-max-min-temp"><span class ="max-temp-span"></span>/<span class ="min-temp-span"></span><span>&#8451;</span></div>
        </div>`
    }
}

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
    //days of week array
    let weekdaysNamesArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    //write today name
    document.querySelectorAll(".current-day-name")[document.querySelectorAll(".current-day-name").length - 1].textContent = weekdaysNamesArr[makeDateArr(weekWeatherApi)[0].getDay()]

    //days of week names in the weather forecast
    weekdaysNames = document.querySelectorAll(".weather-forecast-container")[document.querySelectorAll(".weather-forecast-container").length - 1].querySelectorAll(".weekday-weather .weekday-weather-info .weekday-name")

    //write the name of each day in the weather forecast
    for (let x = 0; x < weekdaysNames.length; x++) {
        weekdaysNames[x].textContent = weekdaysNamesArr[makeDateArr(weekWeatherApi)[x + 1].getDay()]
    }
}

//write weekday date in the week forecast
function writeDaysDate(weekWeatherApi) {
    //write today date
    document.querySelectorAll(".current-day-date")[document.querySelectorAll(".current-day-date").length - 1].textContent = `${makeDateArr(weekWeatherApi)[0].getDate()} `

    //days of week Date in the weather forecast
    weekdaysDate = document.querySelectorAll(".weather-forecast-container")[document.querySelectorAll(".weather-forecast-container").length - 1].querySelectorAll(".weekday-weather .weekday-weather-info .weekday-date .weekday-date-num")

    //write the date of each day in the weather forecast
    for (let x = 0; x < weekdaysDate.length; x++) {
        weekdaysDate[x].textContent = `${makeDateArr(weekWeatherApi)[x+1].getDate()} `
    }
}

//write month name in the forecast
function writeMonName(weekWeatherApi) {
    //Months name Array
    let monNamesArr = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]

    //write the month name of the cuurent day
    document.querySelectorAll(".current-day-month")[document.querySelectorAll(".current-day-month").length - 1].textContent = monNamesArr[makeDateArr(weekWeatherApi)[0].getMonth()]

    //months name spans in the weather forecast
    monthNames = document.querySelectorAll(".weather-forecast-container")[document.querySelectorAll(".weather-forecast-container").length - 1].querySelectorAll(".weekday-weather .weekday-weather-info .weekday-date .weekday-date-month")

    //write the month name for each day in the weather forecast
    for (let x = 0; x < monthNames.length; x++) {
        monthNames[x].textContent = monNamesArr[makeDateArr(weekWeatherApi)[x + 1].getMonth()]
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
    //maximum temperatures in the weather forecast
    maxTemp = document.querySelectorAll(".weather-forecast-container")[document.querySelectorAll(".weather-forecast-container").length - 1].querySelectorAll(".weekday-weather .weekday-weather-info .weekday-max-min-temp .max-temp-span")

    //show maximum temperatures for each day in the weather forecast
    for (let x = 0; x < maxTemp.length; x++) {
        maxTemp[x].textContent = Math.round(Math.max(...object[`day${x}`]))
    }
}

//show minimum temperatures in the week forecast
function showMinTemps(object) {
    //minimum temperatures in the weather forecast
    minTemp = document.querySelectorAll(".weather-forecast-container")[document.querySelectorAll(".weather-forecast-container").length - 1].querySelectorAll(".weekday-weather .weekday-weather-info .weekday-max-min-temp .min-temp-span")

    //show minimum temperatures for each day in the weather forecast
    for (let x = 0; x < minTemp.length; x++) {
        minTemp[x].textContent = Math.round(Math.min(...object[`day${x}`]))
    }
}

//show the weather icons in the week forecast
//the icons is for the weather at 12 pm
function showForeCastIcons(weekWeatherApi) {
    foreCastIcons = document.querySelectorAll(".weather-forecast-container")[document.querySelectorAll(".weather-forecast-container").length - 1].querySelectorAll(".weekday-weather .weekday-weather-icon")

    for (let x = 0; x < foreCastIcons.length; x++) {
        foreCastIcons[x].innerHTML = `<diV><i class = "wi wi-owm-${weekWeatherApi.list[(8*x)+4]["weather"][0]["id"]}"></i></div>`
    }
}