/*Appel des modules*/
import { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";

/*Import des pages et composants*/
import "./App.css";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NotFoundPage from "./pages/NotFoundPage.js";

import Characters from "./pages/Characters";
import Comics from "./pages/Comics";
import CharacterProfile from "./pages/CharacterProfile";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Favorites from "./pages/Favorites";

/*Import des éléments de Font Awesome*/
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faEnvelope,
  faKey,
  faListAlt,
  faStar,
  faHeart,
  faTimesCircle,
  faCheck,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faEnvelope,
  faKey,
  faListAlt,
  faStar,
  faHeart,
  faTimesCircle,
  faCheck,
  faMagnifyingGlass
);

function App() {
  /*State relatif au chargement de la page*/
  const [data, setData] = useState();

  /*State relatif aux cookies*/
  const [token, setToken] = useState(Cookies.get("userToken") || null);

  // Fonction pour la gestion du cookie de connexion
  const tokenUser = (token) => {
    // Si la fonction reçoit un token en argument
    if (token) {
      //Création du cookie qui est enregistré dans le state prévu à cet effet
      Cookies.set("userToken", token, { expires: 10 });
    } else {
      // Dans le cas contraire, on supprime le cookie
      Cookies.remove("userToken");
    }
    setToken(token);
  };

  return (
    <Router>
      <Header tokenUser={tokenUser} token={token} />
      <Routes>
        <Route
          path="/"
          element={<Home tokenUser={tokenUser} token={token} />}
        />
        <Route
          path="/characters"
          element={
            <Characters
              data={data}
              setData={setData}
              limit={100}
              tokenUser={tokenUser}
              token={token}
            />
          }
        />
        <Route
          path="/comics/:characterId"
          element={
            <CharacterProfile limit={100} tokenUser={tokenUser} token={token} />
          }
        />
        <Route
          path="/comics"
          element={<Comics limit={100} tokenUser={tokenUser} token={token} />}
        />
        <Route
          path="/user/signup"
          element={<Signup tokenUser={tokenUser} token={token} />}
        />
        <Route
          path="/user/login"
          element={<Login tokenUser={tokenUser} token={token} />}
        />
        <Route
          path="/user/favorites"
          element={<Favorites tokenUser={tokenUser} token={token} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
