import React from "react";
import "./loading.css";
import loading from "../../assets/slack-loading3.gif";

const Loading = () => {
  return (
    <div className="loading">
      <img src={loading} alt="loading" />
    </div>
  );
};

export default Loading;
