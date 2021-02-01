import React from "react";
import { AiTwotoneStar } from "react-icons/ai";
import { AiTwotoneHeart } from "react-icons/ai";
import { Link, Router } from "react-router-dom";
import { useState, useEffect } from "react";

const IMG_SRC_BASE = `https://image.tmdb.org/t/p/w500`;

export default function Card({ id, title, voteAverage, posterPath }) {
  const imgSrc = `${IMG_SRC_BASE}/${posterPath}`;
  const [movieId, setMovieId] = useState("");
  const getId = (event) => {
    setMovieId(event.target.className);
    console.log("movieId", movieId);
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
            <AiTwotoneHeart className="like-icon" id={id}></AiTwotoneHeart>
          </div>
        </div>
      </div>
    </div>
  );
}
