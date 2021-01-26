import logo from "./TMDB-logo.svg";
import "./Components/App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import DetailPage from "./Components/DetailPage";
import Home from "./Components/Home";

function App() {
  return (
    <Router>
      <div className="page-content">
        <div className="title-container">
          <img src={logo} className="main-icon" alt="TMDB LOGO" />
          <ul className="home-liked-container">
            <li className="HOME">
              <Link to="/">HOME</Link>
            </li>
            <li className="LIKED LIST">
              <Link to="/LIKEDLIST">LIKED LIST</Link>
            </li>
          </ul>
        </div>

        <Route exact path="/" component={Home} />
        <Route exact path="/detail/:id" component={DetailPage} />
      </div>
    </Router>
  );
}

export default App;
