// Import des modules de fonctionnement et d'affichage
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import axios from "axios";

// Import du composant Modal
import Modal from "../components/Modal";

const Comics = (props) => {
  const { limit, token } = props;

  //State relatif au chargement de la page
  const [isLoading, setIsLoading] = useState(true);

  //State relatif à l'affichage des différentes pages
  const [page, setPage] = useState(1);

  //State relatif aux données de tous les comics
  const [data, setData] = useState();

  //State relatif aux termes recherchés pour filtrer les résultats
  const [searchTerm, setSearchTerm] = useState("");

  //State relatif aux données de l'utilisateur connecté
  const [dataUser, setDataUser] = useState();

  //State relatif à la modal
  const [openModal, setOpenModal] = useState(false);

  // Requête des données des comics au serveur avec Axios
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://marvel-app-backend-dm.herokuapp.com/comics?limit=${limit}&page=${page}&title=${searchTerm}`
        // `http://localhost:4000/comics?limit=${limit}&page=${page}&title=${searchTerm}`
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

  //Fonction pour ajouter un comic dans les favoris de l'utilisateur
  const addToFavorites = async (comic) => {
    // console.log("token à transmettre pour vérifier l'user =>", token);

    // console.log("comic à transmettre au back ==>", comic);

    // Requête Axios au serveur pour transmettre le comic à ajouter dans les favoris de l'utilisateur connecté
    try {
      const response = await axios.post(
        `https://marvel-app-backend-dm.herokuapp.com/user/add-favorites`,
        // "http://localhost:4000/user/add-favorites",
        { comic: comic },
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
      className="comics-page"
      // Fonction pour fermer la modal dès qu'on clique en dehors de l'élement
      onClick={() => openModal && setOpenModal(false)}
    >
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
        {/*Ternaire pour vérifier si l'utilisateur est connecté. Si c'est le cas, on différencie dans l'affichage les comics qui sont déjà en favoris*/}
        {token
          ? data &&
            data.results.map((comic) => {
              // Variable pour identifier les comics déjà stockés en favoris
              const comicAddedInFavorite = dataUser.comicFavorites.find(
                (elem) => elem._id === comic._id
              );

              return (
                <div className="unique-comic">
                  <div
                    data-hover={comic.description}
                    className="comic-picture-container"
                  >
                    <img
                      src={
                        comic.thumbnail.path + "." + comic.thumbnail.extension
                      }
                    />
                  </div>

                  <div className="comic-name">{comic.title}</div>
                  {/*Ternaire pour différencier l'affichage des comics en favoris*/}
                  {dataUser &&
                    (comicAddedInFavorite ? (
                      <div className="favorite-button-container">
                        <span>Added to your favorites</span>
                        <FontAwesomeIcon
                          icon="check"
                          className="added-fav-comics-icon"
                        />
                      </div>
                    ) : (
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
                    ))}
                </div>
              );
            })
          : data &&
            data.results.map((comic) => {
              return (
                <div className="unique-comic">
                  {/*Affichage des résultats de comics si l'utilisateur dans le cas où l'utilisateur n'est pas connecté*/}
                  <div
                    data-hover={comic.description}
                    className="comic-picture-container"
                  >
                    <img
                      src={
                        comic.thumbnail.path + "." + comic.thumbnail.extension
                      }
                    />
                  </div>

                  <div className="comic-name">{comic.title}</div>

                  <div className="favorite-button-container">
                    {/* Lorsqu'une personne non connectée clique sur le bouton d'ajout en favoris, une modal s'affiche et appelle à se connecter ou à s'inscrire */}
                    <span>Add to your favorites </span>
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

export default Comics;
