import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const CharacterProfile = () => {
  /*State pour le chargement de page*/
  const [isLoading, setIsLoading] = useState(true);

  /*State pour récupérer les infos relatives au personnage*/
  const [data, setData] = useState();

  /* Utilisation de UseParams pour afficher l'Id du personnage dans la route */
  const { characterId } = useParams();
  // console.log("Id du personnage =>", characterId);

  /* Requête avec Axios au serveur pour récupérer les infos du personnage */
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://marvel-app-backend-dm.herokuapp.com/comics/${characterId}`
        // `http://localhost:4000/comics/${characterId}`
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [characterId]);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="comicsByCharacter-container-page">
      {/* Section qui affiche la photo du personnage, son nom et sa description */}
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
          {/* Section qui affiche les comics dans lesquels le personnage est présent */}
          {data.comics.map((comic) => {
            return (
              <div className="comicsByCharacter">
                <div className="picture-comicsByCharacter-card">
                  <img
                    src={comic.thumbnail.path + "." + comic.thumbnail.extension}
                    className="comic-pictures"
                  />
                </div>
                <div className="text-comicsByCharacter-card">
                  <h3 className="comicsByCharacter-comic-title">
                    {comic.title}
                  </h3>
                  <p>{comic.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CharacterProfile;
