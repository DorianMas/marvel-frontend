/*Appel des modules*/
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";

/*Import des pages et composants*/
import "./App.css";
import Home from "./pages/Home";
import Header from "./components/Header";
import Personnages from "./pages/Personnages";
import FichePersonnage from "./pages/FichePersonnage";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [page, setPage] = useState(1);
  let limit = 100;

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/characters"
          element={
            <Personnages
              page={page}
              setPage={setPage}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              data={data}
              setData={setData}
              limit={100}
            />
          }
        />
        <Route
          path="/character/:characterId"
          element={
            <FichePersonnage
              data={data}
              setData={setData}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
