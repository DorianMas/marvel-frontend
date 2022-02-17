import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const FichePersonnage = (props) => {
  /*Création d'un état pour récupérer les données Json*/

  const { data, setData, isLoading, setIsLoading } = props;

  const { characterId } = useParams();
  console.log("Id du personnage =>", characterId);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:4000/character/${characterId}`
      );
      console.log("Réponse de la BBD =>", response);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
    console.log("Effect executed");
  }, [characterId]);

  return isLoading ? (
    <div>En cours de rechargement...</div>
  ) : (
    <div className="unique-character">
      <div>
        <img
          src={
            data.results.thumbnail.path + "." + data.results.thumbnail.extension
          }
        />
        {/* ) : (
                <span></span>
              )} */}
      </div>
      <div className="character-name"> {data.results.name} </div>
      <div className="character-pictures">{data.results.description}</div>
    </div>
  );
};

export default FichePersonnage;
