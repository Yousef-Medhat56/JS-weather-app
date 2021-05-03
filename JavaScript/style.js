//the styles added by JS

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