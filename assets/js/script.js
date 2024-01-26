/* ------------------------------- My API key ------------------------------- */
var APIKey = "863baffad00b5904efb1c287625183c4";

/* -------------------------------------------------------------------------- */
/*                   Create a listener for the Search button                  */
/* -------------------------------------------------------------------------- */
document.getElementById("search-button").addEventListener("click", displayCity);

/* ---------------------- When Search button is pressed --------------------- */
function displayCity(event) {
    console.log("Search button was pressed.");

    /* ---------------------- Prevent page from refreshing ---------------------- */
    event.preventDefault();

    /* ------------------------- Get value typed by user ------------------------ */
    var city = document.getElementById("search-input").value;
    console.log(`Input field has value "${city}".`)

    /* ------------------ Call function to get weather for city ----------------- */
    getWeather(city);

    /* ------------------- call function to create City button ------------------ */
    // TODO: Check button doesn't already exist before calling function
    createCityButton(city);

}

/* -------------------------------------------------------------------------- */
/*                      Function to get weather for city                      */
/* -------------------------------------------------------------------------- */
function getWeather(city) {


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

            /* ------------------------- Return if invalid city ------------------------- */
            if (data.length === 0) {
                console.log("Invalid city was chosen.");
                // TODO: Display Toast to say invalid city was chosen
                return;
            }

            /* -------------- Store latitude and longitude values for city -------------- */
            var lat = data[0].lat;
            var lon = data[0].lon;
            console.log(`Latitude is ${lat}`);
            console.log(`Longitude is ${lon}`);

            /* -------------------- Get the weather info for the city ------------------- */
            var queryURLWeather = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;
            // console.log(`Query URL for coordinates is: ${queryURLWeather}`);

            /* --- Call weather API to get the actual weather now we know coordinates --- */
            fetch(queryURLWeather)
                .then(function (response) {
                    // Calling .json() to access the json data stored inside the returned promise
                    return response.json();
                })
                // We store all of the retrieved data inside of an object called "data"
                .then(function (data) {

                    /* --------- There should be 40 values 5 days at 3 hourly intervals --------- */
                    for (var i = 0; i < data.cnt; i++) {

                        /* ---------------- Convert UNIX date to human-readable date ---------------- */
                        var unixDate = (data.list[i].dt) * 1000;
                        var trueDate = new Date(unixDate);
                        var dateArray = trueDate.toString().split(" ");
                        var dateDisplay = dateArray[0] + " " + dateArray[1] + " " + dateArray[2] + " " + dateArray[3];

                        if ((dateArray[4] === "12:00:00") | (i === 0)) {
                            console.log(`${i} =============================================`);
                            console.log(`Date: ${dateDisplay}`);
                            console.log(`City name: ${data.city.name}`);

                            /* -------------------------------- Get icon -------------------------------- */
                            var icon = data.list[i].weather[0].icon;
                            var iconURL = "http://openweathermap.org/img/w/" + icon + ".png";
                            console.log(`Icon: ${icon}`);

                            /* ---------------- Get temp in Kelvin and convert to Celcius --------------- */
                            var tempC = (data.list[i].main.temp - 273.15);
                            tempC = tempC.toFixed(2);
                            console.log(`Temperature: ${tempC} Celcius`);

                            /* ------------------------------ Get humidity ------------------------------ */
                            var humidity = data.list[i].main.humidity;
                            console.log(`Humidity: ${humidity} %`);

                            /* --- Get wind speed and convert from metres per second to miles per hour -- */
                            mph = (data.list[i].wind.speed * 2.23694);
                            mph = mph.toFixed(1);
                            console.log(`Wind speed: ${data.list[i].wind.speed} MPH`);

                            /* ----------------------------- Current weather ---------------------------- */
                            if (i === 0) {

                                /* ------- Get the HTML element where we want to write the weather to ------- */
                                var targetSection = document.getElementById("today");

                                /* --------------------------- Clear previous info -------------------------- */
                                targetSection.innerHTML = "";

                                /* ------ Create the necessary paragraph elements to store the info ------ */
                                var cityEl = document.createElement("p");
                                var tempEl = document.createElement("p");
                                var windEl = document.createElement("p");
                                var humidityEl = document.createElement("p");

                                /* --------- Set the text or HTML for the elements we want to create -------- */
                                cityEl.innerHTML = "<strong>" + city + " (" + dateDisplay + " at " + dateArray[4] + ") <img src='" + iconURL + "'></strong>";
                                tempEl.textContent = "Temp: " + tempC + " ℃";
                                windEl.textContent = "Wind: " + mph + " MPH";
                                humidityEl.textContent = "Humidity: " + humidity + "%";

                                /* --------------------- Create the elements on the page -------------------- */
                                targetSection.appendChild(cityEl);
                                targetSection.appendChild(tempEl);
                                targetSection.appendChild(windEl);
                                targetSection.appendChild(humidityEl);
                            }
                        }
                    }
                });
        });
}

/* -------------------------------------------------------------------------- */
/*                 Event listener when City button is pressed                 */
/* -------------------------------------------------------------------------- */

/* ------- Add a listener to the container containing the city buttons ------ */
var container = document.getElementById("history");
container.addEventListener("click", handleButtonClick);

/* ----------- Function to handle the button click for city button ---------- */
function handleButtonClick(event) {
    
    /* ----- Check if  clicked element is button with "city" data attribute ----- */
    // console.log("Inside the city button event listener");
    if (event.target.tagName === "BUTTON" && event.target.dataset.city) {
        // Access the data attribute value
        var cityValue = event.target.dataset.city;
        console.log(`Will need to fetch weather info for ${cityValue}`);
        getWeather(cityValue);
    }
}

/* -------------------------------------------------------------------------- */
/*                       Function to create City button                       */
/* -------------------------------------------------------------------------- */
function createCityButton(city) {

    // Step 0: Get the appropriate element from the HTML to insert the buttons in
    var targetSection = document.getElementById("history");

    // Step 1: Create the button element
    var button = document.createElement("button");

    // Step 2: Set button attributes
    button.setAttribute("data-city", city);
    button.setAttribute("class", "cityButton");
    button.setAttribute("type", "button");

    // Step 3: Add text to the button
    button.textContent = city;

    // Step 4: Append the button to the HTML document
    targetSection.appendChild(button);

}