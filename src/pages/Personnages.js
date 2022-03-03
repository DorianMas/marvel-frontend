import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

import FavoriteButton from "../assets/favorite-svgrepo-com.svg";

const Personnages = (props) => {
  const { limit } = props;

  const [isLoading, setIsLoading] = useState(true);

  const [data, setData] = useState();

  const [page, setPage] = useState(1);

  const [searchTerm, setSearchTerm] = useState("");

  const [characterId, setCharacterId] = useState();

  const [newFav, setNewFav] = useState();

  // const favCharacter = (characterId) => {
  //     localStorage.setItem("favCharacterId", characterId);
  //   setCharacterId(characterId);

  // };

  // const FavCharacter = (characterId) => {
  //   if (characterId)
  //   { if
  //     localStorage.setItem("favCharacterId", characterId);
  //   } else {
  //     Cookies.remove("favCharacterId");
  //   }
  //   setCharacterId(characterId);
  // };

  // const addToLocalStorage = (character) => {
  //   localStorage.setItem("favCharacterId", characterId);
  //   setCharacterId(characterId);
  //   const newFav = [...characterId];

  //   const exist = newFav.find((elem) => elem.id === character._id);
  //   console.log("L'élément trouvé ====> ", exist);
  //   if (exist) {
  //     alert("You already added this character to your favorites");
  //   } else {
  //     newFav.push(character);
  //   }

  //   setCharacterId(newFav);
  // };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://marvel-app-backend-dm.herokuapp.com/characters?limit=${limit}&page=${page}&name=${searchTerm}`
        // `http://localhost:4000/characters?limit=${limit}&page=${page}&name=${searchTerm}`
      );
      console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [page, limit, searchTerm]);

  console.log(page);

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
                <div className="picture-character">
                  <img
                    src={
                      character.thumbnail.path +
                      "." +
                      character.thumbnail.extension
                    }
                  />
                </div>
              </Link>
              <div>
                <img
                  src={FavoriteButton}
                  className="favorite-button"
                  data-hover="Add the character to your favorites"
                  onClick={
                    () =>
                      // FavCharacter(character._id);
                      localStorage.setItem("favCharacterId", character._id)
                    // console.log("Ajout d'un favori ==> ", characterId);
                    // addToLocalStorage
                  }
                />
              </div>
              <div className="name-and-favorite-button">
                <h3 className="character-name"> {character.name} </h3>
              </div>
              <div className="character-description">
                {character.description}
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
