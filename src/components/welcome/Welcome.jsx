import React from "react";
import SearchForm from "../searchForm";
import Avatar from "../../assets/avatar4.png";
import "./welcome.css";
import Buttons from "../buttons";

const Welcome = () => {
  return (
    <div className="welcome-container">
      <header className="welcome-menu">
        <ul>
          <li>Friends</li>
          <li>Online</li>
          <li>All</li>
          <li>Pending</li>
          <li>Blocked</li>
          <li>Add Friend</li>
        </ul>
      </header>
      <div className="friends-search-container">
        <SearchForm />
      </div>
      <main className="friends-list-container">
        <div className="online-friends-count">
          <h4>Online</h4>
          <h4>1</h4>
        </div>
        <div className="friends-list">
          <img src={Avatar} alt="avatar" />
          <div className="friend-profile">
            <h4>USER NAME</h4>
            <h5>user status</h5>
          </div>
          <div className="options-button">
            <Buttons name="📩" />
            <Buttons name="more" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Welcome;
