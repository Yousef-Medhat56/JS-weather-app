//Declaring new objects

//make array for all cities in (search-city.json) file
let citiesArr = []

//make array for all countries in (search-city.json) file
let countriesArr = []

//make array for all states in (search-city.json) file
let statesArr = []

//result container : combine the city, state and country names together
let availableResults = []

//search results array
let resultsArr = []

//the index of the search bar
let searchBarIndex


//fetch cities
const fetchCities = fetch('https://raw.githubusercontent.com/Yousef-Medhat56/JS-weather-app/main/DATA/cities.txt').then(response => response.text()).then(data => { return data.split(",") })

//fetch countries
const fetchCountries = fetch('https://raw.githubusercontent.com/Yousef-Medhat56/JS-weather-app/main/DATA/countries.txt').then(response => response.text()).then(data => { return data.split(",") })

//fetch states
const fetchStates = fetch('https://raw.githubusercontent.com/Yousef-Medhat56/JS-weather-app/main/DATA/states.txt').then(response => response.text()).then(data => { return data.split(",") })


//make array of search results that appear for the user 
let makeResultsArr = (index) => { //index : the page index

    //filtering the cities array to make choices array
    if (document.querySelectorAll(".search-bar-container input")[index].value.length > 0) {

        /*Make array for results that  match with the search input,
         after removing the repeated elements in it by converting it to SET then ARRAY*/
        resultsArr = new Array(...new Set(availableResults.filter(value => (value.toLowerCase()).startsWith(document.querySelectorAll(".search-bar-container input")[index].value.toLowerCase()))))
    }

}

Promise.all([fetchCities, fetchCountries, fetchStates]).then(results => {
    //make array for cities names only
    citiesArr = results[0]

    //make array for countries names only
    countriesArr = results[1]

    //make array for states names only
    statesArr = results[2]

    //combine the cities, countries and states in one array
    for (x in citiesArr) {
        availableResults.push((statesArr[x]) ? //if the city has a state name
                `${citiesArr[x]}, ${statesArr[x]} - ${countriesArr[x]}` : //write the state name in the result 
                `${citiesArr[x]} - ${countriesArr[x]}`) //else : DON'T write the state name
    }
})

//page styles if the search bar is empty
function emptySearchBar(index) { //index : the page index

    //remove the results if the search bar is empty
    document.querySelectorAll(".results-container")[index].innerHTML = ""

}

//showing the search results 
function showResultsArr(index) { //index : the page index

    //if the search bar is empty
    emptySearchBar(index)
    rmHoverEffect(index)

    //function that create the search result during searching in form of (li) tags
    let createSearchResults = (maxLength) => {
        for (let x = 0; x < maxLength; x++) {
            document.querySelectorAll(".results-container")[index].innerHTML += `<li onclick = clickResult(event)>${resultsArr[x]}</li>`
        }
    }

    //if the user type in the search bar
    if (document.querySelectorAll(".search-bar-container input")[index].value.length != 0) {

        keepHoverEffect(index) //keep the searchbar obvious for the user

        //showing 5 results only as maximum
        if (resultsArr.length > 5) {

            createSearchResults(5) //create 5 results only
        }

        //showing all the elements in (resultsArr)
        else if (resultsArr.length > 0 && resultsArr.length <= 5) {

            createSearchResults(resultsArr.length)
        }

        //if there is no availble results 
        else if (resultsArr.length == 0) {
            checkRmResult(index)
        }
    }


}


function checkRmResult(index) {
    //check if the user searchs a city that he already has added it before
    let RemovedResult = rmResultsArr.filter(value => (value.toLowerCase()).startsWith(document.querySelectorAll(".search-bar-container input")[index].value.toLowerCase()))[0]
    if (RemovedResult) {
        document.querySelectorAll(".results-container")[index].innerHTML = `<li>You added ${RemovedResult}</li>`
    }
    //if the input in the search bar doesn't match any results or cities have been added
    else {
        document.querySelectorAll(".results-container")[index].innerHTML = `<li>No available results</li>`
    }

}


//the function that is called after (keyup) event on the search bar
function keyUpFun(event) {

    //convert search bars (node list) into an (array) to can get the idex of each element in it
    let searchBarsArr = Array.from(document.querySelectorAll(".search-bar-container input"))

    //the index of the search that keyup event occurs on it
    searchBarIndex = searchBarsArr.indexOf(event.target)

    makeResultsArr(searchBarIndex) //make new result array after entering or removing a letter 
    showResultsArr(searchBarIndex) //show new results

}