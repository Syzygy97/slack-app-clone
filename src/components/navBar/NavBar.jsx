import React from "react";
import "./navBar.css";
import Buttons from "../buttons";
import SlackLogo from "../../assets/Slack_RGB.svg";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const navigateToSignIn = (e) => {
    e.preventDefault();
    navigate("/login");
  };
  return (
    <nav className="nav-bar-container">
      <div className="logo-and-list-container">
        <img src={SlackLogo} alt="app-logo" />
        <ul>
          <li>Why Slack?</li>
          <li>Solutions</li>
          <li>Enterprise</li>
          <li>Resources</li>
          <li>Pricing</li>
        </ul>
      </div>
      <Buttons
        className="to-sign-in-button"
        name="SIGN IN"
        onClick={navigateToSignIn}
      />
    </nav>
  );
};

export default NavBar;
