// src/components/SearchBar.jsx
import React from "react";
import styled from "styled-components";

const SearchBar = ({ query, onSearch }) => {
  return (
    <SearchContainer>
      <input
        type="text"
        placeholder="Search for a destination..."
        value={query}
        onChange={(e) => onSearch(e.target.value)}
      />
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  text-align: center;
  margin: 2rem auto;
  input {
    width: 80%;
    max-width: 600px;
    padding: 1rem;
    font-size: 1.1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
  }
`;

export default SearchBar;
