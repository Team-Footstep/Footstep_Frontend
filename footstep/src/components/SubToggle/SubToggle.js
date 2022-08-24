import React, { useEffect } from "react";
import { useState } from "react";
import styles from "../SubToggle/SubToggle.module.css";

function SubToggle({ type, userId, topPageId, bookmark }) {
  const [openSub, setOpenSub] = useState(false);
  const subPageHandler = () => {
    if (userId > 0) {
      setOpenSub((prev) => !prev);
    }
  };

  const [title, setTitle] = useState("");
  const [markList, setMarkList] = useState([]);

  useEffect(() => {
    if (type === 0) {
      setTitle("Portfolio");
    } else if (type === 1) {
      setTitle("My Footstep");
    } else if (type === 2) {
      setTitle("My Follow");
    }
  }, []);
  useEffect(() => {
    setMarkList(bookmark);
  }, [bookmark]);

  console.log(markList);

  return (
    <div className={styles.menu}>
      <div className={styles.title}>
        <div
          className={`${openSub ? styles.open : styles.close}`}
          onClick={subPageHandler}
        ></div>
        {userId === 0 ? (
          <a>{title}</a>
        ) : (
          <a
            href={
              type === 1
                ? `/myfootstep/${topPageId.print}`
                : type === 2
                ? `/myfootstep/${topPageId.stamp}`
                : "#"
            }
          >
            {title}
          </a>
        )}
      </div>
      <div className={`${styles.menu_detail} ${openSub ? null : styles.blind}`}>
        {markList.map((item, index) => (
          <a
            key={index}
            className={styles.detail}
            href={`footstep/${item.userId}/${item.pageId}`}
          >
            {item.preview}
          </a>
        ))}
      </div>
    </div>
  );
}

export default SubToggle;
