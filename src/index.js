function formatDate(date) {
  
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }


  
    
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let day = days[date.getDay()];
  
    return `${day} ${hours}:${minutes}`;
  }
  
  function formatHours(timestamp){
    let date = new Date(timestamp);
    let hours = date.getHours();
    if(hours < 10){
      hours = '0${hours}';
    }
    let minutes = date.getMinutes();
    if (minutes < 10){
      minutes = '0${minutes}';
    }
    return '${hours}:${minutes}';
  }

  function displayWeatherCondition(response) {
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#temperature").innerHTML = Math.round(
      response.data.main.temp
    );
  
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(
      response.data.wind.speed
    );


    

    celsiusTemperature = response.data.main.temp;

    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute(
      "src", 'http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png');
      iconElement.setAttribute("alt", response.data.weather[0].description);
    document.querySelector("#description").innerHTML =
      response.data.weather[0].main;
  }
  
  function dispalyForecast(response) {
    let forecastElement = document.querySelector("#forecast");
    let forecast = responce.data.list[0];
    console.log(forecast);

      forecastElement.innerHTML = `
      <div class="col-2">
        <h3>
          ${formatHours(forecast.dt * 1000)}
        </h3>
        <img
          src="http://openweathermap.org/img/wn/${
            forecast.weather[0].icon
          }@2x.png"
        />
        <div class="weather-forecast-temperature">
          <strong>
            ${Math.round(forecast.main.temp_max)}°
          </strong>
          ${Math.round(forecast.main.temp_min)}°
        </div>
      </div>
    `;
    
    forecast = responce.data.list[1];
    forecastElement.innerHTML += `
    <div class="col-2">
      <h3>
        ${formatHours(forecast.dt * 1000)}
      </h3>
      <img
        src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"
      />
      <div class="weather-forecast-temperature">
        <strong>
          ${Math.round(forecast.main.temp_max)}°
        </strong>
        ${Math.round(forecast.main.temp_min)}°
      </div>
    </div>
  `;
  }
  


  function searchCity(city) {
    let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeatherCondition);

    apiUrl = '`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric';
    axios.get(apiUrl).then(displayForecast);
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#city-input").value;
    searchCity(city);
  }
  
  function searchLocation(position) {
    let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${
      position.coords.latitude
    }&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  
    axios.get(apiUrl).then(displayWeatherCondition);
  }
  
  function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
  }
  
 
  
  let dateElement = document.querySelector("#date");
  let currentTime = new Date();
  dateElement.innerHTML = formatDate(currentTime);
  
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", handleSubmit);
  
  let currentLocationButton = document.querySelector("#current-location-button");
  currentLocationButton.addEventListener("click", getCurrentLocation);


  function displayFahrenheitTemperature(event){
    event.preventDefault();
    let fahrenheitTemperature = (temperatureElement.innerHTML * 0 ) / 5 + 32;
    
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  }

  
  searchCity("New York");
  
  