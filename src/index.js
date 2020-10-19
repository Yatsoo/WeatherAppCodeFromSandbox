// Feature 1
let currentDate = new Date();
currentDate.getDay();
console.log(currentDate.getDay());

let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
console.log(weekDays);
console.log(weekDays[3]);

let today = weekDays[currentDate.getDay()];
console.log(today);

let h3 = document.querySelector("h3");
h3.innerHTML = `${today}`;

let months = [
  "Jan.",
  "Feb.",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug.",
  "Sept.",
  "Oct.",
  "Nov.",
  "Dec."
];
let currentMonth = months[currentDate.getMonth()];
console.log(currentMonth);

let todaysDate = currentDate.getDate();
console.log(todaysDate);

let currentYear = currentDate.getFullYear();
console.log(currentYear);

let currentHour = currentDate.getHours();
console.log(currentHour);

let currentMinutes = currentDate.getMinutes();
console.log(currentMinutes);

let monthDateHourMin = document.querySelector("#month-date");
monthDateHourMin.innerHTML = `${currentMonth} ${todaysDate}, ${currentYear} | ${currentHour}:${currentMinutes}`;
if (currentHour < 10) {
  monthDateHourMin.innerHTML = `${currentMonth} ${todaysDate}, ${currentYear} | 0${currentHour}:${currentMinutes}`;
}
if (currentMinutes < 10) {
  monthDateHourMin.innerHTML = `${currentMonth} ${todaysDate}, ${currentYear} | ${currentHour}:0${currentMinutes}`;
}

//Feature 1 (Homework - week 5)

function displayCity(event) {
  event.preventDefault();
  let input = document.querySelector("#searched-city");

  let apiKey = "75d95a41dc10b1a429fa3263e1c83647";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=metric&APPID=${apiKey}`;
  axios.get(apiUrl).then(displayWeatherInEnteredCity);

  function displayWeatherInEnteredCity(response) {
    console.log(response);
    console.log(response.data.main.temp);
    console.log(response.data.name);

    let temperature = document.querySelector("#temperature");

    let celsiusTemp = Math.round(response.data.main.temp);
    temperature.innerHTML = `${celsiusTemp}°C`;
    let searchedCity = document.querySelector("h1");
    searchedCity.innerHTML = response.data.name;

    let fahrenheitTemp = Math.round((celsiusTemp * 9) / 5 + 32);

    function showCelsiusTemp(event) {
      event.preventDefault();
      temperature.innerHTML = `${celsiusTemp}°C`;
    }

    let celsius = document.querySelector("#celsius");
    celsius.addEventListener("click", showCelsiusTemp);

    function showFahrenheitTemp(event) {
      event.preventDefault();
      temperature.innerHTML = `${fahrenheitTemp}°F`;
    }

    let fahrenheit = document.querySelector("#fahrenheit");
    fahrenheit.addEventListener("click", showFahrenheitTemp);
  }
}

let form = document.querySelector("form");
form.addEventListener("submit", displayCity);

// Bonus Feature (homework week 5)

function showCurrentPosition(position) {
  console.log(position);
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);

  let currentLatitude = position.coords.latitude;
  console.log(currentLatitude);

  let currentLongitude = position.coords.longitude;
  console.log(currentLongitude);
  let apiKey = "75d95a41dc10b1a429fa3263e1c83647";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLatitude}&lon=${currentLongitude}&units=metric&APPID=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}

navigator.geolocation.getCurrentPosition(showCurrentPosition);

function displayWeather(response) {
  console.log(response);
  console.log(response.data.main.temp);
  console.log(response.data.name);

  function displayCurrentCityTemp(event) {
    event.preventDefault();
    let currentTemp = Math.round(response.data.main.temp);
    let currentCity = response.data.name;
    let h1 = document.querySelector("h1");
    h1.innerHTML = `${currentCity}`;
    let h3 = document.querySelector("#temperature");
    h3.innerHTML = `${currentTemp}°C`;
  }
  let currentCityButton = document.querySelector("#current");
  currentCityButton.addEventListener("click", displayCurrentCityTemp);
}
