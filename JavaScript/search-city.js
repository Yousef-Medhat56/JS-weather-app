//Declaring new objects

//make array for all cities in (search-city.json) file
let citiesArr = []

//make array for all countries in (search-city.json) file
let countriesArr = []

//make array for all states in (search-city.json) file
let statesArr = []

//result container : combine the city, state and country names together
let resultContainer = []

//search results array
let resultsArr = []

//the index of the search bar
let searchBarIndex


//make array for all the cities on the json file
let makeJsonArr = () => {
    //call the json file
    fetch(`../json/city-names.json`).then(response => response.json()).then(data => {
        for (let x = 0; x < data.length; x++) {

            //make array for cities names only
            citiesArr.push(`${data[x]["name"]}`)

            //make array for countries names only
            countriesArr.push(`${data[x]["country"]}`)

            //make array for states names only
            statesArr.push(`${data[x]["state"]}`)

            //combine the cities, countries and states in one array
            resultContainer.push((statesArr[x]) ? //if the city has a state name
                    `${citiesArr[x]}, ${statesArr[x]} - ${countriesArr[x]}` : //write the state name in the result 
                    `${citiesArr[x]} - ${countriesArr[x]}`) //else : DON'T write the state name

        }
    })
}

makeJsonArr() //make arrays for all the cities& countriesin& states in (city-names.json)

//make array of search results that appear for the user 
let makeResultsArr = (index) => { //index : the page index

    //filtering the cities array to make choices array
    if (document.querySelectorAll(".search-city-input")[index].value.length > 0) {

        //search the results that start with the entered letters 
        resultsArr = resultContainer.filter(value => (value.toLowerCase()).startsWith(document.querySelectorAll(".search-city-input")[index].value.toLowerCase()))
    }

}

//blur all the DIVs except the search bar and its options during searching
let blurDiv = (index, blurValue) => { //index : the page index


    //blur all the DIVs 
    for (let x = 0; document.querySelectorAll(".container")[index].querySelectorAll("div").length > x; x++) {
        document.querySelectorAll(".container")[index].querySelectorAll("div")[x].style.filter = blurValue
    }

    //except the search bar and its results from the blur effect
    for (let x = 0; document.querySelectorAll(".search-city").length > x; x++) {
        document.querySelectorAll(".search-city")[x].style.filter = "none"
    }

}

//page styles if the search bar is empty
function emptySearchBar(index) { //index : the page index

    //remove the results if the search bar is empty
    document.querySelectorAll(".cities-lists-container")[index].innerHTML = ""

    //cancel the blur effect if the search bar is empty
    blurDiv(index, "none")
}

//showing the search results 
function showResultsArr(index) { //index : the page index

    //if the search bar is empty
    emptySearchBar(index)

    //function that create the search result during searching in form of (li) tags
    let createSearchResults = (maxLength) => {
        for (let x = 0; x < maxLength; x++) {
            document.querySelectorAll(".cities-lists-container")[index].innerHTML += `<li onclick = clickResult(event)>${resultsArr[x]}</li>`
        }
    }

    //showing 5 results only as maximum
    if (resultsArr.length > 5 && document.querySelectorAll(".search-city-input")[index].value.length != 0) {

        createSearchResults(5) //create 5 results only
        blurDiv(index, "blur(3px)") //add blur effects to all the page except the search bar

    }

    //showing choices of all the values in the (resultsArr)
    else if (resultsArr.length > 0 && resultsArr.length <= 5 && document.querySelectorAll(".search-city-input")[index].value.length != 0) {

        createSearchResults(resultsArr.length)
        blurDiv(index, "blur(3px)") //add blur effects to all the page except the search bar

    }

}



//add keyup event for all the searchbars
addKeyUpEv()

function addKeyUpEv() {
    for (let x = 0; x < document.querySelectorAll(".search-city-input").length; x++) {

        //add keyup event for each search bar
        document.querySelectorAll(".search-city-input")[x].addEventListener("keyup", keyUpFun)
    }
}





function keyUpFun(event) {

    //convert search bars (node list) into an (array) to can get the idex of each element in it
    let searchBarsArr = Array.from(document.querySelectorAll(".search-city-input"))

    //the index of the search that keyup event occurs on it
    searchBarIndex = searchBarsArr.indexOf(event.target)

    makeResultsArr(searchBarIndex) //make new result array after entering or removing a letter 
    showResultsArr(searchBarIndex) //show new results

}