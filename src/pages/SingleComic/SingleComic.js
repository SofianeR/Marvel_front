import { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";

import axios from "axios";

const SingleComic = ({
  setComics,
  isLoading,
  setIsLoading,
  setDisplayFooter,
  showModalLogin,
  showModalSignup,
}) => {
  const [click, setClick] = useState(false);
  const [characterByComic, setCharacterByComic] = useState();
  const location = useLocation();

  const { comic } = location.state;

  const pictureComic = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;

  const { id } = useParams();

  useEffect(() => {
    const singleComic = async () => {
      try {
        setDisplayFooter(false);
        setIsLoading(true);

        const result = await axios.get(
          `https://marvel-sr.herokuapp.com/single-comic/${id}`
        );

        setCharacterByComic(result.data);

        setIsLoading(false);
      } catch (error) {
        alert(error.message);
      }
    };
    singleComic();
  }, [click]);

  return (
    <div
      style={
        showModalLogin || showModalSignup
          ? { opacity: "0.2" }
          : { opacity: "1" }
      }>
      <div className="title">
        <h1>{comic.title}</h1>
      </div>
      {isLoading === true ? (
        <div>
          <p style={{ color: "white" }}>En cours de chargement</p>
        </div>
      ) : (
        <div className="container">
          <div className="comic-container">
            <div className="comic-img">
              <img src={pictureComic} alt="" />
            </div>
            <div className="information-single-comic">
              <div className="comic">
                <p>{comic.title}</p>
              </div>
              <div className="comic">
                <p>{comic.description}</p>
              </div>
            </div>
          </div>
          <div className="character-container">
            {characterByComic &&
              characterByComic.map((character, index) => {
                const pictureCharacters = `${character.thumbnail.path}.${character.thumbnail.extension}`;
                return (
                  <Link
                    to={`/character/${character._id}`}
                    className={"linkTo-single"}>
                    <div className="card">
                      <div className="character-card-img">
                        <img src={pictureCharacters} alt="picture characters" />
                      </div>
                      <div className="character-card">
                        <div className="information-card">
                          <div className="character-card-name">
                            <p>{character.name}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      )}

      <button
        onClick={() => {
          setClick(!click);
        }}>
        CLICK
      </button>
    </div>
  );
};
export default SingleComic;
