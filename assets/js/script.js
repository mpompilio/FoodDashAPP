var userFormEl = document.querySelector("#user-form");
var brewInputEl = document.querySelector("#brewery");

var brewContainerEl = document.querySelector("#brew-container");
var brewSearchTerm = document.querySelector("#brew-search-term");
var pastSearches = document.querySelector(".past-searches");
var eachBrew;
var elementNumber = 0;

var loadData = [];

var getBrews = function (brew) {
  //
    var apiUrl = "https://api.openbrewerydb.org/breweries/search?query=" + brew;

    // make a request to the url
    fetch(apiUrl).then(function (response) {
        response.json().then(function (data) {
            getBrewImage(data, brew);  
            displayBrews(data, brew);
 
        });
    });
};


//Form submit when search button is pressed
var formSubmitHandler = function (event) {
    event.preventDefault();
    var brewery = brewInputEl.value.trim();

    if (brewery) {
        getBrews(brewery);
        brewInputEl.value = "";
    } else {
        alert("Please enter a Brewery Name");
    }

    console.log(event);

    loadData.push(brewery);
    saveInput();
    displayInput();
};

//Displays the loaded localStorage data into a list
var displayInput = function () {

    pastSearches.textContent = "";

    var saveArr = JSON.parse(localStorage.getItem("breweries"));

    for (var i = 0; i < saveArr.length; i++) {

        var saved = document.createElement("li");
        saved.setAttribute("id", i);
        saved.classList = "input-list";
        saved.textContent = saveArr[i];
        pastSearches.appendChild(saved);

        saved.addEventListener('click', function() {
            console.log("worked");
        })
    }

    

}

//Displays information about the breweries found when pulling from the API
var displayBrews = function(brews, searchTerm) {
    brewContainerEl.textContent = "";
    brewSearchTerm.textContent = searchTerm;
    console.log(brews);


    // loop over breweries
for (var i = 0; i < brews.length; i++) {
    // format brewery name
    var brewName = brews[i].name;
  
    // create a container for each brewery
    var brewEl = document.createElement("div");
    brewEl.classList.add("each-brew");
  
    // create a name of brewery
    var titleEl = document.createElement("h2");
    titleEl.textContent = brewName;
    titleEl.classList.add("title-el");

    //creates a ul that holds list items
    eachBrew = document.createElement("ul");
    eachBrew.classList.add("ul-brew");
    eachBrew.setAttribute("id", "number-" + i);

    //adds the brewery information to the lists
    var address = brews[i].street + " " + brews[i].city + " " + brews[i].state; 

    var addressEl = document.createElement("li");
    addressEl.textContent = address;
    addressEl.classList.add("list-el");

    var website = brews[i].website_url;

    var websiteEl = document.createElement("li");
    websiteEl.classList.add("list-el");
    websiteEl.setAttribute("href", website);

    var url = document.createElement("a");
    url.textContent = website;
    url.setAttribute("href", website);
    url.classList.add("href-el");


    websiteEl.appendChild(url);
    eachBrew.appendChild(titleEl);
    eachBrew.appendChild(addressEl);
    eachBrew.appendChild(websiteEl);
  
    // append to container
 
    brewEl.appendChild(eachBrew);
  
    // append container to the dom
    brewContainerEl.appendChild(brewEl);

    //stops the amount of breweries displayed
    if(i === 4){
        break;
    }

  }

}

//gets the image of brewery from Google Images based off of the Brewery Name
 var getBrewImage = function(brews) {
 
    for(i = 0; i < brews.length; i++){
    var name = brews[i].name;
    console.log(name);
    elementNumber = 0;

    var apiUrl = "https://powerful-retreat-80790.herokuapp.com/https://serpapi.com/search.json?q=" + name + "&tbm=isch&ijn=0&api_key=e434585455faef613bb541c3a061ffe05feb8013bfc2c5455180faa4f52d08b3";

    // make a request to the url
    fetch(apiUrl).then(function (response) {
        response.json().then(function (data) {
            console.log(data);
            displayImage(data);
        });
    });

    //also stops looking for images after 4 loops
    if(i === 4){
        break;
    }

    }
}

//displays the images 
var displayImage = function(images) {
  
    
    eachBrew = document.getElementById("number-" + elementNumber);
    console.log(eachBrew);

    var imgSrc = images.images_results[1].original;


    var imgEl = document.createElement("li");
    imgEl.classList.add("list-el");

    var imgTag = document.createElement("img")
    imgTag.classList.add("img-tag");
    imgTag.setAttribute("src", imgSrc);



    imgEl.appendChild(imgTag);

    eachBrew.appendChild(imgEl);
    
    elementNumber++;


} 

//Loads Data
var loadInput = function () {
    var loadBreweries = JSON.parse(localStorage.getItem('breweries'));


    for (i = 0; i < loadBreweries.length; i++) {
        loadData.push(loadBreweries[i]);

    }
}


//Saves Data
var saveInput = function () {

    localStorage.setItem('breweries', JSON.stringify(loadData));
}


//calls functions
userFormEl.addEventListener("submit", formSubmitHandler);

loadInput();
displayInput();