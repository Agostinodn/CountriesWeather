import React from "react";
import SingleCountrie from "./SingleCountire";

const Countries = ({ filteredCountires, showCountire }) => {
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

export default Countries;
