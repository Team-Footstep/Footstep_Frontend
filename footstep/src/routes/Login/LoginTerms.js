import React, { useState } from "react";
import Header from "../../components/Header/Header";
import SideBar from "../../components/SideBar/SideBar";
import styles from "./LoginTerms.module.css";
import Loginstyles from "./Login.module.css";

function LoginTerms() {
  const [open, setOpen] = useState(false);
  const sideBarHandler = () => {
    setOpen((prev) => !prev);
  };
  return (
    <div>
      <Header state={open} clickFunc={sideBarHandler} />
      <div className={Loginstyles.contents}>
        <SideBar
          img={null}
          name={"문비"}
          job={"프론트앤드 디자이너"}
          footprint={2000}
          display={!open}
          login={false}
        />
        <div id={styles.wrapper}>
          <div className={styles.contents}>
            <h1>이용 약관</h1>
            <div className={styles.textBox}>
              <h2>개인 정보 수집 항목</h2>
              <p>
                홈페이지 회원 가입 시 개인 정보 수집을 어쩌고 저쩌고 머시기
                홈페이지 회원 가입 시 개인 정보 수집을 어쩌고 저쩌고
                머시기홈페이지 회원 가입 시 개인 정보 수집을 어쩌고 저쩌고
                머시기홈페이지 회원 가입 시 개인 정보 수집을 어쩌고 저쩌고
                머시기홈페이지 회원 가입 시 개인 정보 수집을 어쩌고 저쩌고
                머시기홈페이지 회원 가입 시 개인 정보 수집을 어쩌고 저쩌고
                머시기 홈페이지 회원 가입 시 개인 정보 수집을 어쩌고 저쩌고
                머시기 홈페이지 회원 가입 시 개인 정보 수집을 어쩌고 저쩌고
                머시기 홈페이지 회원 가입 시 개인 정보 수집을 어쩌고 저쩌고
                머시기 홈페이지 회원 가입 시 개인 정보 수집을 어쩌고 저쩌고
                머시기
              </p>
            </div>
            <div className={styles.textBox}>
              <h2>제 3자 개인 정보 동의 항목</h2>
              <p>
                홈페이지 회원 가입 시 개인 정보 수집을 어쩌고 저쩌고 머시기
                홈페이지 회원 가입 시 개인 정보 수집을 어쩌고 저쩌고
                머시기홈페이지 회원 가입 시 개인 정보 수집을 어쩌고 저쩌고
                머시기홈페이지 회원 가입 시 개인 정보 수집을 어쩌고 저쩌고
                머시기홈페이지 회원 가입 시 개인 정보 수집을 어쩌고 저쩌고
                머시기홈페이지 회원 가입 시 개인 정보 수집을 어쩌고 저쩌고
                머시기 홈페이지 회원 가입 시 개인 정보 수집을 어쩌고 저쩌고
                머시기 홈페이지 회원 가입 시 개인 정보 수집을 어쩌고 저쩌고
                머시기 홈페이지 회원 가입 시 개인 정보 수집을 어쩌고 저쩌고
                머시기 홈페이지 회원 가입 시 개인 정보 수집을 어쩌고 저쩌고
                머시기
              </p>
            </div>
            <div className={styles.textBox}>
              <h2>기타 동의 항목</h2>
              <p>
                홈페이지 회원 가입 시 개인 정보 수집을 어쩌고 저쩌고 머시기
                홈페이지 회원 가입 시 개인 정보 수집을 어쩌고 저쩌고
                머시기홈페이지 회원 가입 시 개인 정보 수집을 어쩌고 저쩌고
                머시기홈페이지 회원 가입 시 개인 정보 수집을 어쩌고 저쩌고
                머시기홈페이지 회원 가입 시 개인 정보 수집을 어쩌고 저쩌고
                머시기홈페이지 회원 가입 시 개인 정보 수집을 어쩌고 저쩌고
                머시기 홈페이지 회원 가입 시 개인 정보 수집을 어쩌고 저쩌고
                머시기 홈페이지 회원 가입 시 개인 정보 수집을 어쩌고 저쩌고
                머시기 홈페이지 회원 가입 시 개인 정보 수집을 어쩌고 저쩌고
                머시기 홈페이지 회원 가입 시 개인 정보 수집을 어쩌고 저쩌고
                머시기
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginTerms;
