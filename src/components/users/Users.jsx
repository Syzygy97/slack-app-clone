import React from "react";
import Buttons from "../buttons";
import "./users.css";

const Users = () => {
  const fetchUsers = (e) => {
    e.preventDefault();
    console.log("test");
  };
  return (
    <div className="users-container">
      <Buttons name="GET USERS" onClick={fetchUsers} />
      <h3>ROLE 1</h3>
      <h4>User 1</h4>
      <h4>User 2</h4>
      <h3>ROLE 2</h3>
      <h4>User 3</h4>
      <h4>User 4</h4>
    </div>
  );
};

export default Users;
