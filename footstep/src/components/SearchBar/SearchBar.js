//import { render } from '@testing-library/react';
import React, { useState } from 'react';
import styles from "./SearchBar.module.css";

function SearchBar ({getWord}) {
  const [word, setWord] = useState("");
  const onChange = (event)=>{
    setWord(event.target.value);
  }

    const search_btn = () =>{
      getWord(word);
    
      

      // console.log(textValue)
      // const getTextValue = (text) => {
      //   setTextValue(text);
      //   console.log()
      
    }

    return (
        <div className={styles.search_bar}>
          <input onChange={onChange} className={styles.search_input} type="text" placeholder="Search for other’s footstep..." />
          
          <button className={styles.search_btn} onClick={search_btn}>
          </button>
            
              
        </div>
        
      );
    
  }
  
  export default SearchBar;