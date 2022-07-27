// 텍스트박스 컴포넌트 제작후 프로필설정 파일로 export할거임
import React from "react";
import styles from "../ProfileSetting/textbox.module.css";

function TextBox({ isSpecial, value }) {
  const [write, setWrite] = React.useState("");
  const onChange = (event) => {
    setWrite(event.target.value);
    console.log(write);
  };

  // console.log(write);
  //"저장하기" 버튼 클릭시 입력된 데이터를 전송
  return (
    <div>
      {isSpecial ? (
        <input
          onChange={onChange}
          value={write}
          className={`${value ? styles.name_job : styles.email_code}`}
          placeholder="작성해주시오..."
          type="text"
        />
      ) : (
        <input
          onChange={onChange}
          value={write}
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
