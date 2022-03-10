import React, { useState, useEffect } from "react";
import Countries from "./components/Countries";
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
        <Countries
          filteredCountires={filteredCountires}
          showCountire={showCountire}
        ></Countries>
      </div>
    </>
  );
}

export default App;
