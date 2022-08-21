import React from "react";
import styles from "./CommentList.module.css";
import useRelativeTime from "../../Hooks/useRelativeTime"

function CommentList({ data }) {
  const thisTime = useRelativeTime(data.createdAt);
  return (
    <div className={styles.userCommentBox}>
      <div className={styles.user_image_name}>
        <img src={""} className={styles.comment_image}></img>
        <p className={styles.userName}>{data.userName}</p>
        <span className={styles.time}>{thisTime}</span>
      </div>
      <div className={styles.userComment}>{data.content}</div>
    </div>
  );
}

export default CommentList;
