//make an array fo the clicked results and the cities, countries, states in the results 
let rmResultsArr = new Array //removed results array
let rmCitiesArr = new Array //removed cities array
let rmCountriesArr = new Array //removed countries array
let rmStatesArr = new Array //removed states array


function clickResult(event) {


    //remove the hover effect on the search bar
    rmHoverEffect(searchBarIndex)

    //after clicking the result : clear the search bar
    emptySearchBar(searchBarIndex)

    /*check if the page isn't the first page after the user blocked the browser from getting his location
    and if it's the weather data will added to the same page ,and if it isn't a new page will be added */
    if (!document.querySelector(".introPage")) {
        mainContainer.innerHTML += pageContent //add new page
    }

    document.querySelector(".spinner-div").style.display = "flex"

    //increase the main container width 
    stretchMainCo()

    //fetch the searched city API
    fetchResult(event)

    //remove the clicked result from the available results array
    rmClickedResult(event)

    //show slide buttons
    showBtn()

    //control the display of search bars 
    searchBarDisplay()

    //control the display of delete buttons
    delBtnDisplay()

    //make the main container transform to the new page after adding it
    mainContainer.style.transform = `translateX(${(document.querySelectorAll(".container").length - 1) * -100 }vw)`

    //remove letters in the search input after clicking the result
    document.querySelectorAll(".search-bar-container input")[searchBarIndex].value = ""

}

//fetch the searched city API
function fetchResult(event) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${citiesArr[availableResults.indexOf(event.target.innerHTML)]},
    ${statesArr[availableResults.indexOf(event.target.innerHTML)]},
    ${countriesArr[availableResults.indexOf(event.target.innerHTML)] }&appid=${ apiKey }&units=metric `)
        .then(result => result.json())
        .then(data => {

            collectWeatherData(data)
        })
}

//remove the clicked results from the results array and add them to the rmResultsArr Arr
function rmClickedResult(event) {
    //push the clicked results to a new array
    rmResultsArr.push(availableResults[availableResults.indexOf(event.target.innerHTML)])

    //push the cliked city into a new array
    rmCitiesArr.push(citiesArr[availableResults.indexOf(event.target.innerHTML)])

    //push the cliked country into a new array
    rmCountriesArr.push(countriesArr[availableResults.indexOf(event.target.innerHTML)])

    //push the cliked state into a new array
    rmStatesArr.push(statesArr[availableResults.indexOf(event.target.innerHTML)])


    citiesArr.splice(availableResults.indexOf(event.target.innerHTML), 1) //remove the clicked result from city array
    countriesArr.splice(availableResults.indexOf(event.target.innerHTML), 1) //remove the clicked result from countries array
    statesArr.splice(availableResults.indexOf(event.target.innerHTML), 1) //remove the clicked result from states array
    availableResults.splice(availableResults.indexOf(event.target.innerHTML), 1) //remove the clicked result from the available results array

}

//if the city is deleted return the city again into search results
function returnRemovedResult(index) { //index: page index 

    //push the deleted city into available results, cities, countries and states arrays
    availableResults.push(rmResultsArr[index])
    citiesArr.push(rmCitiesArr[index])
    countriesArr.push(rmCountriesArr[index])
    statesArr.push(rmStatesArr[index])


    //remove the deleted city
    rmResultsArr.splice(index, 1)
    rmCitiesArr.splice(index, 1)
    rmCountriesArr.splice(index, 1)
    rmStatesArr.splice(index, 1)
}
//if the user allowed the browser to get the current location, remove the city from search results
function rmCurrntLocation(weekWeatherApi) {
    //current city index
    let cityIndex = citiesArr.indexOf(weekWeatherApi.city.name)

    //add the city to removed results array
    rmResultsArr.push(availableResults[cityIndex])
    rmCitiesArr.push(citiesArr[cityIndex])
    rmCountriesArr.push(countriesArr[cityIndex])
    rmStatesArr.push(statesArr[cityIndex])

    //remove the city from available search results array
    availableResults.splice(cityIndex, 1)
    citiesArr.splice(cityIndex, 1)
    countriesArr.splice(cityIndex, 1)
    statesArr.splice(cityIndex, 1)

}