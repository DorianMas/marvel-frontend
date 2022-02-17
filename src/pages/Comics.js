import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Comics = (props) => {
  const { page, setPage, data, setData, isLoading, setIsLoading, limit } =
    props;

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:4000/comics/?limit=${limit}&page=${page}`
      );
      console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [limit, setIsLoading, isLoading]);

  return isLoading ? (
    <div>En cours de chargement...</div>
  ) : (
    <div>
      <div className="pagination-buttons">
        {/* <button onClick={() => setPage(page - 1)}>Page précédente</button>
            <button onClick={() => setPage(page + 1)}>Page suivante</button> */}
      </div>
      <div className="comics-page-container">
        {data.results.map((comic) => {
          return (
            // <Link to={`/comic/${comic._id}`}>
            <div className="unique-comic">
              <div>
                <img
                  src={comic.thumbnail.path + "." + comic.thumbnail.extension}
                />
              </div>
              <div className="comic-name"> {comic.title} </div>
              <div className="comic-description">{comic.description}</div>
            </div>
            // </Link>
          );
        })}
        ;
      </div>
    </div>
  );
};

export default Comics;
