import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Personnages = (props) => {
  const { limit, token } = props;

  const [isLoading, setIsLoading] = useState(true);

  const [data, setData] = useState();

  const [page, setPage] = useState(1);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://marvel-app-backend-dm.herokuapp.com/characters?limit=${limit}&page=${page}&name=${searchTerm}`
        // `http://localhost:4000/characters?limit=${limit}&page=${page}&name=${searchTerm}`
      );
      // console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [page, limit, searchTerm]);

  const addToFavorites = async (character) => {
    // const favCharacter = localStorage.getItem("favCharacter") || null;

    console.log("token à transmettre pour vérifier l'user =>", token);

    console.log("character à transmettre au back ==>", character);

    try {
      const response = await axios.post(
        `https://marvel-app-backend-dm.herokuapp.com/user/add-favorites`,
        {
          character: character,
          headers: {
            Authorization: token,
          },
        }
      );

      console.log("Données relatives à l'user =>", response.data);
    } catch (error) {
      console.log(error.response);
    }

    // const tab = [];

    // if (favCharacter === null) {
    //   tab.push(character);
    //   // console.log(tab);

    //   const tabString = JSON.stringify(tab);

    //   // console.log(tabString);

    //   localStorage.setItem("favCharacter", tabString);
    // } else {
    //   const tabObj = JSON.parse(favCharacter);
    //   console.log("tabObj sous forme d'objet ==> ", tabObj);

    //   const exist = tabObj.find((elem) => elem._id === character._id);

    //   if (exist) {
    //     alert("Le character est déjà ajouté dans vos favoris");
    //   } else {
    //     tabObj.push(character); //tabObj.push(favCharacter)
    //     const tabString = JSON.stringify(tabObj);
    //     localStorage.setItem("favCharacter", tabString);
    //     console.log("tabString =>", tabString);
    //   }
    // }
  };

  return isLoading ? (
    <div>En cours de chargement...</div>
  ) : (
    <div className="characters-page-container">
      <div className="searchbar-container">
        <input
          type="search"
          placeholder="Search characters"
          className="searchbar"
          onChange={(event) => {
            const value = event.target.value;
            setSearchTerm(value);
          }}
        />
      </div>

      <div className="pagination-buttons-container">
        <button
          onClick={() => {
            if (page > 1) {
              setPage(page - 1);
            } else {
              <span></span>;
            }
          }}
        >
          Previous
        </button>
        <div>
          {page} - {limit}
        </div>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
      <div className="characters-results-container">
        {data.results.map((character) => {
          return (
            <div className="unique-character">
              <Link to={`/comics/${character._id}`}>
                <div
                  className="picture-character"
                  data-hover={character.description}
                >
                  <img
                    src={
                      character.thumbnail.path +
                      "." +
                      character.thumbnail.extension
                    }
                  />
                </div>
              </Link>

              <div className="name-and-favorite-button">
                <h3 className="character-name">{character.name}</h3>
              </div>
              <div className="favorite-button-container">
                <span>Add to your favorites </span>
                <FontAwesomeIcon
                  icon="heart"
                  className="fav-comics-icon"
                  onClick={() => {
                    addToFavorites(character);
                  }}
                />
              </div>
            </div>
          );
        })}
        ;
      </div>
    </div>
  );
};

export default Personnages;
