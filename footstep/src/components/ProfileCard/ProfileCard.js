import React from "react";
import styles from "./ProfileCard.module.css";
import new_icon from "../../icons/new_icon.svg";
import CardFooter from "../Button/CardFooter";

function ProfileCard({ content }) {
  const footContent = {
    commentNum: content.commentNum,
    stampNum: content.stampNum,
    footprintNum: content.footprintNum,
  };
  return (
    <div
      id={styles.profile_card}
      onClick={() => {
        window.location.href = `footstep/${content.userId}/${content.pageId}`;
      }}
    >
      <img src={content.userImgUrl} className={styles.image}></img>
      <div className={styles.content}>
        <h3 className={styles.username}>{content.userName}</h3>
        <p className={styles.job}>
          {content.job} | Foot Print<span>{content.profileFootprint}</span>
        </p>
        <p
          className={styles.introduction}
          dangerouslySetInnerHTML={{ __html: content.preview }}
        ></p>
        <div className={styles.date_box}>
          <img src={new_icon} alt="" />
          <span className={styles.date}>{content.date}</span>
        </div>
        <div className={styles.line_4}></div>
        <div className={styles.foot_box}>
          <CardFooter content={footContent} color="var(--gray-font)" />
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
