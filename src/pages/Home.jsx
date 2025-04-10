import { useState, useEffect, useContext } from "react";
import { fetchGames } from "../services/api";
import { FavoritesContext } from "../hooks/FavoritesContext";
import GameCard from "../components/GameCard";
import Layout from "../components/Layout";
import SearchBar from "../components/SearchBar";
import "../styles/Home.scss";

import { NavLink } from "react-router-dom";

const Home = () => {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  useEffect(() => {
    fetchGames(search)
      .then((gamesData) => {
        setGames(gamesData);
      })
      .catch((err) =>
        console.error("Erreur lors du chargement des jeux : " + err.message)
      );
  }, [search]);

  return (
    <Layout>
      <div className="home-container">
        <div className="header-container">
          <NavLink to="/favorites" className="btn-favorites">
            Favories
          </NavLink>
          <SearchBar onSearch={setSearch} />
        </div>

        <ul className="card-container">
          {games.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default Home;
