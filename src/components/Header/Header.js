import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import header from "../../images/header.png";
import logo from "../../images/icons/logo.png";
import { useContext } from "react";
import { UserContext } from "../../App";
import { Button } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  return (
    <div
      style={{
        backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${header})`,
      }}
      className="header"
    >
      <nav className="nav">
        <ul>
          <li>
            <img className="logo" src={logo} alt="" />
          </li>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link className="btn-book" to="/book">
              Book
            </Link>
          </li>
          <li style={{color:'white', fontSize: '30px'}}>{loggedInUser.email}</li>
          <li>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<ExitToAppIcon />}
              onClick={() => setLoggedInUser({})}
            >
                {loggedInUser && "Log out" }
            </Button>
            {/* <button onClick={() => setLoggedInUser({})}>Signout</button> */}
          </li>
        </ul>
      </nav>
      <div className="title-container">
        <h1>Burj Al Arab</h1>
        <h2>A global icon of Arabian luxury</h2>
      </div>
    </div>
  );
};

export default Header;
