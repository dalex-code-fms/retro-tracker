import axios from "axios";

const API_KEY = "a3149ac5ea1c4f4283cf94feabc19deb";
const BASE_URL = "https://api.rawg.io/api";

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
  },
});

export const fetchGames = (searchQuery = "") => {
  return api
    .get("/games", {
      params: {
        search: searchQuery,
      },
    })
    .then((res) => res.data.results)
    .catch((err) => {
      throw new Error(
        "Erreur lors de la récupération des jeux : " + err.message
      );
    });
};

export const fetchGameById = (id) => {
  return api
    .get(`/games/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(
        "Erreur lors de la récupération des détails : " + err.message
      );
    });
};
