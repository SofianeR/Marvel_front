const SearchBarCharacters = ({ setName, titleSubmit, setTitleSubmit }) => {
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
    </div>
  );
};
export default SearchBarCharacters;
