import React from "react";
import styles from "../Header/Header.module.css";

function Header({ state, clickFunc, icon, comments_clickFunc, upper_block }) {
  return (
    <div>
      <div className={styles.header}>
        <button className={styles.logo}>
          <div
            className={`${styles.icon_close} ${state ? styles.blind : null}`}
            onClick={clickFunc}
          ></div>
          <div
            className={`${styles.icon_open} ${state ? null : styles.blind}`}
            onClick={clickFunc}
          ></div>
          <div
            className={styles.logo_name}
            onClick={() => (window.location.href = "/")}
          >
            Footstep
          </div>
        </button>
        <div className={upper_block ? styles.center : styles.blind}></div>
        <div className={styles.right}>
          <button className={icon ? styles.icon_public : styles.blind}></button>
          <button
            className={icon ? styles.icon_bookmark : styles.blind}
          ></button>
          <button
            className={icon ? styles.icon_comments : styles.blind}
            onClick={comments_clickFunc}
          ></button>
          <button
            className={icon ? styles.icon_notification : styles.blind}
          ></button>
          <button className={icon ? styles.blind : styles.start}>
            시작하기
          </button>
          <button className={styles.search}></button>
        </div>
      </div>
      <div className={styles.block}></div>
    </div>
  );
}

export default Header;
