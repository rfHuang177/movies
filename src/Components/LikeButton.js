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
  const isLiked = movies.some((movie) => movie.id === id);

  const toggleLike = () => {
    fetch(
      `https://api.themoviedb.org/3/account/${accountId}/favorite?api_key=${apiKey}&session_id=${sessionId}`,
      {
        method: "post",
        headers: { "content-type": "application/json;charset=utf-8" },
        body: JSON.stringify({
          media_type: "movie",
          media_id: id,
          favorite: !isLiked,
        }),
      }
    )
      .then((res) => {
        console.log(res.json());
        // alert(
        //   isLiked
        //     ? "You have unliked this movie."
        //     : "You have Liked this movie!"
        // );
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <AiTwotoneHeart
        className={isLiked ? "liked-icon" : "like-icon"}
        id={id}
        onClick={toggleLike}
      ></AiTwotoneHeart>
    </div>
  );
}
