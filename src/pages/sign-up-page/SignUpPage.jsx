import React, { useEffect, useState } from "react";
import "./signUpPage.css";
import SlackGIF from "../../assets/slack_animated.gif";
import Buttons from "../../components/buttons";
import Inputs from "../../components/inputs";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/navBar";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

const USER_LIST_STORAGE_KEY = "usersList";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    password_confirmation: "",
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
      errorMessage:
        "Password should be 8-20 characters long and should include at least 1 letter, number and special character",
      pattern:
        "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*_+])[a-zA-Z0-9!@#$%^&*]{8,20}$",
      required: true,
    },
    {
      id: 3,
      name: "password_confirmation",
      type: visible ? "text" : "password",
      placeholder: "re-type password",
      label: "RE-TYPE PASSWORD",
      errorMessage: "Password does not match!",
      pattern: userData.password,
      required: true,
    },
  ];
  useEffect(() => {
    const SERVER_DATA = JSON.parse(localStorage.getItem("usersList"));
    if (SERVER_DATA) setUsersList(SERVER_DATA);
  }, []);

  const RegisterUser = async () => {
    await fetch("https://slackapi.avionschool.com/api/v1/auth/", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          setIsError(true);
          throw Error("USERNAME ALREADY TAKEN");
        } else {
          const newUserData = {
            email: userData.email,
            password: userData.password,
            password_confirmation: userData.password_confirmation,
          };
          setUsersList((prevData) => {
            return [...prevData, newUserData];
          });
          localStorage.setItem(
            USER_LIST_STORAGE_KEY,
            JSON.stringify([...usersList, newUserData])
          );
          navigate("/login");
        }
        return res.json();
      })
      .then((result) => result)
      .catch((err) => {
        return err;
      });
  };

  const handleChange = (e) => {
    e.preventDefault();
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleEmailClick = (e) => {
    e.preventDefault();
    setIsError(false);
  };
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    await RegisterUser();
  };
  const togglePassword = (e) => {
    e.preventDefault();
    setVisible(!visible);
  };
  const navigateToLandingPage = (e) => {
    navigate("/");
  };
  return (
    <div className="sign-up-page">
      <NavBar />
      <div className="sign-up-container">
        <img src={SlackGIF} alt="logo" onClick={navigateToLandingPage} />
        <h1>Create an account</h1>
        <form onSubmit={handleSignUpSubmit} className="form-container">
          {dataInputs.map((input) => (
            <div className="sign-up-inputs-container" key={input.id}>
              <label>{input.label}</label>
              <Inputs
                {...input}
                className="sign-up-inputs"
                value={userData[input.name]}
                onChange={handleChange}
                onClick={handleEmailClick}
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
          <Buttons name="Confirm" className="sign-up-button" />
        </form>
        <h2 className={isError ? "invalid" : "valid"}>
          USERNAME ALREADY TAKEN
        </h2>
      </div>
    </div>
  );
};

export default SignUpPage;
