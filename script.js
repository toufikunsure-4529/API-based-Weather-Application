async function fetchData() {
  const url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=Seattle';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '8354d27b7bmsh97777cb50c492afp1e23bfjsnb0834df2bbfc',
      'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
    }
  };
  
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}


fetchData()