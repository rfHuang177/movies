import logo from "./TMDB-logo.svg";
import "./Components/App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import DetailPage from "./Components/DetailPage";
import Home from "./Components/Home";
import Login from "./Components/Login";
import LoginButton from "./Components/LoginButton";
import LikedPage from "./Components/LikedPage";

function App() {
  const userName = localStorage.getItem("username");
  JSON.parse(userName);
  return (
    <Router>
      <div className="page-content">
        <div className="title-container">
          <img src={logo} className="main-icon" alt="TMDB LOGO" />
          <h1>{userName}</h1>
          <ul className="home-liked-container">
            <li className="HOME">
              <Link to="/">HOME</Link>
            </li>
            <li className="LIKED LIST">
              <Link to="/LIKEDLIST">LIKED LIST</Link>
            </li>
            <li className="RATED">
              <Link to="RATEDLIST">RATED</Link>
            </li>
          </ul>
          <div className="login">
            <LoginButton />
          </div>
        </div>

        <Route exact path="/" component={Home} />
        <Route exact path="/detail/:id" component={DetailPage} />
        <Route exact path="/LIKEDLIST" component={LikedPage} />
        <Route exact path="/log-in" component={Login} />
      </div>
    </Router>
  );
}

export default App;
