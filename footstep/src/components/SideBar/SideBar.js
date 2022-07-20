import React from 'react';
import styles from "../SideBar/SideBar.module.css";
import Button from "../Button/Button.js";

function SideBar ({img, name, job, footprint, display}) {
  return (
  <div className={`${styles.side_bar} ${display ? styles.blind : null}`}>
    <div className={styles.profile}>
      <img src={img} className={styles.img}></img>
      <h3 className={styles.name}>{name}</h3>
      <h4 className={styles.job}>{job}</h4>
      <div className={styles.footprint}>
        <p>footprint</p>
        <div className={styles.footprintNum}>{(footprint >= 1000) ? `${Math.floor(footprint/1000)}K` : footprint}</div>
      </div>
      <div className={styles.menu}>
        <span>Portfolio</span>
        <span>My Footstep</span>
        <span>My Follow</span>
      </div>
    </div>
    <div>
      <Button value={`설정`} onClick={null}/>
      <Button value={`로그아웃`} onClick={null}/>
    </div>
  </div>
  );
};

export default SideBar;