fetch("https://api.openbrewerydb.org/breweries/search?query=89440").then(function(response) {
  response.json().then(function(data) {
    console.log(data);
  });
});

