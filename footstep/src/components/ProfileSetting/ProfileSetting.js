import React from "react";
import styles from "../ProfileSetting/ProfileSetting.module.css";
import TextBox from "../ProfileSetting/textbox.js";
import Button from "../ProfileSetting/Button.js";

function ProfileSetting({ image }) {
  return (
    <div className={styles.body}>
      <div clasName={styles.container}>
        <div className={styles.profile_container}>
          <img src={image} className={styles.image} />
          <div className={styles.textbox_bundle}>
            <div className={styles.name}>
              <p>이름</p>
              <TextBox isSpecial={true} />
            </div>
            <div className={styles.job}>
              <p>직업</p>
              <TextBox isSpecial={true} />
            </div>
            <div className={styles.about_me}>
              <p>자기소개</p>
              <TextBox isSpecial={false} />
            </div>
          </div>
          <div className={styles.button_bundle}>
            <div className={styles.button_cancle}>
              <Button value="취소하기" differ={true} />
            </div>
            <div className={styles.button_save}>
              <Button value="저장하기" differ={false} />
            </div>
          </div>
        </div>
        <div className={styles.email_container}>
          <div>
            <div className={styles.email}>
              <p>이메일</p>
              <TextBox text="이메일" />
            </div>
            <div className={styles.button_certifi_code}>
              <Button value="인증코드 보내기" differ={false} />
            </div>
          </div>
          <div>
            <div className={styles.enter_code}>
              <p>코드 입력</p>
              <TextBox text="코드" />
            </div>
            <div className={styles.button_change}>
              <Button value="변경하기" differ={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSetting;
