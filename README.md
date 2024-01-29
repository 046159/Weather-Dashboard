# Weather Dashboard

## Description 

A weather dashboard that uses Weather API to get weather information for locations specified by the user. New locations are saved as buttons and stored in local storage. They can be clicked on to retrieve the weather again without having to type the city name again. There is a reset button to clear the buttons and the data from local storage.

The URL for the application is: https://046159.github.io/Weather-Dashboard/

Below is a screenshot of the completed application:

![Screenshot of the completed application](./assets/images/Weather%20Dashboard%20screenshot.png)

## Usage 

* Launch the website.
* Click in the input box, type a city name to get the weather. 
* Click City buttons to get weather for cities previously entered.
* Click Reset button to clear City buttons.

## Credits

The following websites provided valuable input into this challenge:

* https://www.w3schools.com/
* https://stackoverflow.com/
* https://stackoverflow.com/questions/44177417/how-to-display-openweathermap-weather-icon
* https://openweathermap.org/forecast5
* https://openweathermap.org/api/geocoding-api

## License

Please refer to Github for the information on licensing.

## Tests

1. Confirm weather is retrieved for new city and button is created.
2. Confirm error is written to the console log if no city or invalid city is entered.
3. Confirm weather is retrieved if existing City button is pressed.
4. Confirm reset button clears the buttons and everything from local storage.
5. Confirm local storage is retrieved when new browser session is started.

## Future Enhancements

1. Display messages using Bootstrap Toasts.
2. Specify timezone.
3. Include Min and Max temperatures instead of just one temperature for any given day.
---
