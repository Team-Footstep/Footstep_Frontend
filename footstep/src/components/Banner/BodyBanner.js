import styles from "./BodyBanner.module.css";

function BodyBanner() {
    return (
        <div className={styles.outer_container}>
            <div className={styles.inner_container}>
                <h2>
                    FOOTSTEP에서
                    <br />
                    당신만의 이야기를 써내려 가세요.
                </h2>
            </div>
        </div>
    );
}

export default BodyBanner;
