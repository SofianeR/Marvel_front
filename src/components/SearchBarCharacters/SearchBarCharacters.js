import { useEffect, useState } from "react";

import axios from "axios";

const SearchBarCharacters = ({
  name,
  setName,
  titleSubmit,
  setTitleSubmit,
}) => {
  const [display, setDisplay] = useState(false);
  const [recommandations, setRecommandations] = useState([]);
  useEffect(() => {
    const fetchRecommandations = async () => {
      const cleanState = [];
      setRecommandations(cleanState);
      console.log(recommandations);
      setDisplay(true);
      try {
        let str = `?name=${name}`;

        if (name.length > 0) {
          const server_url = `https://marvel-sr.herokuapp.com/characters${str}`;
          // console.log(server_url);
          const response = await axios.get(server_url);
          setRecommandations(response.data.results);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchRecommandations();
  }, [name]);
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
            setName(e.target.value);
          }}
        />
        <input type="submit" value={"Envoyer"} />
      </form>
      {display && (
        <div className="recommandations">
          <button
            onClick={() => {
              setDisplay(false);
            }}>
            click
          </button>
          {recommandations.length > 0 &&
            recommandations.map((recommandation, index) => {
              return (
                <div className="container-recommandation">
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
