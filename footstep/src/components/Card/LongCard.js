import styles from "./LongCard.module.css";

function LongCard({ content }) {
    return (
        <div className={styles.card_long}>
            <img
                className={styles.card_profile_img}
                src={content.img_url}
                alt={content.name}
            />
            <h3 className={styles.card_name}>{content.name}</h3>
            <h4 className={styles.card_job}>{content.job}</h4>
            <p className={styles.card_title}>{content.title}</p>
            <p className={styles.card_content}>{content.content}</p>
            <div className={styles.card_footer}>
                <div className={styles.card_footprint}>
                    <span className={styles.card_footer_text}>Foot Print</span>
                    <span className={styles.card_footer_cnt}>
                        {content.footprint_cnt}
                    </span>
                </div>
                <div className={styles.card_follow}>
                    <span className={styles.card_footer_text}>팔로워</span>
                    <span className={styles.card_footer_cnt}>
                        {content.follow_cnt}
                    </span>
                </div>

                {/* <div className={styles.card_comment}>
                    <span className={styles.card_footer_text}>Comments</span>
                    <span className={styles.card_footer_cnt}>16</span>
                </div> */}
            </div>
        </div>
    );
}

export default LongCard;
