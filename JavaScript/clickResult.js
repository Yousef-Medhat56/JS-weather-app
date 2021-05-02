//html elements | the content of each single page
let pageContent = mainContainer.innerHTML

let rmResultsArr = new Array


function clickResult(event) {

    //after clicking the result : cancel the blur effect & clear the search bar
    emptySearchBar(searchBarIndex)


    //add new page with the searched city data
    mainContainer.innerHTML += pageContent

    //add keyup event to the new search bar
    addKeyUpEv()

    //fetch the searched city API
    fetchResult(event)

    //remove the clicked result from the available results array
    rmClickedResult(event)


}

//fetch the searched city API
function fetchResult(event) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${citiesArr[availableResults.indexOf(event.target.innerHTML)]},${statesArr[availableResults.indexOf(event.target.innerHTML)]},
    ${countriesArr[availableResults.indexOf(event.target.innerHTML)]}&appid=${apiKey}&units=metric`)
        .then(result => result.json())
        .then(data => {

            collectWeatherData(data)
        })
}

//remove the clicked results from the results array and add them to the rmResultsArr Arr
function rmClickedResult(event) {
    //push the clicked results to a new array
    rmResultsArr.push(availableResults[availableResults.indexOf(event.target.innerHTML)])

    citiesArr.splice(availableResults.indexOf(event.target.innerHTML), 1) //remove the clicked result from city array
    countriesArr.splice(availableResults.indexOf(event.target.innerHTML), 1) //remove the clicked result from countries array
    statesArr.splice(availableResults.indexOf(event.target.innerHTML), 1) //remove the clicked result from states array
    availableResults.splice(availableResults.indexOf(event.target.innerHTML), 1) //remove the clicked result from the available results array

}