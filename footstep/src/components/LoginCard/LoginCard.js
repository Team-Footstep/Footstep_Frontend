import styles from "./LoginCard.module.css";
import arrow from "../../icons/ArrowForward.svg";
import checkCircle from "../../icons/CheckCircle.svg";
import cancel from "../../icons/Cancel.svg";
import { useState } from "react";

function LoginCard() {
    const regEmail =
        /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    const [loginStatus, setLoginStatus] = useState(0);
    const onLoginHandler = (event) => {
        event.preventDefault();
        setJoinStatus(0);

        console.log(event.target[0].value);
        if (event.target[0].value == "") {
            return false;
        } else if (!regEmail.test(event.target[0].value)) {
            setLoginStatus(-1);
            return false;
        }

        //login api 호출
        //login 성공시 status:1, 실패시 status:-1
        setLoginStatus(1);
        event.target[0].value = "";
    };

    const [joinStatus, setJoinStatus] = useState(0);
    const onJoinHandler = (event) => {
        event.preventDefault();
        setLoginStatus(0);

        console.log(event.target[0].value);
        console.log(event.target[1].value);
        if (event.target[0].value === "") {
            return false;
        } else if (!regEmail.test(event.target[1].value)) {
            setJoinStatus(-1);
            return false;
        }

        //join api 호출
        //join 성공시 status:1, 실패시 status:-1
        setJoinStatus(1);
        event.target[0].value = "";
        event.target[1].value = "";
    };
    return (
        <div id={styles.align_wrapper}>
            <div id={styles.wrapper}>
                <div id={styles.header}>
                    <h2>Login to Footstep</h2>
                </div>
                <div id={styles.content}>
                    <div id={styles.login_div}>
                        {loginStatus === 1 ? (
                            <div className={styles.successNoti}>
                                <img src={checkCircle} alt="" />
                                <span>
                                    이메일로 전송된 로그인 링크를 확인하세요.
                                </span>
                            </div>
                        ) : loginStatus === -1 ? (
                            <div
                                className={`${styles.successNoti} ${styles.failNoti}`}
                            >
                                <img src={cancel} alt="" />
                                <span>계정을 찾을 수 없습니다.</span>
                            </div>
                        ) : null}
                        <form onSubmit={onLoginHandler}>
                            <input
                                type="text"
                                placeholder="E-mail을 입력하세요"
                                id={styles.login_input}
                            />
                            <button id={styles.login_btn}>로그인</button>
                        </form>
                    </div>
                    <div id={styles.join_div}>
                        <p id={styles.join_text}>계정이 없으신가요?</p>
                        <div className={styles.line}></div>
                        {joinStatus === 1 ? (
                            <div className={styles.successNoti}>
                                <img src={checkCircle} alt="" />
                                <span>계정 생성이 완료되었습니다.</span>
                            </div>
                        ) : null}
                        <form onSubmit={onJoinHandler}>
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
                            <button id={styles.create_btn}>
                                Create Account
                            </button>
                        </form>
                    </div>
                    <div id={styles.find_div}>
                        <a id={styles.find_text} href="#">
                            이메일 계정 찾기
                        </a>
                        <img src={arrow} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginCard;
