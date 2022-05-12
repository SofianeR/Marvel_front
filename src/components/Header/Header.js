import { Link } from "react-router-dom";

import Marvel_Logo from "../../assets/img/Marvel_Logo.svg";
import ModalLogin from "../Modals/ModalLogin";
import ModalSignup from "../Modals/ModalSignup";

const Header = ({
  showModalLogin,
  setShowModalLogin,
  setShowModalSignup,
  showModalSignup,
  setUser,
  token,
}) => {
  return (
    <header>
      <div className="container-header">
        <div className="logo-header">
          <Link
            className="link-nav"
            // style={{ textDecoration: "none" }}
            to={"/"}>
            <img src={Marvel_Logo} alt="" />
          </Link>
        </div>
        <nav>
          <Link
            className="link-nav"
            // style={{ textDecoration: "none" }}
            to={"/"}>
            <h4>Personnages</h4>
          </Link>
          <Link
            className="link-nav"
            // style={{ textDecoration: "none" }}
            to={"/comics"}>
            <h4>Comics</h4>
          </Link>
          <Link
            className="link-nav"
            // style={{ textDecoration: "none" }}
            to={"/favoris"}>
            <h4>Favoris</h4>
          </Link>
        </nav>
        {token ? (
          <div className="deconnexion">
            <button
              onClick={() => {
                setUser(null);
              }}>
              Deconnexion
            </button>
          </div>
        ) : (
          <div className="login">
            <button
              onClick={() => {
                setShowModalLogin(!showModalLogin);
                setShowModalSignup(false);
              }}>
              Se connecter
            </button>
            <button
              onClick={() => {
                setShowModalLogin(false);
                setShowModalSignup(!showModalSignup);
              }}>
              S'inscrire
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
export default Header;
