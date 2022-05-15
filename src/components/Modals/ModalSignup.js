import { useState } from "react";

import axios from "axios";

const ModalSignup = ({ showModalSignup, setShowModalSignup }) => {
  const [userNameSignup, setUserNameSignup] = useState("");
  const [emailSignup, setEmailSignup] = useState("");
  const [passwordSignup, setPasswordSignup] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [checkPassword, setCheckPassword] = useState(false);

  const signup = async () => {
    try {
      if (userNameSignup && emailSignup && passwordSignup && confirmPassword) {
        if (
          emailSignup.length > 5 &&
          userNameSignup.length > 3 &&
          passwordSignup.length > 5
        ) {
          if (passwordSignup === confirmPassword) {
            await axios.post("https://marvel-sr.herokuapp.com/user/signup", {
              email: emailSignup,
              password: passwordSignup,
              username: userNameSignup,
            });
            if (checkPassword) {
              setCheckPassword(false);
            }
            setShowModalSignup(false);
          } else {
            setCheckPassword(true);
          }
        } else {
          alert(
            "Votre mot de passe doit faire plus de 5 caractere et votre email doit faire plus de 5 caracteres"
          );
        }
      } else {
        alert("un des champs du formulaire est vide");
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    showModalSignup && (
      <div className="modal-container">
        <form
          id="signup-modal"
          onSubmit={(e) => {
            e.preventDefault();
            signup();
          }}>
          <h2>S'inscrire</h2>

          <input
            type="text"
            placeholder="username"
            onChange={(e) => {
              setUserNameSignup(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="email"
            onChange={(e) => {
              setEmailSignup(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="password"
            onChange={(e) => {
              setPasswordSignup(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="password confirm"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
          <input type="submit" className="button-submit" />
        </form>
      </div>
    )
  );
};
export default ModalSignup;
