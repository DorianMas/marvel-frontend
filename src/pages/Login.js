import axios from "axios";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const { tokenUser } = props;

  const navigate = useNavigate();

  /*State pour stocker l'email*/
  const [email, setEmail] = useState("");

  /*State pour stocker le mot de passe*/
  const [password, setPassword] = useState("");

  /*State pour les messages d'erreur*/
  const [errorMessage, setErrorMessage] = useState("");

  // Fonction pour détecter et enregistrer l'email entré dans le champ du formulaire
  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  // Fonction pour détecter et enregistrer le mot de passe entré dans le champ du formulaire
  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  // Fonction qui envoie une requête au serveur avec le mot de passe et l'email entrés dans le formulaire
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        "http://localhost:4000/user/login",
        // "https://marvel-app-backend-dm.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        }
      );

      // Si le serveur renvoie un token, on fait appel à la fonction tokenUser avec en argument le token réceptionné
      if (response.data.token) {
        tokenUser(response.data.token);
        // puis redirection vers la page d'accueil
        navigate("/");
      }
    } catch (error) {
      if (error.response.status === 400 || error.response.status === 401) {
        setErrorMessage("L'e-mail ou le mot de passe associé n'existe pas");
      }
    }
  };

  return (
    <div className="signup-container">
      <h2>SE CONNECTER</h2>
      <span style={{ color: "red", fontSize: 20 }}>{errorMessage}</span>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          placeholder="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit" value="Submit" className="submit-button">
          Connexion
        </button>
      </form>
      <a onClick={() => navigate("/signup")}>
        Pas encore de compte ? Créez-en un !
      </a>
    </div>
  );
};

export default Login;
