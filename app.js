//OpenWeatherMap API key
const apiKey = "c1175134deb4968fd0eaf3b28c9d9ed2"

//HTML elements
//HTML elements | location name
const locationName = document.getElementById("location-name")
    //HTML elements | temperature
const currentTemp = document.getElementById("current-temp-span")
const maxTemp = document.getElementById("max-temp-span")
const minTemp = document.getElementById("min-temp-span")
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

                //write the timezone name
                let timezone = data["timezone"]
                locationName.textContent = remContinentName(timezone)
                    //write the max temp
                maxTemp.textContent = Math.round(data["daily"][0]["temp"]["day"] - 273.15)
                    //write the min temp
                minTemp.textContent = Math.round(data["daily"][0]["temp"]["night"] - 273.15)

                //Calling (Current Weather Data) API from OpenWeatherMap by the city name to get the current temp, weather icon and weather description
                fetch(`https://api.openweathermap.org/data/2.5/weather?q=${remContinentName(timezone)}&appid=${apiKey}`)
                    .then((cityResponse) => cityResponse.json())
                    .then((cityData) => {
                        console.log(cityData)

                        //Get the weather icon
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
<<<<<<< HEAD

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
=======
>>>>>>> 57f5bdab8dce20db648f6dffe2fbea175a20a044
