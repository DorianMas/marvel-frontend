import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  /* State pour afficher les données des personnages */
  const [dataCharacters, setDataCharacters] = useState();

  /* State pour afficher les données des comics */
  const [dataComics, setDataComics] = useState();

  /* Requête axios au serveur pour afficher les données des personnages */
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        // `https://marvel-app-backend-dm.herokuapp.com/characters?limit=${limit}&page=${page}&name=${searchTerm}`
        `http://localhost:4000/characters?limit=${"20"}&page=${"1"}&name=${""}`
      );
      console.log(response.data);
      setDataCharacters(response.data);
    };
    fetchData();
  }, []);

  /* Requête axios au serveur pour afficher les données des comics */
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        // `https://marvel-app-backend-dm.herokuapp.com/comics?limit=${limit}&page=${page}&title=${searchTerm}`
        `http://localhost:4000/comics?limit=${"20"}&page=${"1"}&title=${""}`
      );
      console.log(response.data);
      setDataComics(response.data);
    };
    fetchData();
  }, []);

  return (
    <div className="homepage-container">
      <div className="homepage-characters-section">
        <div className="description-characters-section">
          <div>
            <h2>More than 1.000 characters</h2>
            <p>All your favorite heroes in one click</p>
          </div>
          <div className="button-container-characters-homepage">
            <Link to="/comics">
              <button>Show More</button>
            </Link>
          </div>
        </div>
        <div className="carousel-characters-homepage">
          {/* Caroussel pour illustrer les personnages */}
          {dataCharacters &&
            dataCharacters.results.slice(0, 20).map((character, index) => {
              return (
                <div
                  className="carousel-characters-picture-homepage"
                  key={character._id}
                >
                  <Link to={`/comics/${character._id}`}>
                    <div
                      className="picture-character-homepage"
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
                    <h3 className="character-name-homepage">
                      {character.name}
                    </h3>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="homepage-comics-section">
        <div className="description-comics-section">
          <div>
            <h2>Over 47.000 comics</h2>
            <p>Find all the Marvel comics since the 70's</p>
          </div>
          <div className="button-container-comics-homepage">
            <Link to="/characters">
              <button>Show More</button>
            </Link>
          </div>
        </div>
        <div className="carousel-comics-homepage">
          {/* Caroussel pour illustrer les comics */}
          {dataComics &&
            dataComics.results.slice(0, 20).map((comic, index) => {
              return (
                <div
                  className="carousel-comics-picture-homepage"
                  key={comic._id}
                >
                  <div
                    className="picture-comic-homepage"
                    data-hover={comic.description}
                  >
                    <img
                      src={
                        comic.thumbnail.path + "." + comic.thumbnail.extension
                      }
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Home;
