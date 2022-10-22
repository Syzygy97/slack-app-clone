import React from "react";
import SearchForm from "../../components/searchForm";
import Users from "../../components/users";
import "./usersList.css";

const UsersList = ({
  allUsers,
  activeChannelId,
  newMemberModal,
  setNewMemberModal,
  addNewMember,
}) => {
  return (
    <div className="users-list-container">
      <SearchForm />
      <Users
        allUsers={allUsers}
        activeChannelId={activeChannelId}
        newMemberModal={newMemberModal}
        setNewMemberModal={setNewMemberModal}
        addNewMember={addNewMember}
      />
    </div>
  );
};

export default UsersList;
