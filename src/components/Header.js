import { Link, useNavigate } from "react-router-dom";
import Marvel_Logo from "../assets/Marvel_Logo.svg";

const Header = (props) => {
  const { token, tokenUser } = props;

  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="header-container">
        <div className="logo-container">
          <Link to="/">
            <img src={Marvel_Logo} />
          </Link>
        </div>

        <div className="navigation-buttons-container">
          <Link to="/characters" className="navigation-buttons">
            <button>CHARACTERS</button>
          </Link>
          <Link to="/comics" className="navigation-buttons">
            <button>COMICS</button>
          </Link>
        </div>
        <div className="profile-buttons">
          {token ? (
            <button className="signout-button" onClick={() => tokenUser(null)}>
              Log out
            </button>
          ) : (
            <>
              <button
                className="signin-button"
                onClick={() => navigate("/user/signup")}
              >
                Sign up
              </button>
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
  );
};

export default Header;
