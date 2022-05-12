const SearchBarComics = ({ setTitle, titleSubmit, setTitleSubmit }) => {
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
    </div>
  );
};
export default SearchBarComics;
