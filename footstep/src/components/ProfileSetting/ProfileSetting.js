import React from "react";
import styles from "../ProfileSetting/ProfileSetting.module.css";
import TextBox from "../ProfileSetting/textbox.js";
// import styles from "../ProfileSetting/Button.module.css";

function ProfileSetting({ image }) {
  const onSubmit = (event) => {
    event.preventDefault();
  };
  function resetBtn() {
    "#tmpSendFrm"[0].reset();
  }

  return (
    <div className={styles.body}>
      <form
        id="profilesetting"
        onSubmit={onSubmit}
        action="/Users/mac/Woowoo/Footstep_Frontend/footstep/src/routes/ProfileSetting/ProfileSetting.js"
        clasName={styles.container}
        method="post"
      >
        <div className={styles.profile_container}>
          <img src={image} className={styles.image} />
          <div className={styles.textbox_bundle}>
            <div className={styles.name}>
              <p>이름</p>
              <TextBox isSpecial={true} value={1} />
            </div>
            <div className={styles.job}>
              <p>직업</p>
              <TextBox isSpecial={true} value={1} />
            </div>
            <div className={styles.about_me}>
              <p>자기소개</p>
              <TextBox isSpecial={false} />
            </div>
          </div>
          <div className={styles.button_bundle}>
            <div className={styles.button_cancle}>
              <button type="button" className={styles.cancle}>
                취소하기
              </button>
            </div>
            <div className={styles.button_save}>
              <button type="submit" className={styles.save}>
                저장하기
              </button>
            </div>
          </div>
        </div>
        <div className={styles.email_container}>
          <div className={styles.email_container_content}>
            <div className={styles.email_certifi_code}>
              <div className={styles.email}>
                <p>이메일</p>
                <TextBox isSpecial={true} value={0} />
              </div>
              <div className={styles.button_certifi_code}>
                <button type="button" className={styles.code}>
                  인증코드 보내기
                </button>
              </div>
            </div>
            <div className={styles.enter_code_change}>
              <div className={styles.enter_code}>
                <p>코드 입력</p>
                <TextBox isSpecial={true} value={0} />
              </div>
              <div className={styles.button_change}>
                <button onClick={resetBtn} className={styles.change}>
                  변경하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProfileSetting;
