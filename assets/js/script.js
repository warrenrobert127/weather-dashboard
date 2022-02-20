var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#select-city");
var citySearchEl = document.querySelector("#current-city")
var temperatureOutputEl = document.querySelector("#temp")
var forecastInputEl = document.querySelector("#forecast-temp");


console.log(cityInputEl);

var fiveDayForecast = function (cityName) {
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityName +
    "&appid=1a32bd1a7ece5ed4c04eaf133d9d2a51";
  console.log(apiUrl);
  // make a get request to url
  fetch(apiUrl)
    .then(function (response) {
      // request was successful
      if (response.ok) {
        // console.log(response);
        response.json().then(function (data) {
          console.log(data);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to OpenWeather");
    });
    //if (cityName) {}
};

var citySubmitHandler = function () {
  // event.preventDefault();
  console.log(event);
  // get value from input element
  var selectCity = cityInputEl.value.trim();

  console.log(selectCity);
  if (selectCity) {
    fiveDayForecast(selectCity);
    cityInputEl.value = "";
  } else {
    alert("Please enter a city");
  }
};
var displayForecast = function(forecast, selectedCity) {
    // if (forecast.length === 0) {
    //     forecastInputEl.textContent = "No forecasts found.";
    //     return;
    // }
    console.log(forecast);
    console.log(selectedCity);
    // clear old content
    citySearchEl.textContent = "";
    citySearchEl.textContent = selectedCity;
    console(selectedCity)
}

cityFormEl.addEventListener("submit", citySubmitHandler)
