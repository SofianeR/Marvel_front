import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Favoris = ({
  stateFavoris,
  token,
  setDisplayFooter,
  showModalLogin,
  showModalSignup,
}) => {
  const [listFav, setListFav] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [clickToRemove, setClickToRemove] = useState(false);

  const supprFavoris = async (characterId) => {
    const arrayToRemove = [...listFav];

    const favorisUpdate = arrayToRemove.filter(
      (element) => element._id !== characterId
    );

    const formData = new FormData();

    const bearerToken = `Bearer ${token}`;

    const arrayOfIdForMongo = [];

    favorisUpdate.map((item) => {
      arrayOfIdForMongo.push({ characterId: item._id });
    });

    const stringifiedDb = JSON.stringify(arrayOfIdForMongo);

    formData.append(`favoris`, stringifiedDb);

    formData.append(`delete`, true);

    try {
      const response = await axios.post(
        "http://marvel-sr.herokuapp.com/user/favoris",
        formData,
        {
          headers: {
            authorization: bearerToken,
          },
        }
      );

      setListFav(favorisUpdate);

      Cookies.set("favoris", response.data);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    const displayFavoris = async () => {
      try {
        setDisplayFooter(false);

        setLoading(true);
        const copyListFav = [];

        if (typeof stateFavoris === "string") {
          const favorisParsed = await JSON.parse(stateFavoris);
          for (let i = 0; i < favorisParsed.length; i++) {
            const response = await axios.get(
              `https://marvel-sr.herokuapp.com/character/${favorisParsed[i].characterId}`
            );
            copyListFav.push(response.data);
          }
        } else {
          const favorisParsed = [...stateFavoris];
          for (let i = 0; i < favorisParsed.length; i++) {
            const response = await axios.get(
              `https://marvel-sr.herokuapp.com/character/${favorisParsed[i].characterId}`
            );
            copyListFav.push(response.data);
          }
        }

        // favorisParsed.map(async (item, index) => {
        //   const response = await axios.get(
        //     `https://marvel-sr.herokuapp.com/character/${item.characterId}`
        //   );
        //   copyListFav.push(response.data);
        // });

        setListFav(copyListFav);
        setLoading(false);
      } catch (error) {
        alert(error.message);
      }
    };
    displayFavoris();
  }, []);

  return (
    <div className="fav-container">
      {loading === true ? (
        <p style={{ color: "blue" }}>en cours de chargement</p>
      ) : listFav.length > 0 ? (
        listFav.map((character, index) => {
          const picture = `${character.thumbnail.path}.${character.thumbnail.extension}`;

          return (
            <div
              className="position"
              style={
                showModalLogin || showModalSignup
                  ? { opacity: "0.2" }
                  : { opacity: "1" }
              }>
              <div className={"character-card"} key={index}>
                <div className="character-card-img">
                  {picture && <img src={picture} alt="character" />}
                </div>
                <Link
                  className="linkTo-single"
                  to={`/character/${character._id}`}>
                  <div className="character-card-name">
                    <p>{character.name}</p>
                  </div>

                  <div className="character-card-description">
                    <p>{character.description}</p>
                  </div>
                </Link>
              </div>
              <FontAwesomeIcon
                icon={"trash"}
                className={"trash"}
                onClick={() => {
                  // setClickToRemove(!clickToRemove);
                  supprFavoris(character._id);
                }}
              />
            </div>
          );
        })
      ) : (
        <div>
          <h1>favoris</h1>
          <p>Ajouter des personnages pour les afficher ici</p>
        </div>
      )}
    </div>
  );
};
export default Favoris;
