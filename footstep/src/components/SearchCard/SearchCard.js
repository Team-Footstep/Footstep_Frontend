//import { render } from '@testing-library/react';
import React from 'react';
import styles from "./SearchCard.module.css";
import footprint from '../../icons/footprint.svg';

// hoverEvent = (e)=>{
//     e.target.styles.background = "#E7EAEE";
// }

function SearchCard (searchcard_text_title,searchcard_name,searchcard_job,searchcard_contents,searchcard_date,searchcard_num) {
    
    return (

             <div className={styles.searchcard_frame}>
                <div className={styles.search_card}>
                    <div className={styles.searchcard_profile_img}></div>          
                
                    <div>
                        <h2 className={styles.searchcard_text_title}>{searchcard_text_title='Preview 내용이 들어갈 자리입니다. 이 카드의 제목은 한 줄까지 가능합니다.'}</h2>
                        {/* <div className={styles.filter_box}> */}
                        <div className={styles.profile_box}>
                        <span className={styles.searchcard_name}>{searchcard_name="문비"}</span>
                        <span className={styles.searchcard_job}>{searchcard_job="프론트엔드"}</span>
                        </div>
                        {/* </div> */}
                        <h2 className={styles.searchcard_contents}>{searchcard_contents="글의 내용이 들어갈 자리입니다. 이 내용은 대충 2~3줄 정도? "}</h2>
                        <h2 className={styles.searchcard_date}>{searchcard_date="2021/07/12"}</h2>
                        <img 
                            className={styles.searchcard_foot_img}
                            src={footprint} 
                            alt={footprint}>

                        </img>
                        <h2 className={styles.searchcard_num}>{searchcard_num="4"}</h2>
                        <div className={styles.line}></div>
                    </div>
         

              
                </div>
            </div>
        
      );
    
  }

  
  
  export default SearchCard;