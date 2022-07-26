// 텍스트박스 컴포넌트 제작후 프로필설정 파일로 export할거임
import React from "react";
import styles from "../ProfileSetting/textbox.module.css";

function TextBox({ isSpecial, value }) {
  return (
    <div>
      {isSpecial ? (
        <input
          className={`${value ? styles.name_job : styles.email_code}`}
          placeholder="작성해주시오..."
          type="text"
        />
      ) : (
        <input
          className={styles.aboutme}
          placeholder="작성해주시오..."
          type="text"
        />
      )}

      {/* {value ? (
        <input
          className={styles.email_code}
          placeholder="작성해주시오..."
          type="text"
        ></input>
      ) : null} */}
    </div>
  );
}
export default TextBox;
