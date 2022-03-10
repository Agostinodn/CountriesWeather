import { useState, useEffect } from "react";
import axios from "axios";

const SingleCountrie = ({ countrie }) => {
  const { name, capital, area, languages, flag } = countrie;
  const [weather, setWeather] = useState([]);

  useEffect(async () => {
    const api_key = process.env.REACT_APP_API_KEY;
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${api_key}`
      )
      .then((response) => {
        const apiResponse = response.data;
        setWeather([apiResponse]);
      })
      .catch((e) => {
        console.error("Si è verificato un errore in Weather", e);
      });
  }, []);

  if (weather.length > 0) {
    const currentWeather = weather[0];
    const icon = `http://openweathermap.org/img/wn/${currentWeather?.weather[0]?.icon}@2x.png`;
    return (
      <div className="card p-5">
        <div>
          <h1>{name}</h1>
          <p>Capital: {capital}</p>
          <p>Area: {area}</p>
          <h5>Languages</h5>
          {languages.map((language, i) => (
            <p key={language.name}>{language.name}</p>
          ))}
          <img
            style={{ maxWidth: "200px" }}
            className="card-img-top"
            src={flag}
          />
        </div>
        <div className="mt-5">
          <h3>Weather in {capital}</h3>
          <img src={icon} alt="weather icon" />
          <p>Temperature: {currentWeather?.main?.temp} °</p>
          <p>Wind: {currentWeather?.wind?.speed} m/s</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="card p-5">
        <h1>{name}</h1>
        <p>Capital: {capital}</p>
        <p>Area: {area}</p>
        <h3>Languages</h3>
        {languages.map((language, i) => (
          <p key={language.name}>{language.name}</p>
        ))}
      </div>
    );
  }
};

export default SingleCountrie;
