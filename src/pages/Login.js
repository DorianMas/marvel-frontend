import axios from "axios";

import { useState } from "react";

import Cookies from "js-cookie";

import { useNavigate } from "react-router-dom";

/*Ajout des états pour les champs de formulaire*/
const Login = (props) => {
  const { tokenUser } = props;

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /*Ajout de l'état pour le message d'erreur*/
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post("http://localhost:4000/user/login", {
        email: email,
        password: password,
      });

      console.log(response.data);

      if (response.data.token) {
        tokenUser(response.data.token);
        //redirection
        navigate("/");
      }
    } catch (error) {
      console.log("Login error ===> ", error.message);
      console.log("Catch error ===> ", error.response);
      if (error.response.status === 400 || error.response.status === 401) {
        setErrorMessage("L'e-mail ou le mot de passe associé n'existe pas");
      }
    }
  };

  return (
    /*   Objectaccount: {username: 'patrick'}email: "patrick@mail.com"token: "9jtcTr9Ofq1jGUqP3utr0dyKq8bxdefZ9UWjpQmHIsAAt3mf85O0nFOjvRFgjBew"_id: "6205449c1b4120001801837d"[[Prototype]]: Object
          iption.js:50 patrick patrick@mail.com patrick false */
    <div className="signup-container">
      <h2>Log in</h2>
      <span>{errorMessage}</span>
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
          Log in
        </button>
      </form>
      <a onClick={() => navigate("/signup")}>No account yet? Create one!</a>
    </div>
  );
};

export default Login;
