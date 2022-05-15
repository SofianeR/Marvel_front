import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import SearchBarComics from "../../components/SearchBarComics/SearchBarComics";

import axios from "axios";

const Comics = ({
  isLoading,
  setIsLoading,
  comics,
  setComics,
  skip,
  limit,
  setPageCount,
  titleSubmit,
  setTitleSubmit,
  setShowModalSignup,
  setShowModalLogin,
  setDisplayFooter,
}) => {
  const [title, setTitle] = useState("");
  const [display, setDisplay] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      setDisplayFooter(true);
      setIsLoading(true);

      const fetchComics = async () => {
        let filter_url = "";

        let filtersObject = {};

        if (skip) {
          filtersObject.skip = skip;
        }
        if (limit) {
          filtersObject.limit = limit;
        }
        if (title) {
          filtersObject.title = title;
          delete filtersObject.skip;
        }
        const filterKeys = Object.keys(filtersObject);

        filterKeys.map((filter, index) => {
          if (index === 0) {
            filter_url += `?${filter}=${filtersObject[filter]}`;
          } else {
            filter_url += `&${filter}=${filtersObject[filter]}`;
          }
        });

        const server_url = `https://marvel-sr.herokuapp.com/comics${filter_url}`;
        console.log(server_url);

        const response = await axios.get(server_url);

        setPageCount(Math.ceil(response.data.count / limit));

        setComics(response.data.results);
      };

      fetchComics();

      setIsLoading(false);
      setDisplay(false);
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
      <h1>Comics</h1>
      <SearchBarComics
        titleSubmit={titleSubmit}
        setTitleSubmit={setTitleSubmit}
        title={title}
        setTitle={setTitle}
        display={display}
        setDisplay={setDisplay}
      />

      {isLoading === true ? (
        <p>En cours de chargement ...</p>
      ) : (
        <div className="container-comics">
          {comics.map((comic, index) => {
            const pictureComic = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
            return (
              // <Link
              //   to={`/comic/${comic._id}`}
              //   state={{ comic: "comic" }}
              //   key={index}>
              <div
                className="comic-card"
                onClick={() => {
                  navigate(`/comic/${comic._id}`, {
                    state: { comic: comic },
                  });
                }}>
                <div className="comic-card-img">
                  <img src={pictureComic} alt="picture comics" />
                </div>

                <div className="comic-card-name">
                  <p>{comic.title}</p>
                </div>

                <div className="comic-card-description">
                  <p>{comic.description}</p>
                </div>
              </div>
              // </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Comics;
