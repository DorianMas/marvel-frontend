import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Import du composant Modal
import Modal from "../components/Modal";

const Characters = (props) => {
  const { limit, token } = props;

  //State relatif au chargement de la page
  const [isLoading, setIsLoading] = useState(true);

  //State relatif aux données de tous les personnages
  const [data, setData] = useState();

  //State relatif à l'affichage des différentes pages
  const [page, setPage] = useState(1);

  //State relatif aux termes recherchés pour filtrer les résultats
  const [searchTerm, setSearchTerm] = useState("");

  //State relatif aux données de l'utilisateur connecté
  const [dataUser, setDataUser] = useState();

  //State relatif à la modal
  const [openModal, setOpenModal] = useState(false);

  // Requête des données des personnages au serveur avec Axios
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://marvel-app-backend-dm.herokuapp.com/characters?limit=${limit}&page=${page}&name=${searchTerm}`
        // `http://localhost:4000/characters?limit=${limit}&page=${page}&name=${searchTerm}`
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [page, limit, searchTerm]);

  //Requête des données de l'utilisateur au serveur avec Axios
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.post(
        "https://marvel-app-backend-dm.herokuapp.com/user/favorites",
        // "http://localhost:4000/user/favorites",
        { token: token }
      );
      console.log(response.data);
      setDataUser(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  //Fonction pour ajouter un personnage dans les favoris de l'utilisateur
  const addToFavorites = async (character) => {
    // console.log("token à transmettre pour vérifier l'user =>", token);

    // console.log("character à transmettre au back ==>", character);

    // Requête Axios au serveur pour transmettre le comic à ajouter dans les favoris de l'utilisateur connecté
    try {
      const response = await axios.post(
        `https://marvel-app-backend-dm.herokuapp.com/user/add-favorites`,
        // "http://localhost:4000/user/add-favorites",
        { character: character },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      // console.log("Données relatives à l'user =>", response.data);
      setDataUser(response.data);
    } catch (error) {
      // console.log("error.response =>", error.response);
    }
  };

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div
      className="characters-page-container"
      // Fonction pour fermer la modal dès qu'on clique en dehors de l'élement
      onClick={() => openModal && setOpenModal(false)}
    >
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
        {/*Ternaire pour vérifier si l'utilisateur est connecté. Si c'est le cas, on différencie dans l'affichage les personnages qui sont déjà en favoris*/}
        {token
          ? data &&
            data.results.map((character, index) => {
              // Variable pour identifier les personnages en favoris
              const characterAddedInFavorite = dataUser.characterFavorites.find(
                (elem) => elem._id === character._id
              );
              return (
                <div className="unique-character" key={index}>
                  {/*Lien vers la page de profil du personnage au clic*/}
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
                  {/*Ternaire pour différencier l'affichage des personnages en favoris*/}
                  {dataUser && characterAddedInFavorite ? (
                    <div className="favorite-button-container">
                      <span>Added to your favorites</span>
                      <FontAwesomeIcon
                        icon="check"
                        className="added-fav-comics-icon"
                      />
                    </div>
                  ) : (
                    <div className="favorite-button-container">
                      <span>Add to your favorites</span>
                      <FontAwesomeIcon
                        icon="heart"
                        className="fav-comics-icon"
                        onClick={() => {
                          addToFavorites(character);
                        }}
                      />
                    </div>
                  )}
                </div>
              );
            })
          : data &&
            data.results.map((character, index) => {
              return (
                <div className="unique-character" key={index}>
                  {/*Affichage des résultats de personnages si l'utilisateur dans le cas où l'utilisateur n'est pas connecté*/}
                  {/*Lien vers la page de profil du personnage au clic*/}
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
                    {/* Lorsqu'une personne non connectée clique sur le bouton d'ajout en favoris, une modal s'affiche et appelle à se connecter ou à s'inscrire */}

                    <span>Add to your favorites</span>
                    <FontAwesomeIcon
                      icon="heart"
                      className="fav-comics-icon"
                      onClick={() => {
                        setOpenModal(true);
                      }}
                    />
                  </div>
                </div>
              );
            })}
      </div>
      {openModal === true && <Modal setOpenModal={setOpenModal} />}
    </div>
  );
};

export default Characters;
