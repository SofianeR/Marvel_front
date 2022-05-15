import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const SingleCharacter = ({
  isLoading,
  setIsLoading,
  setShowModalSignup,
  setShowModalLogin,
  setDisplayFooter,
}) => {
  const [listComics, setListComics] = useState([]);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    try {
      const fetchSingleCharacter = async () => {
        setDisplayFooter(false);
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
            <div className="container">
              <div className="comic-container">
                <div className="comic-img">
                  <img
                    src={`${listComics.thumbnail.path}.${listComics.thumbnail.extension}`}
                    alt=""
                  />
                </div>
                <div className="information-single-comic">
                  <div className="comic">
                    <p>{listComics.name}</p>
                  </div>
                  <div className="comic">
                    <p>{listComics.description}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="character-container">
        {listComics.length !== 0 &&
          listComics.comics.map((comic, index) => {
            const pictureListComics = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
            return (
              <div
                className="card"
                id="hover"
                onClick={() => {
                  navigate(`/comic/${comic._id}`, {
                    state: { comic: comic },
                  });
                }}>
                <div className="character-card-img">
                  <img src={pictureListComics} alt="picture characters" />
                </div>
                <div className="character-card">
                  <div className="information-card">
                    <div className="character-card-name">
                      <p>{comic.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default SingleCharacter;
