// import { render } from '@testing-library/react';
import React from 'react';
import styles from "./ProfileCard.module.css";

function ProfileCard (image, username,job, introduction,vector,date, line_4,Foot_print,k ) {
 
  
    return (
        <div className={styles.profile_card}>
          <img src={image} className={styles.image}></img>
            <div>
              <h2 className={styles.username}>{username='문비'}</h2>
              <h2 className={styles.job}>{job='프론트엔드 디자이너'}</h2>
              <h2 className={styles.introduction}>{introduction="새로운 기록입니다."}</h2>
              <div className={styles.vector}></div>
              <h2 className={styles.date}>{date="2021/07/12"}</h2>
              <div className={styles.line_4}></div>
              <h2 className={styles.Foot_print}>{Foot_print="footprint"}</h2>
              <h2 className={styles.k}>{k="2K"}</h2>
              
        
            </div>
        </div>
      );
    
  }
  
  export default ProfileCard;