import React from "react";
import { useState } from "react";
import styles from "../SubToggle/SubToggle.module.css";

function SubToggle({ title, number }) {
  const [openSub, setOpenSub] = useState(false);
  const subPageHandler = () => {
    setOpenSub((prev) => !prev);
  };
  return (
    <div className={styles.menu}>
      <div className={styles.title}>
        <div
          className={`${openSub ? styles.open : styles.close}`}
          onClick={subPageHandler}
        ></div>
        <a>{title}</a>
      </div>
      <div className={`${styles.menu_detail} ${openSub ? null : styles.blind}`}>
        <li>
          <a className={styles.detail}>바로가기 기록</a>
        </li>
      </div>
    </div>
  );
}

export default SubToggle;
