import React, { useEffect, useState } from "react";
import "./signInPage.css";
import logo from "../../assets/yourLogoHere.png";
import Buttons from "../../components/buttons";
import Inputs from "../../components/inputs";
import { useNavigate } from "react-router-dom";

const SIGNED_IN_STORAGE_KEY = "signedInData";

const SignInPage = () => {
  const navigate = useNavigate();
  const saveCredentials = (key, val) => {
    localStorage.setItem(key, val);
  };
  const [isError, setIsError] = useState(false);
  const [withAccount, setWithAccount] = useState(true);
  const [userInput, setUserInput] = useState([]);
  const [usersList, setUsersList] = useState([]);
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
      type: "password",
      placeholder: "enter password",
      label: "PASSWORD",
      errorMessage: "Incorrect Password",
      pattern: userData.password,
      required: true,
    },
  ];

  useEffect(() => {
    const SERVER_DATA = JSON.parse(localStorage.getItem("usersList"));
    if (SERVER_DATA) setUsersList(SERVER_DATA);
  }, []);

  const fetchUsers = () => {
    fetch("http://206.189.91.54/api/v1/auth/sign_in", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      // console.log("response", res.headers.get("access-token"));
      // console.log("response", res.headers.get("client"));
      // console.log("response", res.headers.get("expiry"));
      // console.log("response", res.headers.get("uid"));
      res.headers.forEach((val, key) => {
        console.log(key + "->" + val);
        if (
          key === "access-token" ||
          key === "client" ||
          key === "expiry" ||
          key === "uid"
        ) {
          saveCredentials(key, val);
        }
      });
      alert("Form Submitted");
      return res.json();
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
  const validateUser = () => {
    const userCheck = usersList.find(
      (user) =>
        user.email === userData.email && user.password === userData.password
    );
    if (userCheck) {
      setUserInput(userCheck);
      localStorage.setItem(
        SIGNED_IN_STORAGE_KEY,
        JSON.stringify(...userInput, {
          email: userCheck.email,
          password: userCheck.password,
        })
      );
      fetchUsers();
      // navigate("/main");
    } else {
      setIsError(true);
      setWithAccount(false);
      return;
    }
  };
  const handleSignInSubmit = (e) => {
    e.preventDefault();
    validateUser(usersList);
  };
  return (
    <div className="sign-in-container">
      <img src={logo} alt="logo" />
      <h1>Sign in to Slacord</h1>
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
          </div>
        ))}
        <Buttons name="Confirm" className="sign-in-button" />
      </form>
      <h2 className={isError ? "invalid" : "valid"}>ACCOUNT DOES NOT EXIST</h2>
    </div>
  );
};

export default SignInPage;
