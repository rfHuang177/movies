import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from './Card';
import Genres from './Genres';
import './App.css';
import { BASE_URL, API_KEY, IMG_SRC_BASE } from './constant';

function DetailPage() {
  const [vote, setVote] = useState(0);
  const [movie, setMovie] = useState('');

  const params = useParams();
  const movieId = params.id;

  useEffect(() => {
    fetch(`${BASE_URL}/${movieId}?api_key=${API_KEY}&language=en-US`, {
      method: 'get',
    })
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
        setMovie(resp);
      });
  }, []);

  const imgSrc = `${IMG_SRC_BASE}/${movie.poster_path}`;

  return (
    <div>
      <h3>{movie.original_title}</h3>
      <div>
        <img className="detail-poster" src={imgSrc} alt="no image" />
      </div>
      <div>
        <h6>Release date:</h6>
        <p>{movie.release_date}</p>
      </div>
      <div>
        <h6>Overview:</h6>
        <p>{movie.overview}</p>
      </div>
      <div>
        <h6>Genres:</h6>
        <p>
          <Genres key={movie.id} genresArray={movie.genres} />
        </p>
      </div>
      <div>
        <h6>Average Rating:</h6>
        <p>{movie.vote_average}</p>
      </div>
      <div>
        <h6>Your Rating:</h6>
      </div>
      <div>
        <h6>Production companies:</h6>
      </div>
    </div>
  );
}

export default DetailPage;
