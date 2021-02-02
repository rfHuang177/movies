import React from "react";
import { AiTwotoneStar } from "react-icons/ai";
import { AiTwotoneHeart } from "react-icons/ai";
import { Link, Router } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import {
  API_KEY as apiKey,
  SESSION_ID as sessionId,
  ACCOUNT_ID as accountId,
} from "./constant";

export default function LikeButton({ id }) {
  const [movies, setMovies] = useState([]);
  const userName = localStorage.getItem("username");
  const account = localStorage.getItem("account");

  useEffect(async () => {
    fetch(
      `https://api.themoviedb.org/3/account/${accountId}/favorite/movies?api_key=${apiKey}&session_id=${sessionId}`
    )
      .then((res) => res.json())
      .then((res) => {
        setMovies(res.results);
      });
  }, []);

  //   console.log(movies);
  //   console.log(userName);
  //   console.log(account.username);

  const onLikeHandler = () => {
    console.log(movies);
    if (!isLiked) {
      alert(`liked ${id}`);
      window.location.reload();
      fetch(
        `https://api.themoviedb.org/3/account/${accountId}/favorite?api_key=${apiKey}&session_id=${sessionId}`,
        {
          method: "post",
          headers: { "content-type": "application/json;charset=utf-8" },
          body: JSON.stringify({
            media_type: "movie",
            media_id: id,
            favorite: true,
          }),
        }
      )
        .then((res) => console.log(res.json()))
        .catch((err) => console.log(err));
    }
  };

  const offLikeHandler = () => {
    if (isLiked) {
      alert(`unliked ${id}`);
      window.location.reload();
      fetch(
        `https://api.themoviedb.org/3/account/${accountId}/favorite?api_key=${apiKey}&session_id=${sessionId}`,
        {
          method: "post",
          headers: { "content-type": "application/json;charset=utf-8" },
          body: JSON.stringify({
            media_type: "movie",
            media_id: id,
            favorite: false,
          }),
        }
      )
        .then((res) => console.log(res.json()))
        .catch((err) => console.log(err));
    } else {
      alert(`You have Liked this movie!`);
    }
  };

  const isLiked = movies.some((movie) => movie.id === id);

  //   console.log(movies.some(id));

  if (isLiked) {
    return (
      <div>
        <AiTwotoneHeart
          className="liked-icon"
          id={id}
          onClick={offLikeHandler}
        ></AiTwotoneHeart>
      </div>
    );
  } else {
    return (
      <div>
        <AiTwotoneHeart
          className="like-icon"
          id={id}
          onClick={onLikeHandler}
        ></AiTwotoneHeart>
      </div>
    );
  }
}
