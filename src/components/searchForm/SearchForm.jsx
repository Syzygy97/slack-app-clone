import React from "react";
import Inputs from "../inputs";
import "./searchForm.css";

const SearchForm = () => {
  return (
    <div className="search-container">
      <Inputs placeholder="Search" className="search-input" />
      <h4>🔍</h4>
    </div>
  );
};

export default SearchForm;
