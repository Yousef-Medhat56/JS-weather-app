//DOM elements
const searchCity = document.getElementById("search-city-input")
let citiesArr = [] //make array for all cities in (search-city.json) file
let citiesChoiceArr = [] //array of options that correspond with the input


let makeCitiesArr = () => {
    //make array for all the cities on the API
    fetch(`../json/city-names.json`).then(response => response.json()).then(data => {
        for (let x = 0; x < data.length; x++) {
            //add the state name to the city and country names if it has a value
            citiesArr.push((data[x]["state"]) ? `${data[x]["name"]},${data[x]["state"]} - ${data[x]["country"]}` :
                //write the city name and the country only 
                `${data[x]["name"]} - ${data[x]["country"]}`)
        }

    })
}

//make array of choices that appear for the user 
let makeChoicesArr = () => {
    //filtering the cities array to make choices array
    if (searchCity.value.length > 0) {
        citiesChoiceArr = citiesArr.filter(value => (value.toLowerCase()).startsWith(searchCity.value.toLowerCase()))
    }

}

makeCitiesArr()

//make a new array of choices by entering new letters
searchCity.addEventListener("keyup", makeChoicesArr)