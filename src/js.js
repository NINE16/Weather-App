    
function searchCity(event){
  event.preventDefault()
  let city = document.querySelector("#my-city")
  let searchResult = document.querySelector("#yourcity")
  searchResult.value = searchResult.value.trim();
  city.innerHTML =  `${searchResult.value}`
}
let newCity = document.querySelector("#search-city")
newCity.addEventListener("submit", searchCity)

let now = new Date();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
let day = days[now.getDay()];
let hour = now.getHours();
let minutes = now.getMinutes();
let currentDate = document.querySelector("#current-time")
currentDate.innerHTML = `${day}, ${hour}:${minutes}`;


function showTemp(response){
  let currentTemp = Math.round(celsiusTemperature);
  let humid = Math.round(response.data.main.humidity);
  let wind = response.data.wind.speed;
  let min = Math.round(response.data.main.temp_min);
  let max = Math.round(response.data.main.temp_max);
  let descrip = response.data.weather[0].description;
  let cityName = response.data.name;

  celsiusTemperature = response.data.main.temp;

  let city = document.querySelector("#my-city")
  city.innerHTML =`${cityName}`

  let degrees = document.querySelector("#current-temp");
  degrees.innerHTML = `${currentTemp}`;

  let humidity = document.querySelector("#humid");
  humidity.innerHTML = `${humid} %`;

  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `${wind} km/h`;

  let minTemp = document.querySelector("#min");
  minTemp.innerHTML = `${min} °C`;

  let maxTemp = document.querySelector("#max");
  maxTemp.innerHTML = `${max} °C`;

  let description = document.querySelector("#details");
  description.innerHTML = `${descrip}`;

  let icon = document.querySelector("#icon");
  icon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}

newCity.addEventListener("click", updateDetails);

function formatHours(timestamp){
let date = new Date(timestamp)
let hours = date.getHours();
if (hours < 10){
  hours = `0${hours}`;
}
let minutes = date.getMinutes();
if (minutes < 10){
  minutes = `0${minutes}`;
}
return `${hours}:${minutes}`

}

function displayForecast(response){
let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML = null;
let forecast = null;
for (let index = 0; index < 6; index++) {
  forecast = response.data.list[index];
  forecastElement.innerHTML += `
  <div class="col-2">
  <h4>
      ${formatHours(forecast.dt * 1000)}
  </h4>
  <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png">
  <div class="weather-forecast-temperature">
  <strong>
      ${Math.round(forecast.main.temp_max)}°
  </strong>
   ${Math.round(forecast.main.temp_min)}°
  </div>
  </div>`;
}
}

function displayForecastHere(response){
console.log(response.data);
let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML = null;
let forecast = null;
for (let index = 0; index < 6; index++) {
  forecast = response.data.list[index];
  forecastElement.innerHTML += `
  <div class="col-2">
  <h4>
      ${formatHours(forecast.dt * 1000)}
  </h4>
  <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png">
  <div class="weather-forecast-temperature">
  <strong>
      ${Math.round(forecast.main.temp_max)}°
  </strong>
   ${Math.round(forecast.main.temp_min)}°
  </div>
  </div>`;
}
}

function search(city){
  let apiKey = `e932fdc1c2c11f3caa91241ce134875c`;
let temperature = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(temperature).then(showTemp);

apiURL =` https://api.openweathermap.org/data/2.5/forecast?q=${city},us&&appid=${apiKey}&units=metric`;
axios.get(apiURL).then(displayForecast);
}


function updateDetails(){
let searchResult = document.querySelector("#yourcity");
let city = searchResult.value;
search(city);
}


function update (){
navigator.geolocation.getCurrentPosition(showLocation);
}

function showLocation(position){
let apiKey = `e932fdc1c2c11f3caa91241ce134875c`;
let lat = position.coords.latitude;
let lon = position.coords.longitude;
let findLocation = `https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
axios.get(findLocation).then(currentCity);

apiURL =` https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
axios.get(apiURL).then(displayForecastHere);
}
function currentCity(response){
  let currentTemp = Math.round(celsiusTemperature);
  let humid = Math.round(response.data.list[0].main.humidity);
  let wind = response.data.list[0].wind.speed;
  let min = Math.round(response.data.list[0].main.temp_min);
  let max = Math.round(response.data.list[0].main.temp_max);
  let descrip = response.data.list[0].weather[0].description;
  let cityName = response.data.list[0].name;
  let icon = document.querySelector("#icon");
  icon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.list[0].weather[0].icon}@2x.png`);

  celsiusTemperature = response.data.list[0].main.temp;

  let degrees = document.querySelector("#current-temp");
  degrees.innerHTML = `${currentTemp}`;

  let humidity = document.querySelector("#humid");
  humidity.innerHTML = `${humid} %`;

  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `${wind} km/h`;

  let minTemp = document.querySelector("#min");
  minTemp.innerHTML = `${min} °C`;

  let maxTemp = document.querySelector("#max");
  maxTemp.innerHTML = `${max} °C`;

 let description = document.querySelector("#details");
  description.innerHTML = `${descrip}`;

  let name = document.querySelector("#my-city")
  name.innerHTML = `${cityName}`
}

let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", update);


function showFarenheit(event){
  event.preventDefault();
  let temperture = document.querySelector("#current-temp")
  let farenheitTemp = (celsiusTemperature * 9)/ 5 + 32;
  temperture.innerHTML = Math.round(farenheitTemp);
}

function showCelsius(event){
  event.preventDefault();
  let temperature = document.querySelector("#current-temp")
  temperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let farenheitLink = document.querySelector("#farenheit-degrees");
farenheitLink.addEventListener("click", showFarenheit)

let celsiusLink = document.querySelector("#Celsius-degrees");
celsiusLink.addEventListener("click", showCelsius);

search("Geneva");