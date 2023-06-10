import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "../css/Header.css";
import { useDispatch } from "react-redux";

const Header = () => {
  const { data } = useSelector((state) => state.auth);
  const dispatch = useDispatch();


  const handleLogo = () => {
    switch (data) {
      case null:
        return (
          <Link to="" className="logo" style={{ textDecoration: "none" }}>
            Sonix
          </Link>
        );
      case false:
        return (
          <Link to="/homePage" className="logo" style={{ textDecoration: "none" }}>
            Sonix
          </Link>
        );
      default:
        return (
          <Link
            to="/posts"
            className="logo"
            style={{ textDecoration: "none" }}
          >
            Sonix
          </Link>
        );
    }
  };

  const handleLoggedin = () => {
    switch (data) {
      case null:
        return "";
      case false:
        return (
          <a href="/auth/google">
            <button className="header-loginout">Log in with Google</button>
          </a>
        );
      default:
        return (
          <div className="header-btns">
            <Link to="/addMessage">
              <button className="header-post">Post</button>
            </Link>
            <a href="/api/logout">
              <button className="header-loginout">Logout</button>
            </a>
          </div>
        );
    }
  };
  return (
    <div className="header">
      {handleLogo()}
      {handleLoggedin()}
    </div>
  );
};

export default Header;
