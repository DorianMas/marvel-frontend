import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Comics from "./Comics";

const FichePersonnage = () => {
  /*Création d'un état pour récupérer les données Json*/

  const [isLoading, setIsLoading] = useState(true);

  const [data, setData] = useState();

  const { characterId } = useParams();
  console.log("Id du personnage =>", characterId);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://marvel-app-backend-dm.herokuapp.com/${characterId}`
        // `http://localhost:4000/comics/${characterId}`
      );
      console.log("Réponse de la BBD =>", response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
    console.log("Effect executed");
  }, [characterId]);

  return isLoading ? (
    <div>En cours de rechargement...</div>
  ) : (
    <div className="comicsByCharacter-container-page">
      <div className="profile-section">
        <div className="profile-picture">
          <img src={data.thumbnail.path + "." + data.thumbnail.extension} />
        </div>
        <div className="name-and-description">
          <h2>{data.name}</h2>
          <p>{data.description}</p>
        </div>
      </div>
      <div className="border-profile"></div>
      <div className="caroussel">
        <div className="comicsByCharacter-container">
          {data.comics.map((comic) => {
            return (
              <div className="comicsByCharacter">
                <img
                  src={comic.thumbnail.path + "." + comic.thumbnail.extension}
                  className="comic-pictures"
                />
                <h3 className="comicsByCharacter-comic-title">{comic.title}</h3>
                <p>{comic.description}</p>
              </div>
              // <div className="character-name"> {comics.name} </div>
              // <div className="character-description">{comics.description}</div>
              // <div className="comics-character"></div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FichePersonnage;
