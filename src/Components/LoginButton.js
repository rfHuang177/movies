import React from "react";
import { AiTwotoneStar } from "react-icons/ai";
import { AiTwotoneHeart } from "react-icons/ai";
import { Link, Router } from "react-router-dom";
import { useState, useEffect } from "react";

export default function LoginButton() {
  const logOut = () => {
    localStorage.removeItem("username");
    window.location.reload();
  };
  const userName = localStorage.getItem("username");
  if (userName) {
    return (
      <div className="logout" onClick={logOut}>
        <Link to="/">Log out</Link>
      </div>
    );
  } else {
    return (
      <div className="login">
        <Link to="/log-in">Log in</Link>
      </div>
    );
  }
}
