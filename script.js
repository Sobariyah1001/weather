async function getWeatherData(city) {
    const apiKey = '8313eadfa81e8cf601942fe35948281f';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  }
  
  function showWeatherInfo(weatherData) {
    const weatherDiv = document.getElementById('weather');
  
    if (weatherData) {
      const city = weatherData.name;
      const temperature = weatherData.main.temp;
      const description = weatherData.weather[0].description;
  
      weatherDiv.innerHTML = `
        <h2>${city}</h2>
        <p>Temperature: ${temperature} °C</p>
        <p>Description: ${description}</p>
      `;
  
      const weatherCondition = weatherData.weather[0].main.toLowerCase();
      const imageUrl = getWeatherImageUrl(weatherCondition);
      const weatherImage = document.createElement('img');
      weatherImage.id = 'weather-image';
      weatherImage.src = imageUrl;
      weatherImage.alt = `Weather: ${weatherCondition}`;
      weatherDiv.appendChild(weatherImage);
    } else {
      weatherDiv.innerHTML = '<p>Failed to fetch weather data.</p>';
    }
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    const city = document.getElementById('city').value;
  
    getWeatherData(city)
      .then(weatherData => showWeatherInfo(weatherData));
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('weather-form');
    form.addEventListener('submit', handleSubmit);
  });
  
  function getWeatherImageUrl(condition) {
    switch (condition) {
      case 'clear':
        return 'http://openweathermap.org/img/wn/01d@2x.png';
      case 'clouds':
        return 'http://openweathermap.org/img/wn/02d@2x.png';
      case 'rain':
        return 'http://openweathermap.org/img/wn/10d@2x.png';
      case 'snow':
        return 'http://openweathermap.org/img/wn/13d@2x.png';
      case 'mist':
        return 'http://openweathermap.org/img/wn/50d@2x.png';
      case 'scattered':
        return 'http://openweathermap.org/img/wn/03d@2x.png';
      case 'broken':
        return 'http://openweathermap.org/img/wn/04d@2x.png';
      case 'shower':
        return 'http://openweathermap.org/img/wn/09d@2x.png';
      case 'thunderstorm':
        return 'http://openweathermap.org/img/wn/11d@2x.png';
      default:
        return 'http://openweathermap.org/img/wn/11d@2x.png';
    }
  }
  