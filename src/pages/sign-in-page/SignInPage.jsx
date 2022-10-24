import React, { useState } from "react";
import "./signInPage.css";
import SlackGIF from "../../assets/slack_animated.gif";
import Buttons from "../../components/buttons";
import Inputs from "../../components/inputs";
import { useNavigate, Link } from "react-router-dom";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

const SIGNED_IN_STORAGE_KEY = "signedInData";

const SignInPage = () => {
  const navigate = useNavigate();
  const saveCredentials = (key, val) => {
    localStorage.setItem(key, val);
  };
  const [isError, setIsError] = useState(false);
  const [withAccount, setWithAccount] = useState(true);
  const [visible, setVisible] = useState(false);
  const [userInput, setUserInput] = useState([]);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const dataInputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "enter email",
      label: "EMAIL",
      errorMessage: "It should be a valid e-mail address",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: visible ? "text" : "password",
      placeholder: "enter password",
      label: "PASSWORD",
      errorMessage: "Incorrect Password",
      pattern: userData.password,
      required: true,
    },
  ];
  const LoginUser = async () => {
    await fetch("http://206.189.91.54/api/v1/auth/sign_in", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          setIsError(true);
          setWithAccount(false);
          throw Error("Invalid Credentials");
        } else {
          res.headers.forEach((val, key) => {
            if (
              key === "access-token" ||
              key === "client" ||
              key === "expiry" ||
              key === "uid"
            ) {
              saveCredentials(key, val);
            }
          });
          setUserInput(...userInput, {
            email: userData.email,
            password: userData.password,
          });
          localStorage.setItem(
            SIGNED_IN_STORAGE_KEY,
            JSON.stringify(...userInput, {
              email: userData.email,
              password: userData.password,
            })
          );
          navigate("/main");
        }
        return res.json();
      })
      .then((result) => {
        return result;
      });
  };
  const handleChange = (e) => {
    e.preventDefault();
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleInputClick = (e) => {
    e.preventDefault();
    setIsError(false);
    setWithAccount(true);
  };
  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    await LoginUser();
  };
  const togglePassword = (e) => {
    e.preventDefault();
    setVisible(!visible);
  };
  return (
    <div className="sign-in-page">
      <div className="sign-in-container">
        <img src={SlackGIF} alt="logo" />
        <h1>Sign in to Slack</h1>
        <form onSubmit={handleSignInSubmit} className="form-container">
          {dataInputs.map((input) => (
            <div className="sign-in-inputs-container" key={input.id}>
              <label>{input.label}</label>
              <Inputs
                {...input}
                className="sign-in-inputs"
                value={userData[input.name]}
                onChange={handleChange}
                onClick={handleInputClick}
              />
              <BsFillEyeSlashFill
                className={visible ? "invisible" : "visible"}
                onClick={togglePassword}
              />
              <BsFillEyeFill
                className={visible ? "visible" : "invisible"}
                onClick={togglePassword}
              />
            </div>
          ))}
          <Buttons name="Confirm" className="sign-in-button" />
        </form>
        <h4>
          Don't have an account yet? <Link to="/register">Register</Link>
        </h4>
        <h2 className={isError ? "invalid" : "valid"}>
          ACCOUNT DOES NOT EXIST
        </h2>
      </div>
    </div>
  );
};

export default SignInPage;
