//import { render } from '@testing-library/react';
import React from "react";
import styles from "./SearchCard.module.css";
import CardFooter from "../Button/CardFooter";

// hoverEvent = (e)=>{
//     e.target.styles.background = "#E7EAEE";
// }

function SearchCard({ content }) {
  console.log(content);
  const footContent = {
    commentNum: content.commentNum,
    stampNum: content.stampNum,
    footprintNum: content.footPrintNum,
  };
  const date = content.updatedAt.substring(0, 10);
  let contentText = "";
  for (let block of content.contentsList) {
    contentText = contentText + " " + block.content;
  }
  return (
    <div className={styles.searchcard_frame}>
      <div className={styles.search_card}>
        <img
          className={styles.searchcard_profile_img}
          src={content.userInfo.userImgUrl}
        ></img>

        <div className={styles.contentBox}>
          <h2 className={styles.searchcard_text_title}>{content.preview}</h2>
          {/* <div className={styles.filter_box}> */}
          <div className={styles.profile_box}>
            <span className={styles.searchcard_name}>
              {content.userInfo.userName}
            </span>
            <span className={styles.searchcard_job}>
              {content.userInfo.job}
            </span>
          </div>
          {/* </div> */}
          <h2
            className={styles.searchcard_contents}
            dangerouslySetInnerHTML={{ __html: contentText }}
          ></h2>
          <div className={styles.footerBox}>
            <h2 className={styles.searchcard_date}>{date}</h2>
            <CardFooter content={footContent} color="var(--darkblack-font)" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchCard;
