import { useEffect, useState } from "react";

import axios from "axios";

const SearchBarCharacters = ({
  name,
  setName,
  titleSubmit,
  setTitleSubmit,
  setSkip,
  display,
  setDisplay,
  showModalLogin,
  showModalSignup,
}) => {
  const [recommandations, setRecommandations] = useState([]);
  useEffect(() => {
    const fetchRecommandations = async () => {
      const cleanState = [];
      setRecommandations(cleanState);
      setDisplay(true);
      try {
        let str = `?name=${name}`;

        if (name.length > 0) {
          const server_url = `https://marvel-sr.herokuapp.com/characters${str}`;
          const response = await axios.get(server_url);
          setRecommandations(response.data.results);
        }
      } catch (error) {
        alert(error.message);
      }
    };
    fetchRecommandations();
  }, [name, titleSubmit]);
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
          type="text"
          className="search"
          placeholder="Search for character"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input type="submit" value={"Envoyer"} className={"submit"} />
      </form>
      {display && (
        <div className="recommandations">
          {recommandations.length > 0 &&
            recommandations.map((recommandation, index) => {
              return (
                <div
                  className="container-recommandation"
                  onClick={() => {
                    setName(recommandation.name);
                    setTitleSubmit(!titleSubmit);
                    setDisplay(false);
                  }}>
                  <p>{recommandation.name}</p>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};
export default SearchBarCharacters;
