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
        })
})