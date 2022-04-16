import { Link, useNavigate, useLocation } from "react-router-dom";

import { useState } from "react";

// Import des illustrations
import Marvel_Logo from "../assets/Marvel_Logo.svg";
import Bandeau_Header from "../assets/marvel-header-without-logo.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = (props) => {
  const { token, tokenUser } = props;

  const navigate = useNavigate();
  const location = useLocation();

  console.log("token", token);

  const [openResponsiveMenu, setOpenResponsiveMenu] = useState(false);

  const toggleResponsiveMenuButton = () => {
    if (openResponsiveMenu === false) {
      setOpenResponsiveMenu(true);
    } else {
      setOpenResponsiveMenu(false);
    }
  };

  return (
    <>
      {/* Header sur la Homepage avec l'aide de UseLocation et d'une ternaire JSX */}
      {location.pathname === "/" ? (
        <div className="header-homepage">
          {openResponsiveMenu === false && (
            <img
              src={Bandeau_Header}
              alt="bandeau-header"
              className="bandeau-header-homepage"
            />
          )}
          {openResponsiveMenu === false && (
            <div className="bandeau-container-homepage">
              <div className="subscribe-section-header-container">
                <div className="subscribe-section-header">
                  <h1>Explore the Marvel world</h1>
                  <p>
                    The Marvel's vast library of comics—from what's coming up,
                    to 70 years ago.
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
          )}
          <div className="header-container">
            <div className="logo-container">
              {/* <Link to="/"> */}
              <img
                src={Marvel_Logo}
                onClick={() => {
                  setOpenResponsiveMenu(false);
                  navigate("/");
                }}
              />
              {/* </Link> */}
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

            {/** Bouton responsive pour afficher le menu */}
            <div className="navigation-responsive-button-container">
              <FontAwesomeIcon
                icon="align-justify"
                className="navigation-responsive-button"
                onClick={() => toggleResponsiveMenuButton()}
              />
            </div>
          </div>
          {openResponsiveMenu && (
            <ul className="responsive-menu-options">
              <li
                onClick={() => {
                  setOpenResponsiveMenu(false);
                  navigate("/characters");
                }}
              >
                Characters
              </li>
              <li
                onClick={() => {
                  setOpenResponsiveMenu(false);
                  navigate("/comics");
                }}
              >
                Comics
              </li>
              {/**Ternaire pour l'affichage des boutons de connexion/deconnexion + favoris si connecté */}
              {token ? (
                <>
                  <li
                    onClick={() => {
                      setOpenResponsiveMenu(false);
                      navigate("/user/favorites");
                    }}
                  >
                    Favorites
                  </li>
                  <li
                    onClick={() => {
                      setOpenResponsiveMenu(false);
                      navigate("/");
                      tokenUser(null);
                    }}
                  >
                    Log out
                  </li>
                </>
              ) : (
                <>
                  <li
                    onClick={() => {
                      setOpenResponsiveMenu(false);
                      navigate("/user/login");
                    }}
                  >
                    Log in
                  </li>
                  <li
                    onClick={() => {
                      setOpenResponsiveMenu(false);
                      navigate("/user/signup");
                    }}
                  >
                    Sign up
                  </li>
                </>
              )}
            </ul>
          )}
        </div>
      ) : (
        <div
          className="header"
          style={{ height: openResponsiveMenu && "100vh" }}
        >
          {/*Header sur les autres pages du site web*/}
          {openResponsiveMenu === false && (
            <div className="bandeau-container">
              <img
                src={Bandeau_Header}
                alt="bandeau-header"
                className="bandeau-header"
              />
            </div>
          )}
          <div className="header-container">
            <div className="logo-container">
              <img
                src={Marvel_Logo}
                onClick={() => {
                  setOpenResponsiveMenu(false);
                  navigate("/");
                }}
              />
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
            {token && (
              <Link to="/user/favorites" className="responsive-favorite-button">
                <button>FAVORITES</button>
              </Link>
            )}
            {/** Bouton responsive pour afficher le menu */}
            <div className="navigation-responsive-button-container">
              <FontAwesomeIcon
                icon="align-justify"
                className="navigation-responsive-button"
                onClick={() => toggleResponsiveMenuButton()}
                style={{
                  color: openResponsiveMenu && "hsl(358, 85%, 52%)",
                }}
              />
            </div>
          </div>
          {/* Affichage du menu responsive si le state est true */}
          {openResponsiveMenu && (
            <ul className="responsive-menu-options">
              <li
                onClick={() => {
                  setOpenResponsiveMenu(false);
                  navigate("/characters");
                }}
              >
                Characters
              </li>
              <li
                onClick={() => {
                  setOpenResponsiveMenu(false);
                  navigate("/comics");
                }}
              >
                Comics
              </li>
              {/**Ternaire pour l'affichage des boutons de connexion/deconnexion + favoris si connecté */}
              {token ? (
                <>
                  <li
                    onClick={() => {
                      setOpenResponsiveMenu(false);
                      navigate("/user/favorites");
                    }}
                  >
                    Favorites
                  </li>
                  <li
                    onClick={() => {
                      setOpenResponsiveMenu(false);
                      navigate("/");
                      tokenUser(null);
                    }}
                  >
                    Log out
                  </li>
                </>
              ) : (
                <>
                  <li
                    onClick={() => {
                      setOpenResponsiveMenu(false);
                      navigate("/user/login");
                    }}
                  >
                    Log in
                  </li>
                  <li
                    onClick={() => {
                      setOpenResponsiveMenu(false);
                      navigate("/user/signup");
                    }}
                  >
                    Sign up
                  </li>
                </>
              )}
            </ul>
          )}
        </div>
      )}
    </>
  );
};

export default Header;
