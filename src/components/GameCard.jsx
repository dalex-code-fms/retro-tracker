import { NavLink } from "react-router-dom";
import "../styles/GameCard.scss";
import whiteStar from "../assets/icons/white-star.png";
import goldStar from "../assets/icons/gold-star.png";

const GameCard = ({ game, favorites, toggleFavorite }) => {
  return (
    <li className="card">
      <p className="card-name">{game.name}</p>
      <p className="card_date">Date: {game.released}</p>
      <NavLink key={game.id} to={`/gameDetails/${game.id}`}>
        <img
          src={game.background_image}
          alt={game.name}
          className="card-image"
        />
      </NavLink>
      <button className="favorite-btn" onClick={() => toggleFavorite(game.id)}>
        <img
          src={favorites.includes(game.id) ? goldStar : whiteStar}
          alt="favorite star"
          className="star-icon"
        />
      </button>
    </li>
  );
};

export default GameCard;
