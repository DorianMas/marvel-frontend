import { Link, useNavigate, useLocation } from "react-router-dom";

// Import des illustrations
import Marvel_Logo from "../assets/Marvel_Logo.svg";
import Bandeau_Header from "../assets/marvel-header-without-logo.jpg";

const Header = (props) => {
  const { token, tokenUser } = props;

  const navigate = useNavigate();
  const location = useLocation();

  console.log("token", token);

  return (
    <>
      {/* Header sur la Homepage avec l'aide de UseLocation et d'une ternaire JSX */}
      {location.pathname === "/" ? (
        <div className="header-homepage">
          <div className="bandeau-container-homepage">
            <img
              src={Bandeau_Header}
              alt="bandeau-header"
              className="bandeau-header-homepage"
            />
            <div className="subscribe-section-header-container">
              <div className="subscribe-section-header">
                <h1>Explore the Marvel world</h1>
                <p>
                  The Marvel's vast library of comics—from what's coming up, to
                  70 years ago.
                </p>
                <Link to="/user/signup">
                  <button className="subscribe-button">
                    Subscribe
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="header-container">
            <div className="logo-container">
              <Link to="/">
                <img src={Marvel_Logo} />
              </Link>
            </div>
            <div className="navigation-buttons-container">
              <Link to="/characters" className="navigation-buttons">
                <button>Characters</button>
              </Link>
              <Link to="/comics" className="navigation-buttons">
                <button>COMICS</button>
              </Link>
            </div>
            <div className="profile-buttons">
              {/* On vérifie si l'utilisateur est connecté avec la props token
              pour afficher le bouton de Connexion ou de Deconnection */}
              {token ? (
                <button
                  className="signout-button"
                  onClick={() => {
                    tokenUser(null);
                    navigate("/");
                  }}
                >
                  Log out
                </button>
              ) : (
                <>
                  <button
                    className="login-button"
                    onClick={() => navigate("/user/login")}
                  >
                    Log in
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="header">
          {/*Header sur les autres pages du site web*/}

          <div className="bandeau-container">
            <img
              src={Bandeau_Header}
              alt="bandeau-header"
              className="bandeau-header"
            />
          </div>
          <div className="header-container">
            <div className="logo-container">
              <Link to="/">
                <img src={Marvel_Logo} />
              </Link>
            </div>
            <div className="navigation-buttons-container">
              <Link to="/characters" className="navigation-buttons">
                <button>Characters</button>
              </Link>
              {/*On vérifie si l'utilisateur est connecté avec le token pour
              afficher le bouton de navigation "Vos Favoris" */}
              {token && (
                <Link to="/user/favorites" className="navigation-buttons">
                  <button>FAVORITES</button>
                </Link>
              )}
              <Link to="/comics" className="navigation-buttons">
                <button>COMICS</button>
              </Link>
            </div>
            <div className="profile-buttons">
              {/*On vérifie si l'utilisateur est connecté avec la props token
              pour afficher le bouton de Connexion ou de Deconnection */}
              {token ? (
                <button
                  className="signout-button"
                  onClick={() => {
                    tokenUser(null);
                    navigate("/");
                  }}
                >
                  Log out
                </button>
              ) : (
                <>
                  <button
                    className="login-button"
                    onClick={() => navigate("/user/login")}
                  >
                    Log in
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
