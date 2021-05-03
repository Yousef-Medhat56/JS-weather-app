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
    //get all right buttons
    rightBtn = document.querySelectorAll(".right-btn")

    //get all left buttons
    leftBtn = document.querySelectorAll(".left-btn")

    //get the number of pages
    pagesLength = document.querySelectorAll(".container").length

    //when a new page is adde (the number of pages >1)
    if (pagesLength > 1) {
        //show right button of the first page and hide the last one
        rightBtn[0].style.visibility = "visible"
        leftBtn[0].style.visibility = "hidden"

        //show left button of the last page and hide the first one
        leftBtn[pagesLength - 1].style.visibility = "visible"
        rightBtn[pagesLength - 1].style.visibility = "hidden"


        //show both of the right and the left buttons of the pages between the first and the last page
        for (let x = 0; x < (pagesLength - 2); x++) {
            rightBtn[x + 1].style.visibility = "visible"
            leftBtn[x + 1].style.visibility = "visible"
        }
    }
}