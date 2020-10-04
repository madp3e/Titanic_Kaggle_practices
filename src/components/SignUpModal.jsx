import React, { useState } from "react";
import "./SignUpModal.css";
import { auth } from "../firebase/Firebase";
import { Button, Modal } from "@material-ui/core";

function SignUpModal({ openSignUp, handleClose }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = (e) => {
    console.log("signup");
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    handleClose();
  };
  return (
    <Modal className="modal" onClose={handleClose} open={openSignUp}>
      <div className="modal_container">
        <div className="modal_title">
          <h4>Sign Up</h4>
        </div>
        <div>
          <form className="modal_input">
            <input
              value={username}
              className="modal_inputField"
              type="text"
              placeholder="Username.."
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              value={email}
              className="modal_inputField"
              type="text"
              placeholder="Email.."
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              value={password}
              className="modal_inputField"
              type="password"
              placeholder="Password.."
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={signUp}>Sign Up</Button>
          </form>
        </div>
      </div>
    </Modal>
  );
}

export default SignUpModal;
