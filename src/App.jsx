import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [findCountries, setFindCountries] = useState("");
  useEffect(async () => {
    axios.get("https://restcountries.com/v2/all").then((response) => {
      setAllCountries(response.data);
    });
  }, []);

  const handleChange = (e) => {
    setFindCountries(e.target.value);
  };

  const filteredCountires = allCountries.filter((countrie) =>
    countrie.name.toLowerCase().includes(findCountries.toLowerCase())
  );

  const showCountire = (name) => {
    setFindCountries(name);
  };

  return (
    <>
      <nav className="navbar navbar-light bg-light container-fluid px-5">
        <h1>Countries</h1>
        <input placeholder="Search" onChange={handleChange} />
      </nav>
      <div className="container d-flex flex-wrap">
        <Countrie
          filteredCountires={filteredCountires}
          showCountire={showCountire}
        ></Countrie>
      </div>
    </>
  );
}

export default App;

const Countrie = ({ filteredCountires, showCountire }) => {
  if (filteredCountires.length > 25) {
    return <p className="m-5 p-5">To many matches, specify another filter </p>;
  } else if (
    (filteredCountires.length < 25 && filteredCountires.length > 1) ||
    filteredCountires.length == 0
  ) {
    return filteredCountires.map((countrie) => (
      <div
        className="card card-body p-4 m-2 w-25"
        style={{ maxWidth: "300px", textAlign: "center" }}
        key={countrie.alpha3Code}
      >
        <h4>{countrie.name}</h4>
        <button
          className="btn btn-outline-dark m-3"
          onClick={() => showCountire(countrie.name)}
        >
          Show
        </button>
      </div>
    ));
  } else {
    return filteredCountires.map((countrie) => (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ width: "100%" }}
      >
        <SingleCountrie
          key={countrie.alpha3Code}
          countrie={countrie}
        ></SingleCountrie>
      </div>
    ));
  }
};

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
