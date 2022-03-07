import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FavoritesPage = () => {
  const navigate = useNavigate();

  /*Appel des characters favoris*/
  const favCharacter = localStorage.getItem("favCharacter") || null;
  console.log(favCharacter);
  const ObjFavCharacters = JSON.parse(favCharacter);
  console.log(ObjFavCharacters);

  /*Appel des comics favoris*/
  const favComic = localStorage.getItem("favComic") || null;
  const ObjFavComics = JSON.parse(favComic);
  console.log(ObjFavComics);

  /*Enlever un comic favoris*/
  const removeComicToFavorites = (elem) => {
    const favComic = localStorage.getItem("favComic") || null;

    const tabObj = JSON.parse(favComic);
    console.log("tabObj sous forme d'objet ==> ", tabObj);

    // const comicToRemove = tabObj.find((elem) => elem._id === comic._id);

    for (let i = 0; i < tabObj.length; i++) {
      if (tabObj[i]._id === elem._id) {
        tabObj.splice(i, 1);
      }
    }

    const tabString = JSON.stringify(tabObj);
    localStorage.setItem("favComic", tabString);
    // console.log("tabString =>", tabString);
    navigate("/user/favorites");
  };

  /*Enlever un character favoris*/
  const removeCharacterToFavorites = (elem) => {
    const favCharacter = localStorage.getItem("favCharacter") || null;

    const tabObj = JSON.parse(favCharacter);
    console.log("tabObj sous forme d'objet ==> ", tabObj);

    // const comicToRemove = tabObj.find((elem) => elem._id === comic._id);

    for (let i = 0; i < tabObj.length; i++) {
      if (tabObj[i]._id === elem._id) {
        tabObj.splice(i, 1);
      }
    }

    console.log(tabObj);

    const tabString = JSON.stringify(tabObj);
    localStorage.setItem("favCharacter", tabString);
    // console.log("tabString =>", tabString);
    navigate("/user/favorites");
  };

  return (
    <div className="fav-container">
      <h2>Vos Personnages favoris</h2>
      <div className="fav-characters-container">
        {ObjFavCharacters.map((elem) => {
          return (
            <div className="fav-character-card">
              <h3 className="fav-character-name">{elem.name}</h3>
              <Link to={`/comics/${elem._id}`}>
                <img
                  src={elem.thumbnail.path + "." + elem.thumbnail.extension}
                  className="fav-character-picture"
                />
              </Link>
              <div className="remove-character-container">
                <p className="remove-character-sentence">
                  Remove this character from your favorites
                </p>
                <FontAwesomeIcon
                  icon="times-circle"
                  className="remove-button"
                  onClick={() => {
                    removeCharacterToFavorites(elem);
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <h2>Vos Comics favoris</h2>
      <div className="fav-comics-container">
        {ObjFavComics.map((elem) => {
          return (
            <div className="fav-comic-card">
              <img
                src={elem.thumbnail.path + "." + elem.thumbnail.extension}
                className="fav-comic-picture"
              />
              <h3 className="fav-comic-name">{elem.title}</h3>
              <div className="remove-comic-container">
                <p>Remove this comic from your favorites</p>
                <FontAwesomeIcon
                  icon="times-circle"
                  className="remove-button"
                  onClick={() => {
                    removeComicToFavorites(elem);
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FavoritesPage;
