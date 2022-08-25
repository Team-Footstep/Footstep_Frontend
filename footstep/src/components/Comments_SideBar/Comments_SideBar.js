import React, { useState, useEffect } from "react";
import styles from "./Comments_SideBar.module.css";
import CommentList from "../CommentList/CommentList";
import { useParams } from "react-router-dom";
import moment from 'moment';
import 'moment/locale/ko';
import uuid from "react-uuid";

function Comments_SideBar({ display, commentArray, propFunction, profileData }) {
  const [userimg] = useState([]);
  const [username, setUsername] = useState("IBORY");
  const [comment, setComment] = useState("");
  const [feedcomments, setFeedcomments] = useState(commentArray);
  const [isvalid, setIsvalid] = useState(false);
  const COMMENT_ID = "commentId";

  const post = () => {
    setFeedcomments([...feedcomments, comment]);
    setComment("");
  };

  const NEWCOMMENTS = {
    commentId: Date.now(),
    blockId: 0,
    pageId: useParams().pageId,
    userId: profileData.userId,
    userName: profileData.name,
    userImgUrl: profileData.img,
    content: "",
    updatedAt: `${moment().format('YYYY-MM-DD HH:mm')}`
  };

  useEffect(()=>{
    propFunction(feedcomments);
  }, [feedcomments]);

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
          {feedcomments.map((list, k) => {
            return (
              <CommentList
                data={list}
                key={k}
              />
            );
          })}
        </div>
        <div className={styles.input_box}>
          <img src={userimg} className={styles.input_image}></img>
          <form onSubmit={post}>
            <textarea
              type="text"
              placeholder="댓글 달기"
              onChange={(e) => {
                setComment({...NEWCOMMENTS, content: e.target.value});
              }}
              value={comment.content}
            ></textarea>
            <button
              type="button"
              className={styles.post_btn}
            ></button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Comments_SideBar;
