import React from "react";
import SearchForm from "../../components/searchForm";
import Users from "../../components/users";
import "./usersList.css";

const UsersList = () => {
  return (
    <div className="users-list-container">
      <SearchForm />
      <Users />
    </div>
  );
};

export default UsersList;
