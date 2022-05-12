import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import Cookies from "js-cookie";

import SearchBarCharacters from "../../components/SearchBarCharacters/SearchBarCharacters";

const Characters = ({
  isLoading,
  setIsLoading,
  skip,
  setSkip,
  limit,
  setPageCount,
  titleSubmit,
  setTitleSubmit,
  favoris,
  setFavoris,
  setRefreshFav,
  refreshFav,
  setShowModalSignup,
  setShowModalLogin,
  token,
}) => {
  const [characters, setCharacters] = useState([]);
  const [name, setName] = useState("");

  const fetchCharacter = async () => {
    setIsLoading(true);

    const filtersObject = {};
    let filter_url = "";

    if (skip) {
      filtersObject.skip = skip;
    }
    if (limit) {
      filtersObject.limit = limit;
    }
    if (name) {
      filtersObject.name = name;
      delete filtersObject.skip;
    }

    const filterKeys = Object.keys(filtersObject);

    filterKeys.map((key, index) => {
      if (index === 0) {
        filter_url += `?${key}=${filtersObject[key]}`;
      } else {
        filter_url += `&${key}=${filtersObject[key]}`;
      }
    });

    const server_url = `https://marvel-sr.herokuapp.com/characters${filter_url}`;

    const response = await axios.get(server_url);

    setPageCount(Math.ceil(response.data.count / limit));

    setCharacters(response.data.results);
    setIsLoading(false);
  };

  const setCookieFavoris = async (characterId, characterName) => {
    if (token) {
      try {
        const newObj = {};
        const arrayState = [...favoris];
        const arrayDb = [];

        newObj.characterId = characterId;

        console.log(favoris);
        console.log(arrayState);

        arrayState.push(newObj);
        arrayDb.push(newObj);

        const stringifiedState = JSON.stringify(arrayState);
        const stringifiedDb = JSON.stringify(arrayDb);

        Cookies.set("favoris", stringifiedState);

        setFavoris(arrayState);

        const formData = new FormData();

        const bearerToken = `Bearer ${token}`;

        formData.append(`favoris`, stringifiedDb);

        const response = await axios.post(
          "https://marvel-sr.herokuapp.com/user/favoris",
          formData,
          {
            headers: {
              authorization: bearerToken,
            },
          }
        );
        console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      console.log("unauthorized");
    }
  };

  useEffect(() => {
    try {
      fetchCharacter();
    } catch (error) {
      console.log(error.message);
    }
  }, [skip, titleSubmit]);

  return (
    <div
      className="container"
      onClick={() => {
        setShowModalLogin(false);
        setShowModalSignup(false);
      }}>
      <h1>Tous les Personnages</h1>
      <select
        name=""
        id=""
        onChange={(e) => {
          setSkip(e.target.value);
        }}>
        <option value="">Skip</option>

        <option value="25">25</option>
        <option value="50">50</option>
      </select>
      <SearchBarCharacters
        name={name}
        setName={setName}
        fetchCharacter={fetchCharacter}
        titleSubmit={titleSubmit}
        setTitleSubmit={setTitleSubmit}
      />

      {isLoading === true ? (
        <div>
          <h1 style={{ color: "blue" }}>En cours de chargement</h1>
        </div>
      ) : (
        <div className="container-character-card">
          {characters.length !== 0 &&
            characters.map((character, index) => {
              const picture = `${character.thumbnail.path}.${character.thumbnail.extension}`;
              return (
                <div key={index}>
                  <Link
                    className="linkTo-single"
                    to={`/character/${character._id}`}>
                    <div className="character-card">
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
                  </Link>

                  <button
                    onClick={() => {
                      setRefreshFav(!refreshFav);
                      setCookieFavoris(character._id, character.name);
                    }}>
                    Like
                  </button>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};
export default Characters;
