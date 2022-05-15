import axios from "axios";
import { useEffect, useState } from "react";

const SearchBarComics = ({
  setTitle,
  title,
  titleSubmit,
  setTitleSubmit,
  display,
  setDisplay,
}) => {
  const [recommandationComics, setRecommandationComics] = useState([]);
  useEffect(() => {
    const fetchRecommandationComics = async () => {
      let str = `?title=${title}`;
      if (str.length > 0) {
        try {
          setDisplay(true);

          const server_url = `https://marvel-sr.herokuapp.com/comics${str}`;
          console.log(server_url);

          const response = await axios.get(server_url);

          setRecommandationComics(response.data.results);
        } catch (error) {
          console.log(error.message);
        }
      }
    };
    fetchRecommandationComics();
  }, [title]);
  return (
    <div className="search-character-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setTitleSubmit(!titleSubmit);
        }}>
        <input
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input type="submit" value={"Envoyer"} />
      </form>
      {display && (
        <div className="recommandation-container">
          <button
            onClick={() => {
              setDisplay(false);
            }}>
            Click
          </button>
          {recommandationComics &&
            recommandationComics.map((recommandation, index) => {
              return (
                <div className="recommandation">
                  <p>{recommandation.title}</p>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};
export default SearchBarComics;
