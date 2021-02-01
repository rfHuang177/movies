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

  useEffect(async () => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setMovies(res.results);
      });
  }, [page, category]);

  const sessionId = localStorage.getItem("session_id");
  const userName = localStorage.getItem("username");

  console.log(userName);
  //   login steps:
  // 1. Use apiKey to get a request token from https://api.themoviedb.org/3/authentication/token/new . Get the "requestToken" from the response body
  // 2. Use user's username & password and the "requestToken" to query the https://api.themoviedb.org/3/authentication/token/validate_with_login to validate the request
  // 3. Use the requestToken again to query the https://api.themoviedb.org/3/authentication/session/new. Get the "session_id" from the respose body
  // 4. Use the apiKey & session_id to query the https://api.themoviedb.org/3/account. Get the account details and store the account ID
  // 5. Use session_id & apiKey for other API queries

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
