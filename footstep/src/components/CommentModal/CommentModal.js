import React, { useEffect, useState } from "react";
import styles from "../CommentModal/CommentModal.module.css";

function CommentModal ({commentObj, propfunction, edit, bar, editable, imgURL, newComment, elapsedTime}) {
  const [localCommentObj, setLocalCommentObj] = useState(commentObj);

  const [display, setDisplay] = useState(false);
  const handleDisplay = (event) => {
    event.preventDefault();
    setDisplay((prev) => !prev);
  };

  const [onEdit, setOnEdit] = useState(edit);
  const handleEdit = () => {
    setOnEdit(true);
    setDisplay(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setOnEdit(false);
    if (!newComment) {
      propfunction(localCommentObj, null);
    } else if (newComment) {
      propfunction({...commentObj, content: event.target[0].value}, null);
      event.target[0].value = "";
    };
  };

  const handleDelete = () => {
    propfunction(null, localCommentObj);
  };

  const handleOnChange = (event) => {
    setLocalCommentObj({...localCommentObj, content: event.target.value});
  };

  return (
    <>
      <div className={styles.comment_header}>
        <div className={styles.user_data}>
          <img src={imgURL} className={styles.comment_img}></img>
          <span className={styles.user_name}>{commentObj.userName}</span>
          <span className={styles.time}>{elapsedTime}</span>
        </div>
        <div className={`${styles.comment_menu} ${editable ? null : styles.blind}`}>
          <div className={styles.comment_menu_icon} onClick={handleDisplay}></div>
          <div className={`${styles.comment_menu_modal} ${display ? null : styles.blind}`}>
            <div className={styles.comment_menu_edit} onClick={handleEdit}>
              <div className={styles.comment_menu_edit_icon}></div>
              <div className={styles.comment_menu_edit_text}>댓글 수정</div>
            </div>
            <div className={styles.comment_menu_delete} onClick={handleDelete}>
              <div className={styles.comment_menu_delete_icon}></div>
              <div className={styles.comment_menu_delete_text}>댓글 삭제</div>
            </div>
          </div>
        </div>
      </div>
      <div>
        {onEdit ? (
          <form onSubmit={handleSubmit}>
            <textarea className={styles.comment_input} type="text" value={localCommentObj.content} placeholder={"댓글 달기"} onChange={handleOnChange}></textarea>
            <button className={styles.submit_btn}></button>
          </form>
        ):(
          <div className={styles.content}>{localCommentObj.content}</div>
        ) }
      </div>
      <div className={`${styles.bar} ${bar ? null : styles.blind}`}></div>
    </>
  )
}

export default CommentModal;