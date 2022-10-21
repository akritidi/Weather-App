
// Fetch weather data for Thessaloniki
function fetchWeather() {
    const url = "https://api.openweathermap.org/data/2.5/onecall?lat=40.58725980318928&lon=22.948223362612612&exclude=hourly,minutely&appid=11b0499bd13ab56063de7565a440eb97&units=metric"

    fetch(url)
        .then((response) => response.json())
        .then((data) => renderWeather(data));

}

let weather;

// Render current weather data
function renderWeather(data) {

    weather = data;

    const temp = document.querySelector('.temp');
    const feelsLike = document.querySelector('.feels-like');
    const pressure = document.querySelector('.pressure');
    const humidity = document.querySelector('.humidity');
    const windSpeed = document.querySelector('.wind-speed');
    const windDeg = document.querySelector('.wind-deg');
    const clouds = document.querySelector('.clouds');
    const weatherIcon = document.querySelector('.weather-icon');

    const tempValue = weather.current.temp;
    const feelsLikeValue = weather.current.feels_like;
    const pressureValue = weather.current.pressure;
    const humidityValue = weather.current.humidity;
    const windSpeedValue = weather.current.wind_speed;
    const windDegValue = weather.current.wind_deg;
    const cloudsValue = weather.current.clouds;
    const weatherIconValue = weather.current.weather[0].icon;
    const weatherIconUrl = "http://openweathermap.org/img/wn/" + weatherIconValue + "@2x.png";

    temp.innerHTML = Math.round(tempValue) + "°C";
    feelsLike.innerHTML = "Feels like " + Math.round(feelsLikeValue) + "°C";
    pressure.innerHTML = "Pressure: " + pressureValue + "hPa";
    humidity.innerHTML = "Humidity: " + humidityValue + "%";
    windSpeed.innerHTML = "Wind Speed: " + windSpeedValue + "m/s";
    windDeg.innerHTML = "Wind Deg: " + windDegValue + "°";
    clouds.innerHTML = "Cloudiness: " + cloudsValue + "%";
    weatherIcon.src = weatherIconUrl;

    dropdownDates(weather);
    lineChart(weather);
}

// Show dopdown menu on click
function dropdownForecast() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        const dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

// Render the dates for the dropdown buttons
function dropdownDates(weather) {

    for (let i = 1; i < 8; i++) {
        const date = document.querySelector('#forecast-btn' + i);
        const timestamp = weather.daily[i].dt;
        const dateValue = new Date(timestamp * 1000);              //Convert timestamp to normal date
        date.innerHTML = dateValue.toLocaleDateString("en-GB");
    }
}

// Render weather data for a date selected by the user in the next 7 days
function weatherForecast(i) {

    const temp = document.querySelector('.temp-forecast');
    const feelsLike = document.querySelector('.feels-like-forecast');
    const pressure = document.querySelector('.pressure-forecast');
    const humidity = document.querySelector('.humidity-forecast');
    const windSpeed = document.querySelector('.wind-speed-forecast');
    const windDeg = document.querySelector('.wind-deg-forecast');
    const clouds = document.querySelector('.clouds-forecast');
    const weatherIcon = document.querySelector('.weather-icon-forecast');

    const tempDayValue = weather.daily[i].temp.day;
    const tempNightValue = weather.daily[i].temp.night;
    const tempValue = ((tempDayValue + tempNightValue) / 2).toFixed(2); //Mean value of day and night
    const feelsLikeDayValue = weather.daily[i].feels_like.day;
    const feelsLikeNightValue = weather.daily[i].feels_like.night;
    const feelsLikeValue = ((feelsLikeDayValue + feelsLikeNightValue) / 2).toFixed(2); //Mean value of day and night
    const pressureValue = weather.daily[i].pressure;
    const humidityValue = weather.daily[i].humidity;
    const windSpeedValue = weather.daily[i].wind_speed;
    const windDegValue = weather.daily[i].wind_deg;
    const cloudsValue = weather.daily[i].clouds;
    const weatherIconValue = weather.daily[i].weather[0].icon;
    const weatherIconUrl = "http://openweathermap.org/img/wn/" + weatherIconValue + "@2x.png";

    temp.innerHTML = Math.round(tempValue) + "°C";
    feelsLike.innerHTML = "Feels like " + Math.round(feelsLikeValue) + "°C";
    pressure.innerHTML = "Pressure: " + pressureValue + "hPa";
    humidity.innerHTML = "Humidity: " + humidityValue + "%";
    windSpeed.innerHTML = "Wind Speed: " + windSpeedValue + "m/s";
    windDeg.innerHTML = "Wind Deg: " + windDegValue + "°";
    clouds.innerHTML = "Cloudiness: " + cloudsValue + "%";
    weatherIcon.src = weatherIconUrl;
}

// Renders a line chart of maximum temperatures for the next 7 days
function lineChart(weather) {

    let maxTemp = [];

    for (let i = 1; i < 8; i++) {
        maxTemp.push(weather.daily[i].temp.max);
    }

    const xValues = [1, 2, 3, 4, 5, 6, 7];

    new Chart("lineChart", {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
                data: maxTemp,
                borderColor: "red",
                fill: false
            }]
        },
        options: {
            legend: { display: false }
        }
    });

}

fetchWeather();
