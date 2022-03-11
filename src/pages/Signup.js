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
  // 4 : username déjà pris en BDD

  const [error, setError] = useState(0);

  // Je peux faire une fonction par input qui gère le fait d'enregistrer, dans le state correspondant, le contenu de l'input (utile seulement pour ne pas surcharger le onClick de ma balise, ici il n'y aurait qu'une ligne dans mon onClick donc ce n'est pas utile)
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Je peux aussi faire une fonction qui gère la liaison entre tous les inputs et leurs states correspondants
  const handleInputChange = (event, input) => {
    if (input === "email") {
      setEmail(event.target.value);
    } else if (input === "password") {
      setPassword(event.target.value);
    } else if (input === "confirm password") {
      setConfirmPassword(event.target.value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email && password && confirmPassword) {
      setError(0);
      if (password === confirmPassword) {
        try {
          const response = await axios.post(
            "https://marvel-app-backend-dm.herokuapp.com/user/signup",
            // "http://localhost:4000/user/signup",
            {
              // email: email,
              email,
              password,
            }
          );
          console.log(response.data);
        } catch (error) {
          // console.log(error.response.data);
          if (
            error.response.data.error === "This email has already been used"
          ) {
            setError(3);
          }
        }
      } else {
        setError(2);
      }
    } else {
      setError(1);
    }
  };

  return (
    <div className="signup-container">
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
        <input type="submit" value="Submit" className="submit-button" />
        {error === 1 ? (
          <p>Un ou plusieurs champs sont vides</p>
        ) : error === 2 ? (
          <p>Vos mots de passe ne sont pas identiques</p>
        ) : error === 3 ? (
          <p>Email déjà utilisé</p>
        ) : error === 4 ? (
          <p>Username déjà utilisé</p>
        ) : null}
      </form>
    </div>
  );
};

export default Signup;
