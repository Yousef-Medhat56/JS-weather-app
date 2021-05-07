let rmResultsArr = new Array


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

    citiesArr.splice(availableResults.indexOf(event.target.innerHTML), 1) //remove the clicked result from city array
    countriesArr.splice(availableResults.indexOf(event.target.innerHTML), 1) //remove the clicked result from countries array
    statesArr.splice(availableResults.indexOf(event.target.innerHTML), 1) //remove the clicked result from states array
    availableResults.splice(availableResults.indexOf(event.target.innerHTML), 1) //remove the clicked result from the available results array

}