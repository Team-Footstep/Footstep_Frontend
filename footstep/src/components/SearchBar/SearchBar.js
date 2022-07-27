//import { render } from '@testing-library/react';
import React from 'react';
import styles from "./SearchBar.module.css";

function SearchBar () {
    return (
        <div className={styles.search_bar}>
          <input className={styles.search_input} type="text" placeholder="Search for other’s footstep..." />
          <button className={styles.search_btn}>
          </button>
            
              
        </div>
        
      );
    
  }
  
  export default SearchBar;