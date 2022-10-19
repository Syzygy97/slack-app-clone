import React from "react";
import SearchForm from "../../components/searchForm";
import Users from "../../components/users";
import "./usersList.css";

const UsersList = ({
  allUsers,
  activeChannelId,
  setActiveChannelMemberCount,
}) => {
  return (
    <div className="users-list-container">
      <SearchForm />
      <Users
        allUsers={allUsers}
        activeChannelId={activeChannelId}
        setActiveChannelMemberCount={setActiveChannelMemberCount}
      />
    </div>
  );
};

export default UsersList;
