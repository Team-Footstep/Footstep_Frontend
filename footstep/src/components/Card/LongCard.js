import styles from "./LongCard.module.css";

function LongCard() {
    return (
        <div className={styles.card_long}>
            <img
                className={styles.card_profile_img}
                src="https://via.placeholder.com/60x40"
                alt="화이트"
            />
            <h3 className={styles.card_name}>화이트 화이트 화이트</h3>
            <h4 className={styles.card_job}>
                프론트엔드 개발자 프론트엔드 개발자
            </h4>
            <p className={styles.card_title}>
                카드 제목이 들어갈 자리입니다. 이 카드의 제목은 때로는 두줄까지
                가능합니다. 카드 제목이 들어갈 자리입니다.
            </p>
            <p className={styles.card_content}>
                글의 내용이 들어갈 자리입니다. 이 내용은 대충 7줄 정도?
                <br />1<br />2<br />3<br />4<br />5<br />6
            </p>
            <div className={styles.card_footer}>
                <div className={styles.card_footprint}>
                    <span className={styles.card_foot_text}>Foot Print</span>
                    <span className={styles.card_foot_cnt}>2K</span>
                </div>
                <div className={styles.card_follow}>
                    <span className={styles.card_foot_text}>팔로워</span>
                    <span className={styles.card_foot_cnt}>16</span>
                </div>

                {/* <div className={styles.card_comment}>
                    <span className={styles.card_foot_text}>Comments</span>
                    <span className={styles.card_foot_cnt}>16</span>
                </div> */}
            </div>
        </div>
    );
}

export default LongCard;
