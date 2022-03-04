import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

  const [fav, setFav] = useState([]);

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
  }, [limit, searchTerm]);

  const addToFavorites = (character) => {
    const newFav = [...fav];

    newFav.push(character);
    console.log(character);
    localStorage.setItem("favCharacter", JSON.stringify(fav));
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
                <FontAwesomeIcon
                  icon="star"
                  className="favorite-button"
                  data-hover="Add the character to your favorites"
                  onClick={addToFavorites(character)}
                />
              </div>
              <div className="name-and-favorite-button">
                <h3 className="character-name">{character.name}</h3>
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
