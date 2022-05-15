import { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";

import axios from "axios";

const SingleComic = ({
  setComics,
  isLoading,
  setIsLoading,
  setDisplayFooter,
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
        console.log(error.message);
      }
    };
    singleComic();
  }, [click]);

  return (
    <div>
      <h1>SingleComic</h1>
      {isLoading === true ? (
        <div>
          <p style={{ color: "white" }}>En cours de chargement</p>
        </div>
      ) : (
        <div className="comic-container">
          <div>
            <div className="comic-img">
              <img src={pictureComic} alt="" />
            </div>
            <div className="comic">
              <p>{comic.title}</p>
            </div>
            <div className="comic">
              <p>{comic.description}</p>
            </div>
          </div>
          <div className="character-container">
            {characterByComic &&
              characterByComic.map((character, index) => {
                const pictureCharacters = `${character.thumbnail.path}.${character.thumbnail.extension}`;
                console.log(character._id);
                return (
                  <Link to={`/character/${character._id}`}>
                    <div onClick={() => {}}>
                      <div className="comic-img">
                        <img src={pictureCharacters} alt="" />
                      </div>
                      <div className="character-container" key={index}>
                        <p>{character.name}</p>
                      </div>
                      <div className="comic">
                        <p>{character.description}</p>
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
