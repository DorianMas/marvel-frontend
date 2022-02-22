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
        <div>{page}</div>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
      <div className="pagination-buttons"></div>
      <div className="comics-page-container">
        {data.results.map((comic) => {
          return (
            <div className="unique-comic" data-hover={comic.description}>
              <div>
                <img
                  src={comic.thumbnail.path + "." + comic.thumbnail.extension}
                />
              </div>

              <div className="comic-name"> {comic.title} </div>
            </div>
          );
        })}
        ;
      </div>
    </div>
  );
};

export default Comics;
