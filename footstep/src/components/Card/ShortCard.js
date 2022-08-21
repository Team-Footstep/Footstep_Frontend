import CardFooter from "../Button/CardFooter";
import styles from "./ShortCard.module.css";

function ShortCard({ content }) {
  const footContent = {
    commentNum: content.commentNum,
    stampNum: content.stampNum,
    footprintNum: content.footprintNum,
  };

  return (
    <div className={styles.card_short}>
      <img
        className={styles.card_profile_img}
        src={content.userImgUrl}
        alt={content.userName}
      />
      <h3 className={styles.card_name}>{content.userName}</h3>
      <h4 className={styles.card_job}>{content.job}</h4>
      <p className={styles.card_title}>
        {content.preview !== undefined ? content.preview : content.introduction}
      </p>
      <div className={styles.card_line}></div>
      <div className={styles.card_footprint}>
        <CardFooter content={footContent} color="var(--darkblack-font)" />
      </div>
    </div>
  );
}

export default ShortCard;
