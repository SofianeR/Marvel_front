import "./App.scss";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import Cookies from "js-cookie";

import Header from "./components/Header/Header";
// import Home from "./pages/Home";
import Characters from "./pages/Characters/Characters";
import Comics from "./pages/Comics/Comics";
import SingleCharacter from "./pages/SingleCharacter/SingleCharacter";
import Footer from "./components/Footer/Footer";
import Favoris from "./pages/Favoris/Favoris";
import ModalSignup from "./components/Modals/ModalSignup";
import ModalLogin from "./components/Modals/ModalLogin";

function App() {
  const [isLoading, setIsLoading] = useState(false);

  // filter fetchData
  const [limit, setLimit] = useState(100);
  const [skip, setSkip] = useState();
  const [name, setName] = useState("");

  // refresh searchbar
  const [titleSubmit, setTitleSubmit] = useState(false);

  // pagination
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState();

  // favoris
  const [favoris, setFavoris] = useState(Cookies.get("favoris") || []);
  const [refreshFav, setRefreshFav] = useState(false);

  //state Modal
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [showModalSignup, setShowModalSignup] = useState(false);

  // login
  const [token, setToken] = useState(Cookies.get("tokenLogin") || null);
  const [userLogged, setUserLogged] = useState();

  // function check if log
  const setUser = (token, user) => {
    if (token !== null) {
      setUserLogged(user);
      Cookies.set("tokenLogin", token);

      setFavoris(JSON.stringify(user.favoris));
      Cookies.set("favoris", JSON.stringify(user.favoris));
    } else {
      Cookies.remove("tokenLogin");
      Cookies.remove("favoris");
      // setFavoris([]);
      setToken(null);
      setUserLogged();
    }
    setToken(token);
  };

  return (
    <Router>
      <div className="App">
        <Header
          showModalLogin={showModalLogin}
          setShowModalLogin={setShowModalLogin}
          showModalSignup={showModalSignup}
          setShowModalSignup={setShowModalSignup}
          setUser={setUser}
          token={token}
        />
        <ModalLogin
          showModalLogin={showModalLogin}
          setShowModalLogin={setShowModalLogin}
          setUser={setUser}
        />
        <ModalSignup
          showModalSignup={showModalSignup}
          setShowModalSignup={setShowModalSignup}
        />

        <Routes>
          <Route
            path="/"
            element={
              <Characters
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                name={name}
                setName={setName}
                skip={skip}
                setSkip={setSkip}
                limit={limit}
                setPageCount={setPageCount}
                page={page}
                titleSubmit={titleSubmit}
                setTitleSubmit={setTitleSubmit}
                favoris={favoris}
                setFavoris={setFavoris}
                refreshFav={refreshFav}
                setRefreshFav={setRefreshFav}
                setShowModalSignup={setShowModalSignup}
                setShowModalLogin={setShowModalLogin}
                token={token}
              />
            }
          />

          <Route
            path="/comics"
            element={
              <Comics
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                skip={skip}
                limit={limit}
                setPageCount={setPageCount}
                page={page}
                titleSubmit={titleSubmit}
                setTitleSubmit={setTitleSubmit}
                setShowModalSignup={setShowModalSignup}
                setShowModalLogin={setShowModalLogin}
              />
            }
          />

          <Route
            path="/character/:id"
            element={
              <SingleCharacter
                setIsLoading={setIsLoading}
                isLoading={isLoading}
                setShowModalSignup={setShowModalSignup}
                setShowModalLogin={setShowModalLogin}
              />
            }
          />

          <Route
            path="/favoris"
            element={
              <Favoris
                stateFavoris={favoris}
                setFavoris={setFavoris}
                // refreshFav={refreshFav}
                token={token}
              />
            }
          />
        </Routes>

        <Footer
          skip={skip}
          setSkip={setSkip}
          limit={limit}
          setLimit={setLimit}
          pageCount={pageCount}
          isLoading={isLoading}
          setPage={setPage}
          page={page}
        />
      </div>
    </Router>
  );
}

export default App;
