import React, { useState, useEffect } from "react";
import "./App.css";
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";

// OMDb API Key: c58ac8d4
const API_URL = "https://www.omdbapi.com/?apikey=c58ac8d4";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  // Functon to get data from API
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  // Initial search when website loads
  useEffect(() => {
    searchMovies("Avengers");
  }, []);

  return (
    <div className="app">
      <h1>Movie Island</h1>

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">{React.Children.toArray(movies.map((movie) => <MovieCard movie={movie} />))}</div> // 'React.Children.toArray' to fix error (https://www.amitmerchant.com/auto-assigning-unique-key-to-each-child-of-list-in-react/)
      ) : (
        <div className="empty"><h2>No movies found</h2></div>
      )}
    </div>
  );
};

export default App;
