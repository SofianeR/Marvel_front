import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const SingleCharacter = ({
  isLoading,
  setIsLoading,
  setShowModalSignup,
  setShowModalLogin,
}) => {
  const [listComics, setListComics] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    try {
      const fetchSingleCharacter = async () => {
        setIsLoading(true);

        const response = await axios.get(
          `https://marvel-sr.herokuapp.com/comics/${id}`
        );

        setListComics(response.data);
        setIsLoading(false);
      };

      fetchSingleCharacter();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return isLoading === true ? (
    <p>En cours de chargement ...</p>
  ) : (
    <div
      className="container"
      onClick={() => {
        setShowModalLogin(false);
        setShowModalSignup(false);
      }}>
      <div className="singleCharacterSheet">
        <div>
          {listComics.length !== 0 && (
            <img
              src={`${listComics.thumbnail.path}.${listComics.thumbnail.extension}`}
              alt=""
            />
          )}
        </div>
        <div>
          <p>{listComics.name}</p>
        </div>
      </div>
      <div className="listComics">
        {listComics.length !== 0 &&
          listComics.comics.map((comic, index) => {
            const pictureListComics = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
            return (
              <div>
                <div className="thumbnail-list-comics">
                  <img src={pictureListComics} alt="" />
                </div>
                <div className="title">
                  <p>{comic.title}</p>
                </div>
                <div className="description">
                  <p>{comic.description}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default SingleCharacter;
