import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SearchBar.module.css";

function SearchBar({ word }) {
  const [searchWord, setSearchWord] = useState("");
  useEffect(() => {
    setSearchWord(word);
  }, []);
  const navigate = useNavigate();
  const onChange = (event) => {
    setSearchWord(event.target.value);
  };
  const onSearch = (event) => {
    navigate(`/search?word=${searchWord}`);
    event.preventDefault();
  };

  return (
    <form className={styles.search_bar}>
      <input
        className={styles.search_input}
        type="text"
        placeholder="Search for other’s footstep..."
        onChange={onChange}
        value={searchWord}
      />
      <button className={styles.search_btn} onClick={onSearch}></button>
    </form>
  );
}

export default SearchBar;
