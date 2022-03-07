import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import FavoriteButton from "../assets/favorite-svgrepo-com.svg";

const Comics = (props) => {
  const { limit } = props;

  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(1);

  const [data, setData] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://marvel-app-backend-dm.herokuapp.com/comics?limit=${limit}&page=${page}&title=${searchTerm}`
        // `http://localhost:4000/comics?limit=${limit}&page=${page}&title=${searchTerm}`
      );
      console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [page, limit, searchTerm]);

  const addToFavorites = (comic) => {
    const favComic = localStorage.getItem("favComic") || null;

    const tab = [];

    if (favComic === null) {
      tab.push(comic);
      // console.log(tab);

      const tabString = JSON.stringify(tab);

      // console.log(tabString);

      localStorage.setItem("favComic", tabString);
    } else {
      const tabObj = JSON.parse(favComic);
      console.log("tabObj sous forme d'objet ==> ", tabObj);

      const exist = tabObj.find((elem) => elem._id === comic._id);

      if (exist) {
        alert("Le character est déjà ajouté dans vos favoris");
      } else {
        tabObj.push(comic); //tabObj.push(favCharacter)
        const tabString = JSON.stringify(tabObj);
        localStorage.setItem("favComic", tabString);
        console.log("tabString =>", tabString);
      }
    }
  };

  return isLoading ? (
    <div>En cours de chargement...</div>
  ) : (
    <div className="comics-page">
      <div className="searchbar-container">
        <input
          type="search"
          placeholder="Search comics"
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
      <div className="pagination-buttons"></div>
      <div className="comics-page-container">
        {data.results.map((comic) => {
          return (
            <div className="unique-comic">
              <div
                data-hover={comic.description}
                className="comic-picture-container"
              >
                <img
                  src={comic.thumbnail.path + "." + comic.thumbnail.extension}
                />
              </div>

              <div className="comic-name">{comic.title}</div>
              <div className="favorite-button-container">
                <span>Add to your favorites </span>
                <FontAwesomeIcon
                  icon="heart"
                  className="fav-comics-icon"
                  onClick={() => {
                    addToFavorites(comic);
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

export default Comics;
