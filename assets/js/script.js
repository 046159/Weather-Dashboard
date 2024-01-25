/* ------------------------------- My API key ------------------------------- */
var APIKey = "863baffad00b5904efb1c287625183c4";

/* ---------------- Create a listener for the Search button ----------------- */
document.getElementById("search-button").addEventListener("click", displayCity);
function displayCity(event) {
    event.preventDefault();
    console.log(`The button with ID "${event.srcElement.id}" was pressed.`);
    var city = document.getElementById("search-input").value;
    console.log(`Input field has value "${city}".`)

    /* ------------------- Get Latitude and Longitude for City ------------------ */
    var queryURLCoordinates = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=" + APIKey;
    // console.log(`Query URL for coordinates is: ${queryURLCoordinates}`);
    fetch(queryURLCoordinates)
        .then(function (response) {
            // Calling .json() to access the json data stored inside the returned promise
            return response.json();
        })
        // We store all of the retrieved data inside of an object called "data"
        .then(function (data) {
            var lat = data[0].lat;
            var lon = data[0].lon;
            console.log(`Lat is ${lat}`);
            console.log(`Lon is ${lon}`);

            /* -------------------- Get the weather info for the city ------------------- */
            var queryURLWeather = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;
            // console.log(`Query URL for coordinates is: ${queryURLWeather}`);


            fetch(queryURLWeather)
                .then(function (response) {
                    // Calling .json() to access the json data stored inside the returned promise
                    return response.json();
                })
                // We store all of the retrieved data inside of an object called "data"
                .then(function (data) {
                    for (var i = 0; i < 40; i++) {
                        // console.log(`${i} =============================================`);
                        var unixDate = (data.list[i].dt) * 1000;
                        var trueDate = new Date(unixDate);

                        var dateArray = trueDate.toString().split(" ");
                        var dateDisplay = dateArray[0] + " " + dateArray[1] + " " + dateArray[2] + " " + dateArray[3];
                        if ((dateArray[4] === "12:00:00") | (i === 0)) {
                            console.log(`${i} =============================================`);
                            console.log(`Date: ${dateDisplay}`);
                            console.log(`City name: ${data.city.name}`);
                            console.log(`Icon: ${data.list[i].weather[0].icon}`);

                            tempC = Math.round(data.list[i].main.temp - 273.15);
                            console.log(`Temperature: ${tempC} Celcius`);
                            console.log(`Humidity: ${data.list[i].main.humidity} %`);
                            
                            // Convert from metres per second to miles per hour
                            mph = (data.list[i].wind.speed*2.23694);
                            console.log(`Wind speed: ${data.list[i].wind.speed} MPH`);
                        }
                    }
                });
        });
}