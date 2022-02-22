/*Appel des modules*/
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";

/*Import des pages et composants*/
import "./App.css";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Personnages from "./pages/Personnages";
import Comics from "./pages/Comics";
import FichePersonnage from "./pages/FichePersonnage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  /*Ajouts des cookies*/
  const [token, setToken] = useState(Cookies.get("userToken") || null);

  const tokenUser = (token) => {
    if (token) {
      //Gestion du cookie
      Cookies.set("userToken", token, { expires: 10 });
    } else {
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
            <Personnages
              isLoading={isLoading}
              setIsLoading={setIsLoading}
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
            <FichePersonnage limit={100} tokenUser={tokenUser} token={token} />
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
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
