import axios from "axios";
import { useEffect, useState } from "react";

const SearchBarComics = ({
  setTitle,
  title,
  titleSubmit,
  setTitleSubmit,
  display,
  setDisplay,
  setSkip,
  showModalLogin,
  showModalSignup,
}) => {
  const [recommandationComics, setRecommandationComics] = useState([]);
  useEffect(() => {
    const fetchRecommandationComics = async () => {
      let str = `?title=${title}`;
      if (str.length > 0) {
        try {
          setDisplay(true);

          const server_url = `https://marvel-sr.herokuapp.com/comics${str}`;

          const response = await axios.get(server_url);

          setRecommandationComics(response.data.results);
        } catch (error) {
          alert(error.message);
        }
      }
    };
    fetchRecommandationComics();
  }, [title, titleSubmit]);
  return (
    <div className="search-character-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setTitleSubmit(!titleSubmit);
        }}>
        <select
          name=""
          id="skip"
          onChange={(e) => {
            setSkip(e.target.value);
          }}>
          <option value="">Skip</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="200">200</option>
          <option value="500">500</option>
        </select>
        <input
          className="search"
          type="text"
          placeholder="Search for comics"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input type="submit" value={"Envoyer"} className={"submit"} />
      </form>
      {display && (
        <div className="recommandations">
          {recommandationComics &&
            recommandationComics.map((recommandation, index) => {
              return (
                <div
                  className="container-recommandation"
                  onClick={() => {
                    setTitle(recommandation.title);
                    setTitleSubmit(!titleSubmit);
                    setDisplay(false);
                  }}>
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
