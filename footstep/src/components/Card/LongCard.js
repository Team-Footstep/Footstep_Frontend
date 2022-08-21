import CardFooter from "../Button/CardFooter";
import styles from "./LongCard.module.css";

function LongCard({ content }) {
  const footContent = {
    commentNum: content.commentNum,
    stampNum: content.stampNum,
    footprintNum: content.footprintNum,
  };
  return (
    <div className={styles.card_long}>
      <img
        className={styles.card_profile_img}
        src={content.userImgUrl}
        alt={content.userName}
      />
      <h3 className={styles.card_name}>{content.userName}</h3>
      <h4 className={styles.card_job}>{content.job}</h4>
      <p className={styles.footprint}>
        Foot Print<span>{content.profileFootprint}</span>
      </p>
      <p className={styles.card_title}>{content.preview}</p>
      <p className={styles.card_content}>{content.content}</p>
      <div className={styles.card_footer}>
        <CardFooter content={footContent} color="var(--white)" />
      </div>
    </div>
  );
}

export default LongCard;
