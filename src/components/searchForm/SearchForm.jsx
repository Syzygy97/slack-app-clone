import React from "react";
import Inputs from "../inputs";
import "./searchForm.css";
import { BsSearch } from "react-icons/bs";

const SearchForm = () => {
  return (
    <div className="search-container">
      <Inputs placeholder="Search . . ." className="search-input" />
      <BsSearch />
    </div>
  );
};

export default SearchForm;
