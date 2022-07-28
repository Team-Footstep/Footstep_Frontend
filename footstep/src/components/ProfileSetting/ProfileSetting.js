import React, { useState } from "react";
import styles from "../ProfileSetting/ProfileSetting.module.css";
import { Link } from "react-router-dom";

function ProfileSetting({ image }) {
  const [values, setValues] = useState({
    name: "",
    job: "",
    about_me: "",
    email: "",
    code: "",
  });

  const onChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    // event.preventDefault();
    alert(JSON.stringify(values, null, 2));
  };

  const onClick = () => {
    setValues("");
    //변경하기를 클릭할시 input안의 state value값을 초기화 하고싶다!!!
  };

  // const obj = JSON.parse(values);

  // console.log(
  //   values.name,
  //   values.job,
  //   values.about_me,
  //   values.email,
  //   values.code
  // );

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.profile_container}>
          <img src={image} className={styles.image} />
          <form
            action=""
            method="post"
            name="Profile_info"
            className={styles.profile_form_container}
            onSubmit={onSubmit}
          >
            <div className={styles.profile_textbox}>
              <div>
                <label htmlFor="name">이름</label>
                <input
                  type="text"
                  id="name"
                  className={styles.name}
                  name="name"
                  value={values.name}
                  placeholder="이름을 작성해 주세요..."
                  onChange={onChange}
                ></input>
              </div>
              <div>
                <label htmlFor="job">직업</label>
                <input
                  type="text"
                  id="job"
                  className={styles.job}
                  name="job"
                  value={values.job}
                  placeholder="직업을 작성해 주세요..."
                  onChange={onChange}
                ></input>
              </div>
              <div>
                <label htmlFor="about_me">자기소개</label>
                <input
                  type="text"
                  id="about_me"
                  className={styles.about_me}
                  name="about_me"
                  value={values.about_me}
                  placeholder="자기소개를 작성해 주세요..."
                  onChange={onChange}
                ></input>
              </div>
            </div>
            <div className={styles.profile_button_bundle}>
              <div>
                <button type="button" className={styles.cancle}>
                  <Link to="/">
                    <span className={styles.text_cancle}>취소하기</span>
                  </Link>
                </button>
              </div>
              <div>
                <button className={styles.save}>
                  <span className={styles.text_save}>저장하기</span>
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className={styles.email_Authen_container}>
          <form
            action=""
            method="post"
            name="Email_Authentication"
            onSubmit={onSubmit}
            className={styles.email_form_container}
          >
            <div className={styles.emailtextbox_sendbutton}>
              <div>
                <label htmlFor="email">이메일</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  className={styles.email}
                  value={values.email}
                  placeholder="e-mail을 작성해 주세요..."
                  onChange={onChange}
                ></input>
              </div>
              <div>
                <button className={styles.send_email}>
                  <span className={styles.text_send_email}>
                    인증코드 보내기
                  </span>
                </button>
              </div>
            </div>

            <div className={styles.codetextbox_changebutton}>
              <div>
                <label htmlFor="code">코드입력</label>
                <input
                  type="number"
                  id="code"
                  name="code"
                  className={styles.code}
                  value={values.code}
                  placeholder="코드를 입력해 주세요..."
                  onChange={onChange}
                ></input>
              </div>
              <div>
                <button
                  type="button"
                  onClick={onClick}
                  className={styles.change}
                >
                  <span className={styles.text_change}>변경하기</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileSetting;
