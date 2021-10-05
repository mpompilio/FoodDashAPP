var userFormEl = document.querySelector("#user-form");
var brewInputEl = document.querySelector("#brewery");

var brewContainerEl = document.querySelector("#brew-container");
var brewSearchTerm = document.querySelector("#brew-search-term");


var getBrews = function (brew) {
    // format the github api url
    var apiUrl = "https://api.openbrewerydb.org/breweries/search?query=" + brew;

    // make a request to the url
    fetch(apiUrl).then(function (response) {
        response.json().then(function (data) {
            displayBrews(data, brew);
        });
    });
};

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
};

var displayBrews = function(brews, searchTerm) {
    brewContainerEl.textContent = "";
    brewSearchTerm.textContent = searchTerm;
    console.log(brews);


    // loop over repos
for (var i = 0; i < brews.length; i++) {
    // format repo name
    var brewName = brews[i].name;
  
    // create a container for each repo
    var brewEl = document.createElement("div");
    brewEl.classList.add("each-brew");
  
    // create a span element to hold repository name
    var titleEl = document.createElement("h2");
    titleEl.textContent = brewName;
    titleEl.classList.add("title-el");

    var eachBrew = document.createElement("ul");

    var address = "Address: " + brews[i].street + " " + brews[i].city + " " + brews[i].state; 

    var addressEl = document.createElement("li");
    addressEl.textContent = address;
    addressEl.classList.add("list-el");

    var website = "Website: " + brews[i].website_url;

    var websiteEl = document.createElement("li");
    websiteEl.textContent = website;
    websiteEl.classList.add("list-el");



    eachBrew.appendChild(addressEl);
    eachBrew.appendChild(websiteEl);
  
    // append to container
    brewEl.appendChild(titleEl);
    brewEl.appendChild(eachBrew);
  
    // append container to the dom
    brewContainerEl.appendChild(brewEl);
  }
}


userFormEl.addEventListener("submit", formSubmitHandler);