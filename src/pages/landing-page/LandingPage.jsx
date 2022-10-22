import React from "react";
import Buttons from "../../components/buttons";
import NavBar from "../../components/navBar";
import "./landingPage.css";
import { Link } from "react-router-dom";
import LandingPageImage from "../../assets/welcome-page-image.png";

const LandingPage = () => {
  return (
    <div>
      <NavBar />
      <div className="landing-page">
        <article>
          <h5>WORK FROM HOME</h5>
          <div>
            <h1>Slack brings the</h1>
            <h1>team together,</h1>
            <h1>wherever you are</h1>
          </div>
          <p>
            With all of your communication and tools in one place,<br></br>{" "}
            remote teams will stay productive no matter where <br></br>you're
            working from.
          </p>
          <div className="access-buttons">
            <Buttons name="TRY SLACK FOR FREE" />
            <Buttons name="LEARN MORE" />
          </div>
          <h6>
            Need to create an account? <Link to="/register">Get Started</Link>
          </h6>
        </article>
        <figure>
          <img src={LandingPageImage} alt="landing-image" />
        </figure>
      </div>
    </div>
  );
};

export default LandingPage;
