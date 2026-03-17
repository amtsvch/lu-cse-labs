// Setup
// access DOM Elements
const button = document.getElementById("loadWeather");
const citySelect = document.getElementById("citySelect");
const jsonOutput = document.getElementById("jsonOutput");
const locationButton = document.getElementById("useLocation");

const temperature = document.getElementById("temp");
const wind = document.getElementById("wind")
const weatherCode = document.getElementById("code")


// Restore previously selected city when the page loads
const savedCity = localStorage.getItem("selectedCity");
if (savedCity) {
    citySelect.value = savedCity;
}

// Show previously saved JSON when the page loads
const savedWeather = localStorage.getItem("lastWeatherData");
if (savedWeather) {
    jsonOutput.textContent = savedWeather;
}


// Logic / Functions - what app can do
function loadWeather(lat, lon) {
    let latitude;
    let longitude;

    if (lat === undefined || lon === undefined) {
        const coords = citySelect.value.split(",");
        latitude = coords[0];
        longitude = coords[1];
    } else {
        latitude = lat;
        longitude = lon;
    }

    // Save selected city to local storage -> it will stay selected after reload
    localStorage.setItem("selectedCity", citySelect.value);

    const url =
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,wind_speed_10m`;

    fetch(url)
        .then(response => response.json())
        .then(data => {

            console.log("Temperature:", data.current.temperature_2m);
            console.log("Weather code:", data.current.weather_code);

            // update weather values 
            temperature.textContent = data.current.temperature_2m + "°C";
            wind.textContent = data.current.wind_speed_10m + " km/h";
            weatherCode.textContent = data.current.weather_code;

            // nicely formatted JSON - add indentation (2 spaces) to make it readable
            const jsonText = JSON.stringify(data, null, 2);
            // Display saved JSON on the page
            jsonOutput.textContent = jsonText;         
            // Save JSON to local storage
            localStorage.setItem("lastWeatherData", jsonText);
        })
        .catch(error => {
            console.error("Error loading weather data:", error);
        });

}

// advanced task
function loadWeatherForCurrentLocation() {
    if (!navigator.geolocation) {
        alert("Geolocation is not supported in this browser.");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            loadWeather(lat, lon);
        },
        error => {
            console.error("Geolocation error:", error);
            alert("Could not get your location.");
        }
    );
}

// Actions - define when functions run
button.addEventListener("click", loadWeather);
locationButton.addEventListener("click", loadWeatherForCurrentLocation);