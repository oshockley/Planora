import React, { useState, useEffect } from 'react';
import './WeatherWidget.css';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('weather_favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Mock weather data generator (in real app, you'd use a weather API)
  const generateMockWeather = (cityName) => {
    const conditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Rainy', 'Stormy'];
    const icons = ['☀️', '⛅', '☁️', '🌧️', '⛈️'];
    const randomIndex = Math.floor(Math.random() * conditions.length);
    
    return {
      city: cityName,
      temperature: Math.floor(Math.random() * 30) + 10, // 10-40°C
      condition: conditions[randomIndex],
      icon: icons[randomIndex],
      humidity: Math.floor(Math.random() * 60) + 40,
      windSpeed: Math.floor(Math.random() * 20) + 5,
      pressure: Math.floor(Math.random() * 50) + 1000,
      uvIndex: Math.floor(Math.random() * 10) + 1,
      forecast: Array.from({ length: 5 }, (_, i) => ({
        day: ['Today', 'Tomorrow', 'Day 3', 'Day 4', 'Day 5'][i],
        high: Math.floor(Math.random() * 25) + 15,
        low: Math.floor(Math.random() * 15) + 5,
        condition: conditions[Math.floor(Math.random() * conditions.length)],
        icon: icons[Math.floor(Math.random() * icons.length)]
      }))
    };
  };

  const handleSearch = async (searchCity = city) => {
    if (!searchCity.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you'd make an API call here
      const weatherData = generateMockWeather(searchCity);
      setWeather(weatherData);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = () => {
    if (weather && !favorites.some(fav => fav.city === weather.city)) {
      const newFavorites = [...favorites, { city: weather.city, addedAt: new Date().toISOString() }];
      setFavorites(newFavorites);
      localStorage.setItem('weather_favorites', JSON.stringify(newFavorites));
    }
  };

  const removeFromFavorites = (cityToRemove) => {
    const newFavorites = favorites.filter(fav => fav.city !== cityToRemove);
    setFavorites(newFavorites);
    localStorage.setItem('weather_favorites', JSON.stringify(newFavorites));
  };

  const getWeatherRecommendations = () => {
    if (!weather) return [];
    
    const recommendations = [];
    
    if (weather.temperature > 25) {
      recommendations.push("🏖️ Perfect weather for outdoor activities!");
      recommendations.push("🧴 Don't forget sunscreen and stay hydrated");
    } else if (weather.temperature < 10) {
      recommendations.push("🧥 Pack warm clothes and layers");
      recommendations.push("☕ Great weather for cozy indoor activities");
    }
    
    if (weather.condition === 'Rainy') {
      recommendations.push("☔ Bring an umbrella and waterproof jacket");
      recommendations.push("🏛️ Consider indoor attractions today");
    }
    
    if (weather.uvIndex > 7) {
      recommendations.push("🕶️ High UV index - wear sunglasses and hat");
    }
    
    return recommendations;
  };

  return (
    <div className="weather-widget-container">
      <div className="weather-header">
        <h2>🌤️ Weather Forecast</h2>
        <p>Get current weather and 5-day forecast for your travel destinations</p>
      </div>

      <div className="weather-search">
        <div className="search-bar">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name..."
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button onClick={() => handleSearch()} disabled={loading}>
            {loading ? '🔄' : '🔍'} Search
          </button>
        </div>
      </div>

      {favorites.length > 0 && (
        <div className="favorites-section">
          <h3>📍 Favorite Locations</h3>
          <div className="favorites-grid">
            {favorites.map((favorite, index) => (
              <div key={index} className="favorite-item">
                <span onClick={() => handleSearch(favorite.city)} className="favorite-city">
                  {favorite.city}
                </span>
                <button 
                  onClick={() => removeFromFavorites(favorite.city)}
                  className="remove-favorite"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {error && (
        <div className="weather-error">
          <p>❌ {error}</p>
        </div>
      )}

      {weather && (
        <div className="weather-display">
          <div className="current-weather">
            <div className="weather-main">
              <div className="weather-icon">{weather.icon}</div>
              <div className="weather-info">
                <h3>{weather.city}</h3>
                <div className="temperature">{weather.temperature}°C</div>
                <div className="condition">{weather.condition}</div>
              </div>
              <button onClick={addToFavorites} className="add-favorite-btn">
                ⭐ Add to Favorites
              </button>
            </div>
            
            <div className="weather-details">
              <div className="detail-item">
                <span className="detail-label">💧 Humidity</span>
                <span className="detail-value">{weather.humidity}%</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">💨 Wind Speed</span>
                <span className="detail-value">{weather.windSpeed} km/h</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">📊 Pressure</span>
                <span className="detail-value">{weather.pressure} hPa</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">☀️ UV Index</span>
                <span className="detail-value">{weather.uvIndex}</span>
              </div>
            </div>
          </div>

          <div className="forecast-section">
            <h4>5-Day Forecast</h4>
            <div className="forecast-grid">
              {weather.forecast.map((day, index) => (
                <div key={index} className="forecast-day">
                  <div className="forecast-day-name">{day.day}</div>
                  <div className="forecast-icon">{day.icon}</div>
                  <div className="forecast-temps">
                    <span className="high">{day.high}°</span>
                    <span className="low">{day.low}°</span>
                  </div>
                  <div className="forecast-condition">{day.condition}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="travel-recommendations">
            <h4>🎒 Travel Recommendations</h4>
            <div className="recommendations-list">
              {getWeatherRecommendations().map((rec, index) => (
                <div key={index} className="recommendation-item">
                  {rec}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {!weather && !loading && (
        <div className="weather-placeholder">
          <div className="placeholder-content">
            <div className="placeholder-icon">🌍</div>
            <h3>Search for Weather</h3>
            <p>Enter a city name to get current weather conditions and forecast for your travel destination.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;
