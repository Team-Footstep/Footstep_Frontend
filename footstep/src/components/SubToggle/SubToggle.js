import React from 'react';
import { useState } from "react";
import styles from "../SubToggle/SubToggle.module.css"

function SubToggle ({title, number}) {
  const [openSub, setOpenSub] = useState(false);
  const subPageHandler = () => {
    setOpenSub((prev) => !prev);
  };
  return (
    <div className={styles.menu}>
      <button onClick={subPageHandler}>{title}</button>
      <div className={`${styles.menu_detail} ${openSub ? null : styles.blind}`}>
        <a className={styles.detail}>바로가기 기록</a>
      </div>
    </div>
  )
};

export default SubToggle;