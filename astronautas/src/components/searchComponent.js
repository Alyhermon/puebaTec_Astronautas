import React from "react";
import './searchStyle.css'

function SearchBar({ search, onSearchChange }) {
  return (
    <div className="Container">
    <div className="filter">
      <input
        type="text"
        id="nameSearch"
        placeholder="Filter by Nationality"
        className="form-control"
        value={search}
        onChange={onSearchChange}
      />
    </div>
    </div>
  );
}

export default SearchBar;