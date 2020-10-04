import React, { useState } from "react";
import { Button, Modal } from "@material-ui/core";
import { auth } from "../firebase/Firebase";

function LogInModal({ openLogin, handleCloseLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    handleCloseLogin();
  };

  return (
    <Modal className="modal" onClose={handleCloseLogin} open={openLogin}>
      <div className="modal_container">
        <div className="modal_title">
          <h4>Sign In</h4>
        </div>
        <div className="modal_form">
          <form className="modal_input">
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
            <Button onClick={signIn}>Log In</Button>
          </form>
        </div>
      </div>
    </Modal>
  );
}

export default LogInModal;
