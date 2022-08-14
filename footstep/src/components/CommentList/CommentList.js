import React from "react";
import styles from "./CommentList.module.css";

function CommentList({ image, userName, userComment }) {
  return (
    <div className={styles.userCommentBox}>
      <div className={styles.user_image_name}>
        <img src={image} className={styles.comment_image}></img>
        <p className={styles.userName}>{userName}</p>
      </div>
      <div className={styles.userComment}>{userComment}</div>
    </div>
  );
}

export default CommentList;
