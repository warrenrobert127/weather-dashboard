var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#select-city");
var citySearchEl = document.querySelector("#current-city");
var forecastInputEl = document.querySelector("#forecast-container");
var tempOutputEl = document.querySelector("#temp");
var windOutput = document.querySelector("#wind");
var humidityOutputEl = document.querySelector("#humidity");
var uvOutputEl = document.querySelector("#uv-index");
var foreCastOne = document.querySelector("#date1");
var foreCastTwo = document.getElementById("date2");
var foreCastThree = document.getElementById("date3");
var foreCastFour = document.getElementById("date4");
var foreCastFive = document.getElementById("date5");
var cityList = document.querySelector("#savedCities");
var savedCities = [];
console.log(foreCastOne);

var dateTime = luxon.DateTime.now().toFormat("MMMM dd, yyyy");
var dayOneDate = luxon.DateTime.now()
  .plus({ days: 1 })
  .toFormat("MMMM dd, yyyy");
var dayTwoDate = luxon.DateTime.now()
  .plus({ days: 2 })
  .toFormat("MMMM dd, yyyy");
var dayThreeDate = luxon.DateTime.now()
  .plus({ days: 3 })
  .toFormat("MMMM dd, yyyy");
var dayFourDate = luxon.DateTime.now()
  .plus({ days: 4 })
  .toFormat("MMMM dd, yyyy");
var dayFiveDate = luxon.DateTime.now()
  .plus({ days: 5 })
  .toFormat("MMMM dd, yyyy");
console.log(dayOneDate);

var fiveDayForecast = function (cityName) {
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityName +
    "&units=imperial&appid=1a32bd1a7ece5ed4c04eaf133d9d2a51";
  console.log(apiUrl);
  // make a get request to url
  fetch(apiUrl)
    .then(function (response) {
      // request was successful
      if (response.ok) {

        response.json().then(function (data) {
          citySearchEl.textContent = "";

          displayForecast(data, cityName);
          var lat = data.city.coord.lat;
          var long = data.city.coord.lon;
          getUV(lat, long);
          displayFiveDay(data.list)
          displayCityList(data.city.cityName)
          var city = data.city.name
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to OpenWeather");
    });

};

var citySubmitHandler = function () {
  event.preventDefault();
  console.log(event);
  // get value from input element
  var selectCity = cityInputEl.value.trim();

  if (selectCity) {
    fiveDayForecast(selectCity);
    cityInputEl.value = "";
  } else {
    alert("Please enter a city");
  }
  savedCities.push(selectedCity);

  
  localStorage.setItem("cities", JSON.stringify(savedCities));
};
var displayForecast = function (forecast, selectCity) {
  // if (forecast.length === 0) {
  //     forecastInputEl.textContent = "No forecasts found.";
  //     return;
  // }
  console.log();
  var iconcode = data.list[0].weather[0].icon;
  var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
  $("#icon-current").attr("src", iconurl);
  //  savedCities = JSON.parse(localStorage.getItem("cities"));
  //     // clear old content
  $(citySearchEl).attr("class", "is-size-3");
  citySearchEl.textContent = "    " + selectedCity + "   (" + dateTime + ")";
  console.log(selectedCity);
};

cityFormEl.addEventListener("submit", citySubmitHandler);

var getUV = function (lat, long) {
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    long +
    "&units=imperial&exclude=hourly,minutely,alerts&appid=1a32bd1a7ece5ed4c04eaf133d9d2a51";
  fetch(apiUrl).then(function (response) {
    response.json().then(function (data) {
      //     displayUvIndex(data)
      console.log(data);
      var uvIndex = data.current.uvi;
      displayUvIndex(uvIndex);
      var humidity = data.current.humidity;
      humidityOutputEl.innerHTML = " " + humidity + "%";

      var windSpeed = data.current.wind_speed;
      windOutput.innerHTML = " " + windSpeed + " MPH";

      var temp = Math.floor(data.current.temp);
      tempOutputEl.innerHTML = " " + temp + " ℉";

      var city = data;
    });
  });
};

var displayUvIndex = function (uvIndex) {
  console.log(uvIndex);
  uvOutputEl.textContent = "";

  if (uvIndex <= 2.99) {
    uvOutputEl.className += "has-background-success";
    uvOutputEl.innerHTML = " " + uvIndex;
  } else if (uvIndex >= 3 && uvIndex <= 5.99) {
    uvOutputEl.className += "has-background-warning";
    uvOutputEl.innerHTML = " " + uvIndex;
  } else if (uvIndex >= 6 && uvIndex <= 7.99) {
    uvOutputEl.style.backgroundColor = "orange";
    uvOutputEl.innerHTML = " " + uvIndex;
  } else if (uvIndex >= 8 && uvIndex <= 10.99) {
    uvOutputEl.className += "has-background-danger";
    uvOutputEl.innerHTML = " " + uvIndex;
  } else {
    uvOutputEl.style.backgroundColor = "#EE82EE";
    uvOutputEl.innerHTML = " " + uvIndex;
  }
};
var displayFiveDay = function (forecast) {
  // itereate over the forecast to get just 5 days add 8 to i to adjust for 3 hour forecasts
  for (var i = 5; i < forecast.length; i += 8) {
    console.log(forecast[0].weather[0].icon);
    console.log(forecast[i].dt_txt);
  }

  foreCastOne.textContent = forecast[0].dt_txt;
  // pull icon code and display
  var iconcode = forecast[0].weather[0].icon;
  var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
  $("#icon1").attr("src", iconurl);
  var temp1 = document.querySelector("#temp1");
  temp1.textContent = "Temp: " + Math.floor(forecast[0].main.temp) + " ℉";

  var wind1 = document.querySelector("#wind1");
  wind1.textContent = forecast[0].wind.speed + " MPH";
  var humid1 = document.querySelector("#humidity1");
  humid1.textContent = "Humidity: " + forecast[0].main.humidity + " %";

  // second day
  var iconcode = forecast[1].weather[0].icon;
  var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
  $("#icon2").attr("src", iconurl);
  var temp2 = document.querySelector("#temp2");
  temp2.textContent = "Temp: " + Math.floor(forecast[1].main.temp) + " ℉";

  var wind2 = document.querySelector("#wind2");
  wind2.textContent = forecast[1].wind.speed + " MPH";
  var humid2 = document.querySelector("#humidity2");
  humid2.textContent = "Humidity: " + forecast[1].main.humidity + " %";

  // third day
  var iconcode = forecast[2].weather[0].icon;
  var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
  $("#icon3").attr("src", iconurl);
  var temp3 = document.querySelector("#temp3");
  temp3.textContent = "Temp: " + Math.floor(forecast[2].main.temp) + " ℉";

  var wind3 = document.querySelector("#wind3");
  wind3.textContent = forecast[2].wind.speed + " MPH";
  var humid3 = document.querySelector("#humidity3");
  humid3.textContent = "Humidity: " + forecast[2].main.humidity + " %";

  // fourth day
  var iconcode = forecast[3].weather[0].icon;
  var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
  $("#icon4").attr("src", iconurl);
  var temp4 = document.querySelector("#temp4");
  temp4.textContent = "Temp: " + Math.floor(forecast[3].main.temp) + " ℉";

  var wind4 = document.querySelector("#wind4");
  wind4.textContent = forecast[3].wind.speed + " MPH";
  var humid4 = document.querySelector("#humidity4");
  humid4.textContent = "Humidity: " + forecast[3].main.humidity + " %";

  //fith day
  var iconcode = forecast[4].weather[0].icon;
  var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
  $("#icon5").attr("src", iconurl);
  var temp5 = document.querySelector("#temp5");
  temp5.textContent = "Temp: " + Math.floor(forecast[4].main.temp) + " ℉";

  var wind5 = document.querySelector("#wind5");
  wind5.textContent = forecast[4].wind.speed + " MPH";
  var humid5 = document.querySelector("#humidity5");
  humid5.textContent = "Humidity: " + forecast[4].main.humidity + " %";
};
