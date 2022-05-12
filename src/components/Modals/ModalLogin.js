import axios from "axios";
import { useState, useEffect } from "react";

const ModalLogin = ({ showModalLogin, setUser, setShowModalLogin }) => {
  const [loginMail, setLoginMail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const login = async () => {
    try {
      if (loginMail.length && loginPassword) {
        const response = await axios.post(
          "https://marvel-sr.herokuapp.com/user/login",
          {
            email: loginMail,
            password: loginPassword,
          }
        );
        setUser(response.data.token, response.data);
        console.log(response.data);
        setShowModalLogin(false);
      } else {
        alert("erreur mail ou password");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    showModalLogin && (
      <div className="modal-container">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            login();
          }}>
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => {
              setLoginMail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setLoginPassword(e.target.value);
            }}
          />
          <input type="submit" value={"Se connecter"} />
        </form>
      </div>
    )
  );
};
export default ModalLogin;
