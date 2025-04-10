import { createContext, useState, useEffect } from "react";

const FavoritesContext = createContext();

const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites") || "[]");
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (gameId) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(gameId)) {
        return prevFavorites.filter((id) => id !== gameId);
      } else {
        return [...prevFavorites, gameId];
      }
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export { FavoritesProvider, FavoritesContext };
