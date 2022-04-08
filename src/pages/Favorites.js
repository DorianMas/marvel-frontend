import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import axios from "axios";

const FavoritesPage = (props) => {
  const { token } = props;

  /*State relatif aux données de l'utilisateur pour afficher/actualiser ses favoris*/
  const [data, setData] = useState();

  /*State relatif au chargement de la page*/
  const [isLoading, setIsLoading] = useState(true);

  // Requête des données de l'utilisateur au serveur avec Axios
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `https://marvel-app-backend-dm.herokuapp.com/user/favorites`,
          // "http://localhost:4000/user/favorites",
          { token: token }
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {}
    };
    fetchData();
  }, []);

  //Fonction pour retirer un personnage des favoris de l'utilisateur
  const removeCharacterToFavorites = async (character) => {
    // console.log("token à transmettre pour vérifier l'user =>", token);

    // console.log("character à transmettre au back ==>", character);

    // Requête Axios au serveur pour transmettre le personnage à retirer des favoris de l'utilisateur connecté
    try {
      const response = await axios.post(
        `https://marvel-app-backend-dm.herokuapp.com/user/remove-favorites`,
        // "http://localhost:4000/user/remove-favorites",
        { character: character },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setData(response.data);
    } catch (error) {}
  };

  //Fonction pour retirer le comic des favoris de l'utilisateur
  const removeComicToFavorites = async (comic) => {
    // console.log("token à transmettre pour vérifier l'user =>", token);

    // console.log("character à transmettre au back ==>", comic);

    // Requête Axios au serveur pour transmettre le comic à retirer des favoris de l'utilisateur connecté
    try {
      const response = await axios.post(
        `https://marvel-app-backend-dm.herokuapp.com/user/remove-favorites`,
        // "http://localhost:4000/user/remove-favorites",
        { comic: comic },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setData(response.data);
    } catch (error) {}
  };

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="fav-container">
      {/*On vérifie avec le token si l'utilisateur est bien connecté pour afficher la page */}
      {token === null && (
        <div style={{ color: "white", fontFamily: "Bangers" }}>
          You need an account to access to this page
        </div>
      )}
      {/*Si l'utilisateur est bien connecté, on affiche ses favoris*/}
      {token !== null &&
        (data.characterFavorites.length < 1 ? (
          <h2>You didn't save your favorite characters yet</h2>
        ) : (
          <>
            <h2>Your favorite characters</h2>
            <div className="fav-characters-container">
              {token !== null &&
                data.characterFavorites.map((character, index) => {
                  return (
                    <div className="fav-character-card" key={index}>
                      <h3 className="fav-character-name">{character.name}</h3>
                      <Link to={`/comics/${character._id}`}>
                        <img
                          src={
                            character.thumbnail.path +
                            "." +
                            character.thumbnail.extension
                          }
                          className="fav-character-picture"
                        />
                      </Link>
                      <div className="remove-character-container">
                        <p className="remove-character-sentence">
                          Remove from your favorites
                        </p>
                        <FontAwesomeIcon
                          icon="times-circle"
                          className="remove-button"
                          onClick={() => {
                            removeCharacterToFavorites(character);
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </>
        ))}
      {token !== null &&
        (data.comicFavorites.length < 1 ? (
          <h2>Vous n'avez pas de Comics favoris</h2>
        ) : (
          <>
            <h2>Vos Comics favoris</h2>
            <div className="fav-comics-container">
              {token !== null &&
                data.comicFavorites.map((comic, index) => {
                  return (
                    <div className="fav-comic-card" key={index}>
                      <img
                        src={
                          comic.thumbnail.path + "." + comic.thumbnail.extension
                        }
                        className="fav-comic-picture"
                      />
                      <h3 className="fav-comic-name">{comic.title}</h3>
                      <div className="remove-comic-container">
                        <p>Retirer ce comic de vos favoris</p>
                        <FontAwesomeIcon
                          icon="times-circle"
                          className="remove-button"
                          onClick={() => {
                            removeComicToFavorites(comic);
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </>
        ))}
    </div>
  );
};

export default FavoritesPage;
