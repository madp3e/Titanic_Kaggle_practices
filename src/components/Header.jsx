import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import React from "react";
import "./Header.css";

function Header({ handleOpenLogin, handleOpenAddPost, handleClick }) {
  return (
    <div className="header">
      <Link to="/" className="header_container">
        <img className="header_image" src="https://5ch.net/images/rabbit.png" />
        <h2 className="header_title">77Ch</h2>
      </Link>
      <div className="header_buttons">
        <Button onClick={handleOpenAddPost}>Add Post</Button>
      </div>
      <div className="header_buttons">
        <Button onClick={handleClick}>Sign Up</Button>
        <Button onClick={handleOpenLogin}>Login</Button>
      </div>
    </div>
  );
}

export default Header;
