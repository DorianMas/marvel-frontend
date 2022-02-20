// import axios from "axios";
// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

// const ComicsByCharacter = () => {
//   const [isLoading, setIsLoading] = useState(true);

//   const [data, setData] = useState();

//   const { characterId } = useParams();
//   console.log("Id du personnage =>", characterId);

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await axios.get(
//         `http://localhost:4000/comics/${characterId}`
//       );
//       console.log("Réponse du back =>", response.data);
//       setData(response.data);
//       //   setIsLoading(false);
//       console.log(characterId);
//     };
//     fetchData();
//     console.log("Effect executed");
//   }, [characterId]);

//   return isLoading ? (
//     <div>En cours de rechargement...</div>
//   ) : (
//     <div className="comics-page-container">
//       <div className="profile">
//         <img
//           src={
//             data.results.thumbnail.path + "." + data.results.thumbnail.extension
//           }
//         />
//       </div>
//       {data.results.comics.map((comic) => {
//         return;

//         <img src={comic.comics} />;
//       })}
//     </div>
//   );
// };

// export default ComicsByCharacter;
