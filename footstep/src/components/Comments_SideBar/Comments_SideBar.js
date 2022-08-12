import React, { useState } from "react";
import styles from "./Comments_SideBar.module.css";
import CommentList from "../CommentList/CommentList";

function Comments_SideBar({ display }) {
  const [userimg] = useState([]);
  const [username, setUsername] = useState("IBORY");
  const [comment, setComment] = useState("");
  const [feedcomments, setFeedcomments] = useState([]);
  const [isvalid, setIsvalid] = useState(false);

  const post = () => {
    const copyFeedcomments = [...feedcomments];
    copyFeedcomments.push(comment);
    setFeedcomments(copyFeedcomments);
    setComment("");
  };

  //이건 comment배열에 저장하고 저장된 배열 전체를 출력
  //   {
  //     feedcomments.map((commentArr, k) => {
  //       return (
  //         <CommentList userName={username} userComment={commentArr} key={k} />
  //       );
  //     });
  //   }

  return (
    <div className={display ? null : styles.blind}>
      <div className={styles.comments_sidebar}>
        <div className={styles.bottom_border}>
          <p className={styles.title}>댓글</p>
        </div>
        <div className={styles.comment_boxes}>
          {feedcomments.map((commentArr, k) => {
            return (
              <CommentList
                image={userimg}
                userName={username}
                userComment={commentArr}
                key={k}
              />
            );
          })}
        </div>
        <div className={styles.input_box}>
          <img src={userimg} className={styles.input_image}></img>
          <textarea
            type="text"
            placeholder="댓글 달기"
            onChange={(e) => {
              setComment(e.target.value);
            }}
            value={comment}
          ></textarea>
          <button
            type="button"
            onClick={post}
            className={styles.post_btn}
          ></button>
        </div>
      </div>
    </div>
  );
}

export default Comments_SideBar;
