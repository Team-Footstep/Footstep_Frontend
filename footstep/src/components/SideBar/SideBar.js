import React from 'react';
import styles from "../SideBar/SideBar.module.css";

function SideBar ({img, name, job, footprint}) {
  return (
  <div className={styles.side_bar}>
    <div className={styles.profile}>
      <img src={img} className={styles.img}></img>
      <h3 className={styles.name}>{name}</h3>
      <h4 className={styles.job}>{job}</h4>
      <div className={styles.footprint}>
        <p>footprint</p>
        <div className={styles.footprintNum}>{footprint}</div>
      </div>
    </div>
  </div>
  );
};

export default SideBar;