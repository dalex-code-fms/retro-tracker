import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchGameById } from "../services/api";
import Layout from "../components/Layout";
import "../styles/GameDetails.scss";
import Loader from "../components/Loader";

const formatDate = (dateString) => {
  if (!dateString) return "Non disponible";
  const [year, month, day] = dateString.split("-");
  const months = [
    "JAN",
    "FEV",
    "MAR",
    "AVR",
    "MAI",
    "JUIN",
    "JUIL",
    "AOU",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  return `${day}${" " + months[parseInt(month) - 1]}${" " + year}`;
};

const GameDetails = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchGameById(id)
      .then((gameData) => {
        setGame(gameData);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Erreur lors du chargement du jeu : " + err.message);
        setGame(null);
        setIsLoading(false);
      });
  }, [id]);

  return (
    <Layout>
      {isLoading || !game ? (
        <div className="home-container">
          <Loader />
        </div>
      ) : (
        <div className="home-container">
          <h2 className="game__title">{game.name}</h2>
          <div className="game__header-container">
            <div className="game__date-playtime">
              <p className="game__releasedDate firstReleasedDate">
                {formatDate(game.released)}
              </p>
              <p className="game__average-playtime">
                {`Temps moyen de jeu : ${game.playtime} heures`.toUpperCase()}
              </p>
            </div>

            <img
              className="game__image"
              src={game.background_image}
              alt={game.name}
            />
          </div>

          <p className="game__description">
            <span className="game__field-label">
              {"A propos".toUpperCase()}
            </span>{" "}
            {game.description_raw}
          </p>

          <div className="game__details-container">
            <p className="game__releasedDate div1">
              <span className="game__field-label">
                {"Date de sortie".toUpperCase()}
              </span>
              {game.released}
            </p>
            <p className="game__categories div2">
              <span className="game__field-label">
                {"Catégories".toUpperCase()}
              </span>
              {game.genres && game.genres.length > 0
                ? game.genres.map((cat, index) => (
                    <span key={cat.id}>
                      {cat.name}
                      {index < game.genres.length - 1 ? ", " : ""}
                    </span>
                  ))
                : "Aucune catégorie disponible"}
            </p>
            <p className="game__plateforms div3">
              <span className="game__field-label">
                {"Disponible sur".toUpperCase()}
              </span>
              {game.platforms && game.platforms.length > 0
                ? game.platforms.map((plat, index) => (
                    <span key={plat.platform.id}>
                      {plat.platform.name}
                      {index < game.platforms.length - 1 ? ", " : ""}
                    </span>
                  ))
                : "Aucune platforme disponible"}
            </p>
            <p className="game__rating div4">
              <span className="game__field-label">{"Score".toUpperCase()}</span>
              <span>{game.rating} / 5</span>
            </p>
            <p className="game__stores div5">
              <span className="game__field-label">
                {"Ou acheter".toUpperCase()}
              </span>
              {game.stores && game.stores.length > 0
                ? game.stores.map((stores, index) => (
                    <span className="game__field-value" key={stores.store.id}>
                      {stores.store.name}
                      {index < game.stores.length - 1 ? ", " : ""}
                    </span>
                  ))
                : "Aucun magasin disponible"}
            </p>
            <p className="game__tags div6">
              <span className="game__field-label">{"Tags".toUpperCase()}</span>
              {game.tags && game.tags.length > 0
                ? game.tags.map((tags, index) => (
                    <span key={tags.id}>
                      #{tags.name}
                      {index < game.tags.length - 1 ? ", " : ""}
                    </span>
                  ))
                : "Aucun tag disponible"}
            </p>
          </div>

          <p className="game__website">
            <span className="game__field-label">{"Website".toUpperCase()}</span>
            {game.website ? (
              <a href={game.website} target="_blank" rel="noopener noreferrer">
                {game.website}
              </a>
            ) : (
              "Site internet non disponible"
            )}
          </p>
        </div>
      )}
    </Layout>
  );
};

export default GameDetails;
