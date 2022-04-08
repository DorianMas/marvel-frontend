import { useState } from "react";
import axios from "axios";

const Signup = () => {
  // 1 state par input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // State pour gérer les erreurs
  // 0 : pas d'erreur
  // 1 : un ou plusieurs champs sont vides
  // 2 : MDP ne sont pas identiques
  // 3 : email déjà pris en BDD
  const [error, setError] = useState(0);

  //State pour réceptionner les données du serveur
  const [data, setData] = useState();

  // Fonction qui stocke l'email entré dans le champ du formulaire
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Fonction qui gère la liaison entre tous les inputs et leurs states correspondants
  const handleInputChange = (event, input) => {
    if (input === "email") {
      setEmail(event.target.value);
    } else if (input === "password") {
      setPassword(event.target.value);
    } else if (input === "confirm password") {
      setConfirmPassword(event.target.value);
    }
  };

  // Fonction qui envoie une requête au serveur
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Avant d'envoyer la requête, on vérifie si les tous les champs sont entrés
    if (email && password && confirmPassword) {
      setError(0);
      // On vérifie également si les deux mots de passe entrés sont identiques
      if (password === confirmPassword) {
        try {
          const response = await axios.post(
            "https://marvel-app-backend-dm.herokuapp.com/user/signup",
            // "http://localhost:4000/user/signup",
            {
              email: email,
              password: password,
            }
          );
          setData(response.data);
        } catch (error) {
          console.log(error.response.data);
          if (
            error.response.data.message === "This email already has an account"
          ) {
            setError(3);
          }
        }
      } else if (confirmPassword !== password) {
        setError(2);
      }
    } else {
      setError(1);
    }
  };

  return (
    <div className="signup-container">
      {/* Si on réceptionne une réponse positive du serveur, on affiche le message de confirmation */}
      {data && (
        <p className="confirmation-message-form">SUBSCRIPTION CONFIRMED</p>
      )}
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>Sign up</h2>

        <input
          value={email}
          type="text"
          placeholder="email"
          onChange={handleEmailChange}
        />

        <input
          // value={password}
          type="password"
          placeholder="password"
          onChange={(event) => {
            handleInputChange(event, "password");
          }}
        />
        <input
          // value={password}
          type="password"
          placeholder="confirm password"
          onChange={(event) => {
            handleInputChange(event, "confirm password");
          }}
        />
        <button type="submit" value="Submit" className="submit-button">
          Submit
        </button>
        {/* Affichage des messages d'erreur en fonction du state Error */}
        {error === 1 ? (
          <p className="error-message-form">
            Un ou plusieurs champs sont vides
          </p>
        ) : error === 2 ? (
          <p className="error-message-form">
            Vos mots de passe ne sont pas identiques
          </p>
        ) : error === 3 ? (
          <p className="error-message-form">Email déjà utilisé</p>
        ) : null}
      </form>
    </div>
  );
};

export default Signup;
