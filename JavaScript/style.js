//the styles added by JS


let rightBtn //right buttons
let leftBtn //left buttons
let pagesLength //number of pages

/*keep the hover effect on the search bar and the search icon, although the user removed the cursor out of them 
by changing their class names and add the hover styles to these new classes*/
let keepHoverEffect = index => { //index :page index
    document.querySelectorAll(".search-container-div div div")[index].classList = "hover-search-icon"
    document.querySelectorAll(".search-container-div div input")[index].classList = "hover-search-input"

}

/*remove hover the effect :if the search bar is empty and the mouse is out of the search bar*/
let rmHoverEffect = index => { //index :page index
    document.querySelectorAll(".search-container-div div div")[index].classList = "search-icon"
    document.querySelectorAll(".search-container-div div input")[index].classList = "searchbar-input"

}

//show right and left buttons
let showBtn = () => {
    //add transitionDuration value to the main container
    mainContainer.style.transitionDuration = "0.4s"

    //get all right buttons
    rightBtn = document.querySelectorAll(".right-btn")

    //get all left buttons
    leftBtn = document.querySelectorAll(".left-btn")

    //get the number of pages
    pagesLength = document.querySelectorAll(".container").length

    //when a new page is adde (the number of pages >1)
    if (pagesLength > 1) {
        //show left button of the first page and hide the last one
        rightBtn[0].style.visibility = "hidden"
        leftBtn[0].style.visibility = "visible"

        //show right button of the last page and hide the first one
        leftBtn[pagesLength - 1].style.visibility = "hidden"
        rightBtn[pagesLength - 1].style.visibility = "visible"


        //show both of the right and the left buttons of the pages between the first and the last page
        for (let x = 0; x < (pagesLength - 2); x++) {
            rightBtn[x + 1].style.visibility = "visible"
            leftBtn[x + 1].style.visibility = "visible"
        }
    }

    //if there is one page only (one city)
    else {
        rightBtn[0].style.visibility = "hidden"
        leftBtn[0].style.visibility = "hidden"
    }
}

//increase the main container width when a new city(page) is added 
let stretchMainCo = () => {
    //make the main container width equals the sum of all pages
    mainContainer.style.width = `${document.querySelectorAll(".container").length * 100}vw`
}

//Function that are called onclick buttons

//onclick left button function
let clickSlideBtn = (event, slideDirection) => {
    //get the button index
    let BtnIndex = (Array.from(document.getElementsByClassName(`${event.target.className}`))).indexOf(event.target)

    //add CSS transform translate property to the main container
    mainContainer.style.transform = `translateX(${-100*(BtnIndex+(slideDirection))}vw)`
}


//control search bar display
function searchBarDisplay() {

    let ctrlSearchDisplay = displayValue => {
        for (let x = 0; x < document.querySelectorAll(".container").length; x++) { //select all the search bars
            document.querySelectorAll(".search-bar-container")[x].style.display = displayValue //change their display value
        }
    }

    //Hide the search bar if there are 5 pages(cities)
    if (document.querySelectorAll(".container").length == 5) { //check if the pages number is five
        ctrlSearchDisplay("none")
    }

    //show the search bar if the number of pages is less than that
    else {
        ctrlSearchDisplay("flex")
    }
}

//control delete button display
function delBtnDisplay() {

    let ctrlDelBtnDisplay = displayValue => {
        for (let x = 0; x < document.querySelectorAll(".container").length; x++) { //select all the delete buttons
            document.querySelectorAll(".delete-button")[x].style.display = displayValue //change their display value
        }
    }

    //check if the number of pages is bigger than to prevent removing the only page
    if ((document.querySelectorAll(".container").length > 1)) {

        // show delete buttons
        ctrlDelBtnDisplay("flex")
    }

    //if their is one page only
    else {
        //hide delete button
        ctrlDelBtnDisplay("none")
    }
}


//remove page oncllick delet button
let rmPage = event => {
    //get the page index by the button index
    let pageIndex = (Array.from(document.getElementsByClassName(`${event.target.className}`))).indexOf(event.target)


    //control the transition duration of the main container 
    let ctrlTransDur = () => {

        //if the clicked delete button is of the last page 
        if (pageIndex == document.querySelectorAll(".container").length - 1) {
            //cancel the transtision duration 
            mainContainer.style.transitionDuration = "0s"

        }
        //if the clicked delete button is of any other page
        else {
            //change the transition duration value
            mainContainer.style.transitionDuration = "0.4s"
        }
    }

    ctrlTransDur() //control the transition duration of the main container 

    /*add tranform translateX value to the main container deleted page isn't the first page
    and cancel it if the it is the first page*/
    mainContainer.style.transform = pageIndex > 0 ? `translateX(${-100*(pageIndex-1)}vw)` : `translateX(0vw)`

    //remove the page
    document.querySelectorAll(".container")[pageIndex].remove()

    //check the display of the search bars : show the search bars if they were hidden
    searchBarDisplay()

    //check the display of delete buttons : hide the delete button if there is one page only
    delBtnDisplay()

    //resize the main container
    stretchMainCo()

    //reorganize the slide buttons
    showBtn()
}