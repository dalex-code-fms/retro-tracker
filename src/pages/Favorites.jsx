import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Layout from "../components/Layout";
import { FavoritesContext } from "../hooks/FavoritesContext";
import { fetchGameById } from "../services/api";
import GameCard from "../components/GameCard";
import "../styles/Favorites.scss";

const Favorites = () => {
  const [favoriteGames, setFavoritesGames] = useState([]);
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  useEffect(() => {
    if (favorites.length > 0) {
      Promise.all(favorites.map((gameId) => fetchGameById(gameId)))
        .then((gamesData) => setFavoritesGames(gamesData))
        .catch((err) => {
          console.error(
            "Erreur lors du chargement des favoris : " + err.message
          );
          setFavoritesGames([]);
        });
    } else {
      setFavoritesGames([]);
    }
  }, [favorites]);

  return (
    <Layout>
      <div className="home-container">
        <div className="header-container">
          <NavLink to="/" className="btn-favorites">
            retour
          </NavLink>
          <h1 className="favorites-title">Liste de mes favories</h1>
        </div>

        <ul className="card-container">
          {favoriteGames.length > 0 ? (
            favoriteGames.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            ))
          ) : (
            <p>Aucun jeu dans vos favoris pour le moment.</p>
          )}
        </ul>
      </div>
    </Layout>
  );
};

export default Favorites;
