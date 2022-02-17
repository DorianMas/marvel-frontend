import { Link, useNavigate } from "react-router-dom";
import Marvel_Logo from "../assets/Marvel_Logo.svg";

const Header = () => {
  return (
    <div className="header-container">
      <div className="logo-container">
        <Link to="/">
          <img src={Marvel_Logo} />
        </Link>
      </div>
      <div className="searchbar-container">
        <input type="search" placeholder="En cours..." />
      </div>
      <div className="navigation-buttons-container">
        <Link to="/characters" className="navigation-buttons">
          Personnages
        </Link>
        <button>Comics</button>
        <button>Favoris</button>
      </div>
    </div>
  );
};

export default Header;
