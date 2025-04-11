import { useState, useEffect, useContext } from "react";
import { fetchGames } from "../services/api";
import { FavoritesContext } from "../hooks/FavoritesContext";
import GameCard from "../components/GameCard";
import Layout from "../components/Layout";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";
import "../styles/Home.scss";

import { NavLink } from "react-router-dom";

const Home = () => {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  useEffect(() => {
    setIsLoading(true);
    fetchGames(search)
      .then((gamesData) => {
        setGames(gamesData);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Erreur lors du chargement des jeux : " + err.message);
        setGames([]);
        setIsLoading(false);
      });
  }, [search]);

  return (
    <Layout>
      <div className="home-container">
        <div className="header-container">
          <NavLink to="/favorites" className="btn-favorites">
            Favoris
          </NavLink>
          <SearchBar onSearch={setSearch} />
        </div>

        {isLoading ? (
          <Loader />
        ) : games.length > 0 ? (
          <ul className="card-container-home">
            {games.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            ))}
          </ul>
        ) : (
          <p>Aucun jeu trouvé.</p>
        )}
      </div>
    </Layout>
  );
};

export default Home;
