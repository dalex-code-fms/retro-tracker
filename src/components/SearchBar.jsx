import { useState } from "react";
import "../styles/SearchBar.scss";

const SearchBar = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
    if (searchInput.trim() !== "") {
      onSearch(searchInput);
    }
  };

  return (
    <div className="search-bar-container">
      <label htmlFor="search"></label>
      <input
        type="search"
        name="search"
        id="search"
        placeholder="Chercher par nom de jeu"
        onChange={handleChange}
        value={searchInput}
      />

      <button type="button" onClick={handleSearch}>
        recherche
      </button>
    </div>
  );
};

export default SearchBar;
