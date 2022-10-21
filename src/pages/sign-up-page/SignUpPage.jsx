import React, { useEffect, useState } from "react";
import "./signUpPage.css";
import logo from "../../assets/yourLogoHere.png";
import Buttons from "../../components/buttons";
import Inputs from "../../components/inputs";
import { useNavigate } from "react-router-dom";

const USER_LIST_STORAGE_KEY = "usersList";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const usersListEmail = usersList.map((user) => {
    return user.email;
  });
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
      type: "password",
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
      type: "password",
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
  // useEffect(() => {
  //   fetchUsers();
  // }, []);

  const fetchUsers = () => {
    fetch("http://206.189.91.54/api/v1/auth/", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res);
      alert("Form Submitted");
      return res.json();
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
  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    const newUserData = {
      email: userData.email,
      password: userData.password,
      password_confirmation: userData.password_confirmation,
    };
    if (usersListEmail.some((item) => item === userData.email)) {
      setIsError(true);
      return;
    } else {
      // setUserData({
      //   ...userData,
      //   email: "",
      //   password: "",
      //   password_confirmation: "",
      // });
      setUsersList((prevData) => {
        return [...prevData, newUserData];
      });
      localStorage.setItem(
        USER_LIST_STORAGE_KEY,
        JSON.stringify([...usersList, newUserData])
      );
      fetchUsers();
      navigate("/login");
    }
  };
  return (
    <div className="sign-up-page">
      <div className="sign-up-container">
        <img src={logo} alt="logo" />
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
            </div>
          ))}
          {/* <label>EMAIL</label>
          <Inputs
            className="sign-up-inputs"
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="sign-up-inputs-container">
          <label>PASSWORD</label>
          <Inputs
            className="sign-up-inputs"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="sign-up-inputs-container">
          <label>CONFIRM PASSWORD</label>
          <Inputs
            className="sign-up-inputs"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          /> */}
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
