import logo from "../TMDB-logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import Card from "./Card";

const BASE_URL = "https://api.themoviedb.org/3/movie";
const API_KEY = "391415faa44f91d2b92477a8db1e4c22";

function Home() {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("popular");
  const [movies, setMovies] = useState([]);

  const url = `${BASE_URL}/${category}?api_key=${API_KEY}&page=${page}`;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setMovies(res.results);
      });
  }, [page, category]);

  return (
    <>
      <div className="page-content">
        <div className="style-selector">
          <select
            className="select-style"
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
          >
            <option value="popular">Popular</option>
            <option value="now_playing">Now playing</option>
            <option value="top_rated">Top rated</option>
            <option value="upcoming">Upcoming</option>
          </select>
        </div>
        <div className="prev-next">
          <button
            className="prev-button"
            onClick={() => {
              page > 1 ? setPage(page - 1) : setPage(1);
            }}
          >
            prev
          </button>
          <div className="page-count-container">
            <p>{page}/500</p>
          </div>
          <button
            className="next-button"
            onClick={() => {
              page < 500 ? setPage(page + 1) : setPage(500);
            }}
          >
            next
          </button>
        </div>
        <div className="movie-container">
          {movies.map((movie) => (
            <Card
              key={movie.id}
              id={movie.id}
              title={movie.title}
              voteAverage={movie.vote_average}
              posterPath={movie.poster_path}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
