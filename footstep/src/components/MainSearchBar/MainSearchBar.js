//import { render } from '@testing-library/react';
import React from 'react';
import styles from "./MainSearchBar.module.css";

function MainSearchBar (ctg_front,ctg_back,ctg_interview,ctg_design) {
    return (
        <div className={styles.search_frame}>
            <div className={styles.search_bar}>
            <input className={styles.search_input} type="text" placeholder="Search for other’s footstep..." />
            <button className={styles.search_btn} onClick={null}></button> 
            </div>
            <div className={styles.category_box}>
            <button className={styles.hot_keyword} onClick={styles.text}>{ctg_front='프론트앤드 경험'}</button>
            <button className={styles.hot_keyword}>{ctg_back='백앤드 경험'}</button>
            <button className={styles.hot_keyword}>{ctg_interview='IT회사 면접'}</button>
            <button className={styles.hot_keyword}>{ctg_design='디자인 커리큘럼'}</button>
            </div>
        </div>
      );
    
  }
  
  export default MainSearchBar;