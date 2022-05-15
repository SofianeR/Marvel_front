import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import Cookies from "js-cookie";

import SearchBarCharacters from "../../components/SearchBarCharacters/SearchBarCharacters";
import Favoris from "../Favoris/Favoris";

const Characters = ({
  isLoading,
  setIsLoading,
  characters,
  setCharacters,
  name,
  setName,
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
  setDisplayFooter,
}) => {
  const fetchCharacter = async () => {
    setDisplayFooter(true);
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
    console.log(server_url);

    const response = await axios.get(server_url);

    setPageCount(Math.ceil(response.data.count / limit));

    setCharacters(response.data.results);
    setIsLoading(false);
  };

  const setCookieFavoris = async (characterId, characterName) => {
    if (token) {
      try {
        const newObj = {};

        const arrayDb = [];

        let arrayState = [];

        if (typeof favoris === "string") {
          const parse = await JSON.parse(favoris);
          arrayState = [...parse];
        } else {
          arrayState = [...favoris];
        }

        console.log(arrayState);

        newObj.characterId = characterId;

        if (
          !arrayState.find(
            (element) => element.characterId === newObj.characterId
          ) &&
          !arrayDb.find((element) => element.characterId === newObj.characterId)
        ) {
          arrayState.push(newObj);

          arrayDb.push(newObj);
        }

        const stringifiedState = JSON.stringify(arrayState);
        const stringifiedDb = JSON.stringify(arrayDb);

        if (stringifiedState.length !== 0) {
          Cookies.set("favoris", stringifiedState);
        }

        // console.log(arrayState);

        setFavoris(arrayState);

        const formData = new FormData();

        const bearerToken = `Bearer ${token}`;

        if (stringifiedDb.length !== 0) {
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
          // console.log(response.data);
        }
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
      console.log(token);
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

                  {token && (
                    <button
                      onClick={() => {
                        setRefreshFav(!refreshFav);
                        setCookieFavoris(character._id, character.name);
                      }}>
                      Like
                    </button>
                  )}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};
export default Characters;
