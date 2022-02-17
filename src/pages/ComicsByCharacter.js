import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ComicsByCharacter = (props) => {
  const { data, setData, isLoading, setIsLoading } = props;

  const { characterId } = useParams();
  console.log("Id du personnage =>", characterId);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:4000/comics/${characterId}`
      );
      console.log("Réponse du back =>", response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
    console.log("Effect executed");
  }, [characterId]);

  return isLoading ? (
    <div>En cours de rechargement...</div>
  ) : (
    <div className="comics-page-container">
      {data.results.map((comic) => {
        return (
          <div className="unique-comic">
            <img src={comic.thumbnail.path + "." + comic.thumbnail.extension} />
          </div>
        );
      })}
    </div>
  );
};

export default ComicsByCharacter;
