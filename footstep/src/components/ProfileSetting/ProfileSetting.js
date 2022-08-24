import React, { useState, useRef, useEffect } from "react";
import styles from "../ProfileSetting/ProfileSetting.module.css";
import { Link } from "react-router-dom";

function ProfileSetting() {
  const [userinfo, setUserinfo] = useState({
    userName: "",
    job: "",
    introduction: "",
  });
  const [email, setEmail] = useState("");
  const [code, setCode] = useState({
    code: "",
  });
  const [Image, setImage] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );

  const updateUserinfo = (userinfo) => {
    fetch(`/users/modify/2`, {
      method: "PATCH",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        job: userinfo.job,
        userName: userinfo.userName,
        introduction: userinfo.introduction,
      }),
    })
      .then((res) => res.json())
      .then((result) =>
        setUserinfo({
          userName: result.userName,
          job: result.job,
          introduction: result.introduction,
        })
      );
  };

  const updateEmail = (email) => {
    fetch(`/users/modifyEmail/2`, {
      method: "PATCH",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(email),
    })
      .then((res) => res.json())
      .then((result) => setEmail(result.email));
  };

  const getProfile = async () => {
    const json = await (await fetch(`/users/profile/2`)).json();
    console.log(json);
    setUserinfo({
      userName: json.result.userName,
      job: json.result.job,
      introduction: json.result.introduction,
    });
    setEmail(json.result.email);
  };
  useEffect(() => {
    getProfile();
  }, []);

  // const [userinfo, setUserinfo] = useState({
  //   userName: json.result.userName,
  //   job: json.result.job,
  //   introduction: json.result.introduction,
  // });
  const onChange_User_Info = (event) => {
    setUserinfo({
      ...userinfo,
      [event.target.name]: event.target.value,
    });
  };

  const onChange_Change_Email = (e) => {
    setEmail(e.target.value);
  };

  const onChange_Certifi_Code = (e) => {
    setCode(e.target.value);
  };

  const onChange_image = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    } else {
      //업로드 취소할 시
      setImage(
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
      );
      return;
    }
    //화면에 프로필 사진 표시
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const onSubmit_User_Info = (event) => {
    event.preventDefault();
    updateUserinfo();
  };

  const onSubmit_Change_Email = (e) => {
    e.preventDefault();
    const regEmail =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    if (!regEmail.test(email)) {
      return alert("e-mail양식이 틀렸습니다");
    } else {
      updateEmail();
    }
  };

  const onSubmit_Certifi_Code = (e) => {
    e.preventDefault();
    const jsonstr_code = JSON.stringify(code, null, 2);
    console.log(jsonstr_code);
  };
  const fileInput = useRef(null);

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
          <div className={styles.profile_image_edit}>
            <img src={Image} className={styles.image} />
            <button
              type="button"
              onClick={() => {
                fileInput.current.click();
              }}
              className={styles.profile_edit_button}
            >
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="18" cy="18" r="18" fill="#32465E" />
                <path
                  d="M20.06 15.02L20.98 15.94L11.92 25H11V24.08L20.06 15.02ZM23.66 9C23.41 9 23.15 9.1 22.96 9.29L21.13 11.12L24.88 14.87L26.71 13.04C27.1 12.65 27.1 12.02 26.71 11.63L24.37 9.29C24.17 9.09 23.92 9 23.66 9ZM15.125 17.25L9 23.25V27H12.75L23.81 15.94L20.06 12.19L15.125 17.25Z"
                  fill="white"
                />
              </svg>
            </button>
            <input
              type="file"
              style={{ display: "none" }}
              accept="image/jpg,impge/png,image/jpeg"
              name="profile_img"
              onChange={onChange_image}
              ref={fileInput}
            />
          </div>
          <form
            action="/users/modify/${userId}"
            method="post"
            name="Profile_info"
            className={styles.profile_form_container}
            onSubmit={onSubmit_User_Info}
          >
            <div className={styles.profile_textbox}>
              <div>
                <label htmlFor="name">이름</label>
                <input
                  type="text"
                  // id="name"
                  className={`${styles.name} ${styles.inputstyles}`}
                  name="userName"
                  value={userinfo.userName}
                  placeholder="이름을 작성해 주세요..."
                  onChange={onChange_User_Info}
                ></input>
              </div>
              <div>
                <label htmlFor="job">직업</label>
                <input
                  type="text"
                  // id="job"
                  className={`${styles.job} ${styles.inputstyles}`}
                  name="job"
                  value={userinfo.job}
                  placeholder="직업을 작성해 주세요..."
                  onChange={onChange_User_Info}
                ></input>
              </div>
              <div>
                <label htmlFor="about_me">자기소개</label>
                {/* <input
                  type="text"
                  id="about_me"
                  className={`${styles.about_me} ${styles.inputstyles}`}
                  name="about_me"
                  value={values.about_me}
                  placeholder="자기소개를 작성해 주세요..."
                  onChange={onChange}
                ></input> */}
                <textarea
                  // id="about_me"
                  className={`${styles.about_me} ${styles.inputstyles}`}
                  name="introduction"
                  value={userinfo.introduction}
                  placeholder="자기소개를 작성해 주세요..."
                  onChange={onChange_User_Info}
                ></textarea>
              </div>
            </div>
            <div className={styles.profile_button_bundle}>
              <div>
                <button type="button" className={styles.cancle}>
                  <Link to="/">
                    {/* <span className={styles.text_cancle}>취소하기</span> */}
                    취소하기
                  </Link>
                </button>
              </div>
              <div>
                <button className={styles.save}>
                  {/* <span className={styles.text_save}>저장하기</span> */}
                  저장하기
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
            onSubmit={onSubmit_Change_Email}
            className={styles.email_form_container}
          >
            <div className={styles.emailtextbox_sendbutton}>
              <div>
                <label htmlFor="email">이메일</label>
                <input
                  type="text"
                  // id="email"
                  name="email"
                  className={`${styles.email} ${styles.inputstyles}`}
                  value={email}
                  placeholder="e-mail을 작성해 주세요..."
                  onChange={onChange_Change_Email}
                ></input>
              </div>
              <div>
                <button className={styles.send_email}>
                  {/* <span className={styles.text_send_email}>
                    인증코드 보내기
                  </span> */}
                  인증코드 보내기
                </button>
              </div>
            </div>
          </form>

          <form
            action=""
            method="post"
            // name="Email_Authentication"
            onSubmit={onSubmit_Certifi_Code}
            className={styles.email_form_container}
          >
            <div className={styles.codetextbox_changebutton}>
              <div>
                <label htmlFor="code">코드입력</label>
                <input
                  type="number"
                  // id="code"
                  name="code"
                  className={`${styles.code} ${styles.inputstyles}`}
                  value={code}
                  placeholder="코드를 입력해 주세요..."
                  onChange={onChange_Certifi_Code}
                ></input>
              </div>
              <div>
                <button className={styles.change}>변경하기</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileSetting;
