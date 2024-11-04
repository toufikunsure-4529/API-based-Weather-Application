async function getWeather(city = "Murshidabad") {
  //Api fecthed url collected by https://rapidapi.com/apininjas/api/weather-by-api-ninjas

  const url = `http://api.weatherapi.com/v1/current.json?key=2de8e572f9384c5fb63164018240411&q=${city}&aqi=no
`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "8354d27b7bmsh97777cb50c492afp1e23bfjsnb0834df2bbfc",
      "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
    },
  };

  //Handle Error Api
  try {
    cityName.innerHTML = city;
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 400) {
        showErrorMessage("Error fetching data. Please try again.");
      } else {
        showErrorMessage("Error fetching data. Please try again.");
      }
      return; // Exit the function on error
    }

    const result = await response.json();
    console.log(result);

    // Update the UI with the weather data
    cloud_pct.innerHTML = result.current.cloud;
    temp.innerHTML = result.current.temp_c;
    feels_like.innerHTML = result.current.feelslike_c;
    humidity.innerHTML = result.current.humidity;
    humidity2.innerHTML = result.current.humidity;
    min_temp.innerHTML = result.current.temp_c;
    max_temp.innerHTML = result.current.temp_f;
    wind_speed.innerHTML = result.current.wind_kph;
    wind_speed2.innerHTML = result.current.wind_mph;
    wind_degrees.innerHTML = result.current.wind_degree;
    sunrise.innerHTML = result.current.heatindex_c;
    sunset.innerHTML = result.current.heatindex_f;
    document.getElementById("localTime").innerHTML = result.location.localtime;

    // Show success message

    showSuccessMessage("Data fetched successfully!");

    // Update recent search data and store it in local storage
    updateRecentSearchData(city, result);
    storeRecentSearchData(city, result);
  } catch (error) {
    showErrorMessage(error);
  }
}

function updateRecentSearchData(city, result) {
  const recentSearchData = document.getElementById("recentSearchData");
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
    <th scope="row" class="text-start">${city}</th>
    <td class="tableData">${result.current.cloud}</td>
    <td class="tableData">${result.current.feelslike_c}</td>
    <td class="tableData">${result.current.humidity}</td>
    <td class="tableData">${result.current.temp_f}</td>
    <td class="tableData">${result.current.temp_c}</td>
    <td class="tableData">${result.current.heatindex_c}</td>
    <td class="tableData">${result.current.heatindex_f}</td>
    <td class="tableData">${result.current.temp_c}</td>
    <td class="tableData">${result.current.wind_degree}</td>
    <td class="tableData">${result.current.wind_kph}</td>
  `;
  recentSearchData.querySelector("tbody").appendChild(newRow);
}
// getWeather()

function storeRecentSearchData(city, result) {
  try {
    // Get existing recent searches from local storage
    const recentSearches =
      JSON.parse(localStorage.getItem("recentSearches")) || [];

    const index = recentSearches.findIndex((item) => item.city === city);
    if (index !== -1) {
      // If city exists, remove it from the array
      recentSearches.splice(index, 1);
    }

    // Add the new search to the array
    recentSearches.push({
      city: city,
      data: result,
    });

    // Store the updated array back in local storage
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  } catch (error) {
    console.error("Error storing recent searches in local storage:", error);
  }
}

// Add an event listener to the submit button
const submitButton = document.getElementById("submit");
submitButton.addEventListener("click", async (e) => {
  e.preventDefault(); // page not reload search onclick
  const cityInput = document.getElementById("cityInput");
  showSuccessMessage("Fetching Data...");
  // Disable the submit button
  submitButton.disabled = true;

  try {
    await getWeather(cityInput.value);
  } finally {
    // Re-enable the submit button
    submitButton.disabled = false;
  }
});

getWeather()

// Initial setup: Load recent searches from local storage
const storedRecentSearches =
  JSON.parse(localStorage.getItem("recentSearches")) || [];
const recentSearchData = document.getElementById("recentSearchData");

storedRecentSearches.forEach(({ city, data }) => {
  updateRecentSearchData(city, data);
});

function showSuccessMessage(msg) {
  const successMessage = document.getElementById("successMessage");
  const errorMessage = document.getElementById("errorMessage");
  errorMessage.classList.add("d-none");
  successMessage.classList.remove("d-none");
  weatherDetails.style.display = "block";
  successMessage.textContent = msg;
  setTimeout(() => {
    successMessage.classList.add("d-none");
  }, 3000);
}

function showErrorMessage(msg) {
  const successMessage = document.getElementById("successMessage");
  const errorMessage = document.getElementById("errorMessage");
  successMessage.classList.add("d-none");
  errorMessage.classList.remove("d-none");
  errorMessage.innerHTML = msg;
  weatherDetails.style.display = "none";
}

// window.addEventListener('DOMContentLoaded', async () => {
//   // Get user's current location
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(async (position) => {
//       const latitude = position.coords.latitude;
//       const longitude = position.coords.longitude;

//       // Fetch weather data using user's current location
//       try {
//         const city = await getCityName(latitude, longitude);
//         await getWeather(city);
//       } catch (error) {
//         console.error('Error getting weather for current location:', error);
//         showErrorMessage();
//       }
//     }, (error) => {
//       console.error('Error getting current position:', error);
//       showErrorMessage();
//     });
//   } else {
//     console.error('Geolocation is not supported by this browser.');
//     showErrorMessage();
//   }
// });

async function getCityName(latitude, longitude) {
  // Fetch city name from coordinates using reverse geocoding
  const reverseGeocodingUrl = `https://geocode.xyz/${latitude},${longitude}?json=1`;
  const response = await fetch(reverseGeocodingUrl);
  const data = await response.json();
  return data.city;
}
