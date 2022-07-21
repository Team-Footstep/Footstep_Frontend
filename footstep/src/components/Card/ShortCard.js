import styles from "./ShortCard.module.css";

function ShortCard({ content }) {
    return (
        <div className={styles.card_short}>
            <img
                className={styles.card_profile_img}
                src={content.img_url}
                alt={content.name}
            />
            <h3 className={styles.card_name}>{content.name}</h3>
            <h4 className={styles.card_job}>{content.job}</h4>
            <p className={styles.card_title}>{content.title}</p>
            <div className={styles.card_line}></div>
            <div className={styles.card_footprint}>
                <svg
                    className={styles.card_foot_img}
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="img"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 100 100"
                >
                    <circle
                        cx="28.549"
                        cy="35.885"
                        r="4.342"
                        fill="currentColor"
                    />
                    <circle
                        cx="65.794"
                        cy="15.531"
                        r="8.767"
                        fill="currentColor"
                    />
                    <circle
                        cx="47.712"
                        cy="18.329"
                        r="5.469"
                        fill="currentColor"
                    />
                    <path
                        fill="currentColor"
                        d="M72.903 74.043a14.561 14.561 0 0 1-.51-14.513l-.034-.051a20.402 20.402 0 0 0 3.436-11.356c0-11.326-9.182-20.507-20.507-20.507c-11.326 0-20.507 9.181-20.507 20.507c0 2.212.36 4.338 1.009 6.335a17.804 17.804 0 0 0 2.068 5.011l-.096.055l14.854 25.729c1.568 4.64 5.947 7.984 11.115 7.984c6.484 0 11.743-5.256 11.743-11.741c0-2.813-.992-5.394-2.643-7.416l.072-.037z"
                    />
                    <circle
                        cx="36.161"
                        cy="26.693"
                        r="4.342"
                        fill="currentColor"
                    />
                </svg>
                <span className={styles.card_foot_cnt}>{content.foot_cnt}</span>
            </div>
        </div>
    );
}

export default ShortCard;