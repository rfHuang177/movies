import React from "react";
import { AiTwotoneStar } from "react-icons/ai";
import { AiTwotoneHeart } from "react-icons/ai";
import { Link, Router } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  API_KEY as apiKey,
  SESSION_ID as sessionId,
  ACCOUNT_ID as accountId,
} from "./constant";
import LikeButton from "./LikeButton";

const IMG_SRC_BASE = `https://image.tmdb.org/t/p/w500`;

export default function Card({ id, title, voteAverage, posterPath }) {
  const imgSrc = `${IMG_SRC_BASE}/${posterPath}`;
  const [movieId, setMovieId] = useState("");

  const getId = (event) => {
    setMovieId(event.target.className);
    console.log("movieId", movieId);
  };

  const onLikeHandler = () => {
    alert(`liked ${id}`);
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
  };

  return (
    <div className="movie" id={id}>
      <div className="movie-data">
        <img className="poster" src={imgSrc} alt={title} />
        <h4 className="movie-name" onClick={getId}>
          <Link to={`/detail/${id}`}>{title}</Link>
        </h4>
        <div className="movie-vote">
          <div className="vote">
            <AiTwotoneStar className="star-icon"></AiTwotoneStar>
            <span>{voteAverage}</span>
          </div>
          <div>
            <LikeButton id={id} />
          </div>
        </div>
      </div>
    </div>
  );
}
