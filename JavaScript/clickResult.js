//html elements | the content of each single page
let pageContent = mainContainer.innerHTML



function clickResult(event) {

    //after clicking the result : cancel the blur effect & clear the search bar
    emptySearchBar(searchBarIndex)


    //add new page with the searched city data
    mainContainer.innerHTML += pageContent

    //add keyup event to the new search bar
    addKeyUpEv()

    //fetch the searched city API
    fetchResult(event)

}

//fetch the searched city API
function fetchResult(event) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${citiesArr[resultContainer.indexOf(event.target.innerHTML)]},${statesArr[resultContainer.indexOf(event.target.innerHTML)]},
    ${countriesArr[resultContainer.indexOf(event.target.innerHTML)]}&appid=${apiKey}&units=metric`)
        .then(result => result.json())
        .then(data => {
            console.log(data)
            collectWeatherData(data)

        })
}