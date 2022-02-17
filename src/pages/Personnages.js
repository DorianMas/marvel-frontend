import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Personnages = (props) => {
  const { page, setPage, data, setData, isLoading, setIsLoading, limit } =
    props;

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:4000/characters?limit=${limit}&page=${page}`
      );
      console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [limit, setIsLoading, isLoading]);

  // const pictureURL = data.results.thumbnail.path;

  // const handleImage = () => {
  //   for (let i = 0; i < pictureURL.length; i++) {
  //     if (pictureURL[i] === "image_not_available") {
  //       return "";
  //     } else {
  //       return pictureURL;
  //     }
  //   }
  // };

  console.log(page);

  return isLoading ? (
    <div>En cours de chargement...</div>
  ) : (
    <div>
      <div className="pagination-buttons">
        {/* <button onClick={() => setPage(page - 1)}>Page précédente</button>
        <button onClick={() => setPage(page + 1)}>Page suivante</button> */}
      </div>
      <div className="characters-page-container">
        {data.results.map((character) => {
          return (
            <Link to={`/character/${character._id}`}>
              <div className="unique-character">
                <div>
                  <img
                    src={
                      character.thumbnail.path +
                      "." +
                      character.thumbnail.extension
                    }
                  />
                </div>
                <div className="character-name"> {character.name} </div>
                <div className="character-pictures">
                  {character.description}
                </div>
              </div>
            </Link>
          );
        })}
        ;
      </div>
    </div>
  );
};

export default Personnages;
