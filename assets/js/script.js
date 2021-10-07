var userFormEl = document.querySelector("#user-form");
var brewInputEl = document.querySelector("#brewery");

var brewContainerEl = document.querySelector("#brew-container");
var brewSearchTerm = document.querySelector("#brew-search-term");
var eachBrew;
var elementNumber = 0;


var getBrews = function (brew) {
    // format the github api url
    var apiUrl = "https://api.openbrewerydb.org/breweries/search?query=" + brew;

    // make a request to the url
    fetch(apiUrl).then(function (response) {
        response.json().then(function (data) {
            getBrewImage(data, brew);  
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


    // loop over breweries
for (var i = 0; i < brews.length; i++) {
    // format brewerie name
    var brewName = brews[i].name;
  
    // create a container for each brewery
    var brewEl = document.createElement("div");
    brewEl.classList.add("each-brew");
  
    // create a span element to hold repository name
    var titleEl = document.createElement("h2");
    titleEl.textContent = brewName;
    titleEl.classList.add("title-el");

    eachBrew = document.createElement("ul");
    eachBrew.classList.add("ul-brew");
    eachBrew.setAttribute("id", "number-" + i);

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

    if(i === 4){
        break;
    }

  }

}


 var getBrewImage = function(brews) {
 
    for(i = 0; i < brews.length; i++){
    var name = brews[i].name;
    console.log(name);
    elementNumber = 0;

    var apiUrl = "https://powerful-retreat-80790.herokuapp.com/https://serpapi.com/search.json?q=" + name + "&tbm=isch&ijn=0&api_key=ccd971b23596c13a0bdce3cd7b909230b0122d33a9ba9aca33d314f621af172d";

    // make a request to the url
    fetch(apiUrl).then(function (response) {
        response.json().then(function (data) {
            console.log(data);
            displayImage(data);
        });
    });

    if(i === 4){
        break;
    }

    }
}

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

userFormEl.addEventListener("submit", formSubmitHandler);