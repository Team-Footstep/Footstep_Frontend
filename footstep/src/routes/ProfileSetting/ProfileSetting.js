import React from "react";
import styles from "../ProfileSetting/ProfileSetting.module.css";
import ProfileSetting from "../../components/ProfileSetting/ProfileSetting";
function Route_ProfileSetting() {
  // useEffect(() => {
  //   fetch(`/users/modify/${userId}`)
  //     .then((res) => res.json())
  //     .then((result) => {
  //       setUserinfo({
  //         ...userinfo,
  //         [result.target.name]: result.target.value,
  //       });
  //     });
  // }, []);
  // const updateUserinfo = () => {
  //   fetch(`/users/modify/${userId}`, {
  //     method: "PATCH",
  //     body: JSON.stringify({
  //       userName: userinfo.userName,
  //       job: userinfo.job,
  //       introduction: userinfo.introduction,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((result) => setUserinfo(result));
  //   console.log(js);
  // };

  return (
    <div>
      <ProfileSetting />
    </div>
  );
}

export default Route_ProfileSetting;
