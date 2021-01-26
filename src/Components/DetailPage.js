import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "./Card";

// const BASE_URL = "https://api.themoviedb.org/3/movie";
// const API_KEY = "391415faa44f91d2b92477a8db1e4c22";

function DetailPage() {
  const params = useParams();
  console.log(params.id);
  return <h1>hello</h1>;
}

export default DetailPage;
