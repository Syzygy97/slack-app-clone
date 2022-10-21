import React from "react";
import SearchForm from "../../components/searchForm";
import Users from "../../components/users";
import "./usersList.css";

const UsersList = ({
  allUsers,
  activeChannelId,
  setActiveChannelMemberCount,
  setSelectedReceiverId,
  newMemberModal,
  setNewMemberModal,
}) => {
  return (
    <div className="users-list-container">
      <SearchForm />
      <Users
        allUsers={allUsers}
        activeChannelId={activeChannelId}
        setActiveChannelMemberCount={setActiveChannelMemberCount}
        setSelectedReceiverId={setSelectedReceiverId}
        newMemberModal={newMemberModal}
        setNewMemberModal={setNewMemberModal}
      />
    </div>
  );
};

export default UsersList;
