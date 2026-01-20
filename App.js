import React, { useState } from "react";

const API_KEY = "70f6e22cb0ac0c445afad7aea802e696"; 

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  // fetching weather data
  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city name.");
      setWeather(null);
      return;
    }
    try {
      setError("");
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      if (response.ok) {
        setWeather(data);
      } else {
        setWeather(null);
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to fetch data. Check your internet connection.");
      setWeather(null);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchWeather();
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={{ marginBottom: 20 }}>Weather Forecast</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyPress}
        style={styles.input}
      />
      <button onClick={fetchWeather} style={styles.button}>
        Search
      </button>

      {error && <p style={styles.error}>{error}</p>}

      {weather && (
        <div style={styles.result}>
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 400,
    margin: "50px auto",
    padding: 20,
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f0f8ff",
    borderRadius: 8,
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  input: {
    padding: 10,
    width: "70%",
    marginRight: 10,
    borderRadius: 4,
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 15px",
    borderRadius: 4,
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginTop: 10,
  },
  result: {
    marginTop: 20,
    textAlign: "left",
    borderTop: "1px solid #ccc",
    paddingTop: 20,
  },
};

export default App;
