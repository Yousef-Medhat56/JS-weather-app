//Open Weather map API key
const apiKey = "c1175134deb4968fd0eaf3b28c9d9ed2"

//HTML elements
const locationName = document.getElementById("location-name")
const currentTemp = document.getElementById("current-temp")
const maxTemp = document.getElementById("max-temp")
const minTemp = document.getElementById("min-temp")
const weatherIcon = document.getElementById("today-weather-icon")
const weatherDesc = document.getElementById("today-weather-desc")

//Getting the current location coordinates
navigator.geolocation.getCurrentPosition(function(position) {
        let lat = position.coords.latitude; //current location latitude
        let long = position.coords.longitude; //current location longitude
        //calling the (One call API) from Open weather map
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

                //Calling (Current Weather Data) API from OpenWeatherMap to get the current temp, weather icon and weather description
                fetch(`https://api.openweathermap.org/data/2.5/weather?q=${remContinentName(timezone)}&appid=${apiKey}`)
                    .then((cityResponse) => cityResponse.json())
                    .then((cityData) => {
                        console.log(cityData)

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