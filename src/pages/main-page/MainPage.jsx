import React, { useState } from "react";
import "./mainPage.css";
import SideBar from "../../components/sideBar";
import UsersList from "../../components/usersList";
import Home from "../../components/home";
import Modals from "../../components/modals";

const MainPage = () => {
  const [modal, setModal] = useState(false);
  return (
    <div className="main-page-container">
      <SideBar modal={modal} setModal={setModal} />
      <Home />
      <UsersList />
      <Modals modal={modal} setModal={setModal} />
    </div>
  );
};

export default MainPage;
