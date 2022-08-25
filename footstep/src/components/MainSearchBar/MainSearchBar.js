import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MainSearchBar.module.css";

function MainSearchBar({ keywords }) {
  const [searchWord, setSearchWord] = useState("");
  const navigate = useNavigate();
  const onChange = (event) => {
    setSearchWord(event.target.value);
  };
  const onSearch = (event) => {
    navigate(`/search?word=${searchWord}`);
    event.preventDefault();
  };
  const onKeywordSearch = (event) => {
    navigate(`/search?word=${event.target.innerText}`);
    event.preventDefault();
  };
  return (
    <div className={styles.search_frame}>
      <form className={styles.search_bar}>
        <input
          className={styles.search_input}
          type="text"
          placeholder="Search for other’s footstep..."
          onChange={onChange}
        />
        <button className={styles.search_btn} onClick={onSearch}></button>
      </form>
      <div className={styles.category_box}>
        <button className={styles.hot_keyword} onClick={onKeywordSearch}>
          {keywords[0]}
        </button>
        <button className={styles.hot_keyword} onClick={onKeywordSearch}>
          {keywords[1]}
        </button>
        <button className={styles.hot_keyword} onClick={onKeywordSearch}>
          {keywords[2]}
        </button>
        <button className={styles.hot_keyword} onClick={onKeywordSearch}>
          {keywords[3]}
        </button>
      </div>
    </div>
  );
}

export default MainSearchBar;
