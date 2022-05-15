import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  heart,
  setHeart,
}) => {
  const [displayRecommandation, setDisplayRecommandation] = useState(false);

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

    const response = await axios.get(server_url);

    setPageCount(Math.ceil(response.data.count / limit));

    const arrayData = response.data.results;

    arrayData.map((character, index) => {
      character.heart = false;
    });

    setCharacters(arrayData);

    setDisplayRecommandation(false);

    setIsLoading(false);
  };

  const setCookieFavoris = async (
    characterId,
    characterName,
    characterHeart
  ) => {
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

        newObj.characterId = characterId;
        newObj.heart = characterHeart;

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
        setDisplayRecommandation(false);
      }}>
      <div className="title">
        <h1>Tous les Personnages</h1>
      </div>

      <SearchBarCharacters
        name={name}
        setName={setName}
        fetchCharacter={fetchCharacter}
        titleSubmit={titleSubmit}
        setTitleSubmit={setTitleSubmit}
        setSkip={setSkip}
        display={displayRecommandation}
        setDisplay={setDisplayRecommandation}
      />

      {isLoading === true ? (
        <div>
          <h1 style={{ color: "white" }}>En cours de chargement</h1>
        </div>
      ) : (
        <div className="container-character-card">
          {characters.length !== 0 &&
            characters.map((character, index) => {
              const picture = `${character.thumbnail.path}.${character.thumbnail.extension}`;

              return (
                <div key={index} className="position">
                  <Link
                    className="linkTo-single"
                    to={`/character/${character._id}`}>
                    <div className="card">
                      <div className="character-card-img">
                        <img src={picture} alt="picture characters" />
                      </div>
                      <div className="character-card">
                        <div className="information-card">
                          <div className="character-card-name">
                            <p>{character.name}</p>
                          </div>

                          <div className="character-card-description">
                            <p>{character.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>

                  {token && (
                    <FontAwesomeIcon
                      icon={"heart"}
                      className="like-button"
                      style={{
                        backgroundColor: character.heart ? "red" : "black",
                      }}
                      onClick={() => {
                        setRefreshFav(!refreshFav);
                        if (character.heart === false) {
                          setCookieFavoris(
                            character._id,
                            character.name,
                            character.heart
                          );
                        }
                        character.heart = !character.heart;
                      }}
                    />
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
