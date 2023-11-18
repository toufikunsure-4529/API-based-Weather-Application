async function getWeather(city) {

  //Api fecthed url collected by https://rapidapi.com/apininjas/api/weather-by-api-ninjas

  const url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '8354d27b7bmsh97777cb50c492afp1e23bfjsnb0834df2bbfc',
      'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
    }
  };


//Handle Error Api 
  try {
    cityName.innerHTML = city;
    const response = await fetch(url, options);

    if (!response.ok) {
      if (response.status === 400) {
        showErrorMessage();
      } else {
        showErrorMessage();
      }
      return;  // Exit the function on error
    }

    const result = await response.json();

    // Update the UI with the weather data
    cloud_pct.innerHTML = result.cloud_pct;
    temp.innerHTML = result.temp;
    feels_like.innerHTML = result.feels_like;
    humidity.innerHTML = result.humidity;
    humidity2.innerHTML = result.humidity;
    min_temp.innerHTML = result.min_temp;
    max_temp.innerHTML = result.max_temp;
    wind_speed.innerHTML = result.wind_speed;
    wind_speed2.innerHTML = result.wind_speed;
    wind_degrees.innerHTML = result.wind_degrees;
    sunrise.innerHTML = result.sunrise;
    sunset.innerHTML = result.sunset;

    // Show success message
    showSuccessMessage();

    // Update recent search data and store it in local storage
    updateRecentSearchData(city, result);
    storeRecentSearchData(city, result);

  } catch (error) {
    showErrorMessage();
  }
}

function updateRecentSearchData(city, result) {
  const recentSearchData = document.getElementById('recentSearchData');
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <th scope="row" class="text-start">${city}</th>
    <td class="tableData">${result.cloud_pct}</td>
    <td class="tableData">${result.feels_like}</td>
    <td class="tableData">${result.humidity}</td>
    <td class="tableData">${result.max_temp}</td>
    <td class="tableData">${result.min_temp}</td>
    <td class="tableData">${result.sunrise}</td>
    <td class="tableData">${result.sunset}</td>
    <td class="tableData">${result.temp}</td>
    <td class="tableData">${result.wind_degrees}</td>
    <td class="tableData">${result.wind_speed}</td>
  `;
  recentSearchData.querySelector('tbody').appendChild(newRow);
}

function storeRecentSearchData(city, result) {
  try {
    // Get existing recent searches from local storage
    const recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];

    // Add the new search to the array
    recentSearches.push({
      city: city,
      data: result
    });

    // Store the updated array back in local storage
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  } catch (error) {
    console.error('Error storing recent searches in local storage:', error);
  }
}

// Add an event listener to the submit button
const submitButton = document.getElementById('submit');
submitButton.addEventListener('click', async (e) => {
  e.preventDefault();// page not reload search onclick
  const cityInput = document.getElementById('cityInput');
  
  // Disable the submit button
  submitButton.disabled = true;

  try {
    await getWeather(cityInput.value);
  } finally {
    // Re-enable the submit button
    submitButton.disabled = false;
  }
});

// Initial setup: Load recent searches from local storage
  const storedRecentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
  const recentSearchData = document.getElementById('recentSearchData');

  storedRecentSearches.forEach(({ city, data }) => {
    updateRecentSearchData(city, data);
  });




function showSuccessMessage() {
  const successMessage = document.getElementById('successMessage');
  const errorMessage = document.getElementById('errorMessage');
  errorMessage.classList.add('d-none');
  successMessage.classList.remove('d-none');
  weatherDetails.style.display = "block"
  setTimeout(() => {
    successMessage.classList.add('d-none');
  }, 3000);
}


function showErrorMessage() {
  const successMessage = document.getElementById('successMessage');
  const errorMessage = document.getElementById('errorMessage');
  successMessage.classList.add('d-none');
  errorMessage.classList.remove('d-none');
  weatherDetails.style.display = "none"
}
