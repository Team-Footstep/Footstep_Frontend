import React from 'react';
import styles from "../Header/Header.module.css";

function Header ({state, clickFunc}) {
  return (
    <div>
      <div className={styles.header}>
        <button onClick={clickFunc} className={styles.logo}>
          <div className={`${styles.icon_close} ${state ? styles.blind : null}`}></div>
          <div className={`${styles.icon_open} ${state ? null : styles.blind}`}></div>
          <div className={styles.logo_name}>Footstep</div>
        </button>
        <div className={styles.right}>
          <button className={styles.start}>시작하기</button>
          <button className={styles.search}></button>
        </div>
      </div>
      <div className={styles.block}></div>
    </div>
  );
};

export default Header;