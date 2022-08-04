import React from "react";
import styles from "./MainSearchBar.module.css";

function MainSearchBar({ keywords }) {
    return (
        <div className={styles.search_frame}>
            <div className={styles.search_bar}>
                <input
                    className={styles.search_input}
                    type="text"
                    placeholder="Search for other’s footstep..."
                />
                <button className={styles.search_btn} onClick={null}></button>
            </div>
            <div className={styles.category_box}>
                <button className={styles.hot_keyword}>{keywords[0]}</button>
                <button className={styles.hot_keyword}>{keywords[1]}</button>
                <button className={styles.hot_keyword}>{keywords[2]}</button>
                <button className={styles.hot_keyword}>{keywords[3]}</button>
            </div>
        </div>
    );
}

export default MainSearchBar;
