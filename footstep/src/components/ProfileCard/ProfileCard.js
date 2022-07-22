// import { render } from '@testing-library/react';
import React from 'react';
import styles from "./ProfileCard.module.css";

function ProfileCard ({image, username,job, introduction, date, Foot_print,k} ) {
    return (
        <div className={styles.profile_card}>
          <img src={image} className={styles.image}></img>
            <div>
              <h2 className={styles.username}>{username}</h2>
              <h2 className={styles.job}>{job}</h2>
              <h2 className={styles.introduction}>{introduction}</h2>
              <div className={styles.vector}></div>
              <h2 className={styles.date}>{date}</h2>
              <div className={styles.line_4}></div>
              <h2 className={styles.Foot_print}>{Foot_print}</h2>
              <h2 className={styles.k}>{k}</h2>
            </div>
        </div>
      );
    
  }
  
  export default ProfileCard;