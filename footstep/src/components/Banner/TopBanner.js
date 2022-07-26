import styles from "./TopBanner.module.css";

function TopBanner() {
    return (
        <div className={styles.outer_container}>
            <div className={styles.inner_container}>
                <h1>By Following their FOOTSTEP</h1>
                <p>
                    여러분의 풋스텝을 시작하세요! 이곳은 슬로건이나 서비스를
                    설명하는 페이지이며,
                    <br />이 정도 길이의 두줄 문장이었으면 좋겠습니다.
                </p>
                <div id={styles.slide_container}>
                    <div id={styles.slide_box}>
                        <div className={styles.slide_circle}></div>
                        <div className={styles.slide_circle}></div>
                        <div className={styles.slide_circle}></div>
                        <button id={styles.slide_btn}></button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopBanner;
