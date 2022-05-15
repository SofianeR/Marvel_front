import { Link, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  return (
    <header>
      <div className="container">
        <div className="header-container">
          {token ? (
            <div className="deconnexion">
              <button
                onClick={() => {
                  setUser(null);
                  navigate("/");
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
          <div className="column-header">
            <div className="logo-header">
              <Link
                className="link-nav div-img"
                // style={{ textDecoration: "none" }}
                to={"/"}>
                <img src={Marvel_Logo} alt="" />
              </Link>
            </div>
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
            {token ? (
              <Link
                className="link-nav"
                // style={{ textDecoration: "none" }}
                to={"/favoris"}>
                <h4>Favoris</h4>
              </Link>
            ) : null}
          </nav>
        </div>
      </div>
    </header>
  );
};
export default Header;
