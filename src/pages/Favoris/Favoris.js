import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const Favoris = ({ stateFavoris, refreshFav }) => {
  const [listFav, setListFav] = useState([]);
  const [loading, setLoading] = useState(false);
  const [click, setClick] = useState(false);

  useEffect(() => {
    const displayFavoris = async () => {
      try {
        setLoading(true);
        console.log(stateFavoris);
        const favorisParsed = await JSON.parse(stateFavoris);

        const copyListFav = [];

        // favorisParsed.map(async (item, index) => {
        //   const response = await axios.get(
        //     `https://marvel-sr.herokuapp.com/character/${item.characterId}`
        //   );
        //   copyListFav.push(response.data);
        // });

        for (let i = 0; i < favorisParsed.length; i++) {
          const response = await axios.get(
            `https://marvel-sr.herokuapp.com/character/${favorisParsed[i].characterId}`
          );
          copyListFav.push(response.data);
        }

        await setListFav(copyListFav);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    displayFavoris();
  }, []);

  return (
    <div className="fav-container">
      {loading === true ? (
        <p style={{ color: "blue" }}>en cours de chargement</p>
      ) : (
        listFav.map((character, index) => {
          const picture = `${character.thumbnail.path}.${character.thumbnail.extension}`;

          return (
            <div className="character-card" key={index}>
              <div className="character-card-img">
                <img src={picture} alt="picture characters" />
              </div>

              <div className="character-card-name">
                <p>{character.name}</p>
              </div>

              <div className="character-card-description">
                <p>{character.description}</p>
              </div>
            </div>
          );
        })
      )}
      <button
        onClick={() => {
          setClick(!click);
        }}>
        Click
      </button>
    </div>
  );
};
export default Favoris;
