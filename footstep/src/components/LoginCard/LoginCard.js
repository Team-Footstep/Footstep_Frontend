import styles from "./LoginCard.module.css";
import arrow from "../../icons/ArrowForward.svg";

function LoginCard() {
    return (
        <div id={styles.align_wrapper}>
            <div id={styles.wrapper}>
                <div id={styles.header}>
                    <h2>Login to Footstep</h2>
                </div>
                <div id={styles.content}>
                    <div id={styles.login_div}>
                        <input
                            type="text"
                            placeholder="E-mail을 입력하세요"
                            id={styles.login_input}
                        />
                        <button id={styles.login_btn}>로그인</button>
                    </div>
                    <div id={styles.join_div}>
                        <p id={styles.join_text}>계정이 없으신가요?</p>
                        <div className={styles.line}></div>
                        <input
                            type="text"
                            placeholder="Footstep에서 사용할 이름을 입력하세요"
                            className={styles.join_input}
                        />
                        <input
                            type="text"
                            placeholder="E-mail을 입력하세요"
                            className={styles.join_input}
                        />
                        <button id={styles.create_btn}>Create Account</button>
                    </div>
                    <div id={styles.find_div}>
                        <a id={styles.find_text} href="#">
                            이메일 계정 찾기
                        </a>
                        <img src={arrow} alt="이동" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginCard;
