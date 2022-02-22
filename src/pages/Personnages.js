import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import FavoriteButton from "../assets/favorite-svgrepo-com.svg";

const Personnages = (props) => {
  const { limit } = props;

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
        <div>{page}</div>
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
              <div className="name-and-favorite-button">
                <h3 className="character-name"> {character.name} </h3>
                <img src={FavoriteButton} className="favorite-button" />
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
