    
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

let degrees = document.querySelector("#current-temp");
let farenheit = document.querySelector("#farenheit-degrees");
let celsius = document.querySelector("#Celsius-degrees");

function changetoCelsius(){
degrees.innerHTML = `10`}

function changetoFarenheit(){
degrees.innerHTML = `66`
}
celsius.addEventListener("click", changetoCelsius);
farenheit.addEventListener("click", changetoFarenheit);

function showTemp(response){
  let currentTemp = Math.round(response.data.main.temp);
  let humid = Math.round(response.data.main.humidity);
  let wind = response.data.wind.speed;
  let min = Math.round(response.data.main.temp_min);
  let max = Math.round(response.data.main.temp_max);
  let descrip = response.data.weather[0].description;
  let cityName = response.data.name;

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

function search(city){
  let apiKey = `e932fdc1c2c11f3caa91241ce134875c`;
let temperature = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(temperature).then(showTemp);
}
search("Geneva");

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
}
function currentCity(response){
  console.log(response);
  let currentTemp = Math.round(response.data.list[0].main.temp);
  let humid = Math.round(response.data.list[0].main.humidity);
  let wind = response.data.list[0].wind.speed;
  let min = Math.round(response.data.list[0].main.temp_min);
  let max = Math.round(response.data.list[0].main.temp_max);
  let descrip = response.data.list[0].weather[0].description;
  let cityName = response.data.list[0].name;
  

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

