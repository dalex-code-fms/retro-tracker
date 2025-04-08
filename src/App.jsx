import "./App.scss";
import React, { useState } from "react";
import SearcBar from "./SearchBar";

const App = () => {
  const [results, setResults] = useState([]);
  const API_KEY = "a3149ac5ea1c4f4283cf94feabc19deb";

  const handleSearch = async (query) => {
    try {
      const response = await fetch(
        `https://api.rawg.io/api/games?key=${API_KEY}&search=${query}`
      );
      const data = await response.json();
      setResults(data.results);
      console.log(data.results);
    } catch (error) {
      console.error("Erreur de recherche :", error);
    }
  };

  return (
    <>
      <div className="arcade">
        <div className="arcade__screen-container">
          <div className="arcade__header">
            <div className="arcade__deco-grid">
              <div className="grid"></div>
              <div className="grid"></div>
              <div className="grid"></div>
              <div className="grid"></div>
              <div className="grid"></div>
              <div className="grid"></div>
            </div>
            <div className="arcade__logo">
              <h1>RETROTRACKER</h1>
            </div>
            <div className="arcade__connexion">
              <button>Connexion</button>
            </div>
          </div>
          <div className="arcade__screen">
            <div>
              <SearcBar onSearch={handleSearch} />

              <ul className="card-container">
                {results.map((game) => (
                  <li key={game.id} className="card">
                    <p className="card-name">{game.name}</p>
                    <p className="card_date">Date: {game.released}</p>
                    <img
                      src={game.background_image}
                      alt={`${game.name} image`}
                      className="card-image"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="arcade__btn-container">
          <button className="arcade__btn push--flat"></button>
          <button className="arcade__btn push--flat"></button>
          <button className="arcade__btn push--flat"></button>
          <button className="arcade__btn push--flat"></button>
        </div>
      </div>
    </>
  );
};

export default App;
