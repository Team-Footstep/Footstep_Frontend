import styles from "../OtherFootstep/OtherFootstep.module.css";
import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar/SideBar.js";
import Header from "../../components/Header/Header.js";
import Footer from "../../components/Footer/Footer.js";
import Comments_SideBar from "../../components/Comments_SideBar/Comments_SideBar";
import OtherProfileCard from "../../components/OtherProfileCard/OtherProfileCard";

function OtherFootstep() {
  const [open, setOpen] = useState(false);
  const [commentsopen, setCommentsOpen] = useState(false);
  const sideBarHandler = () => {
    setOpen((prev) => !prev);

  };

  const commentsHandler = () => {
    setCommentsOpen((prev) => !prev);
  };
  const [otherProfileContent, setOtherProfileContent] = useState({
    userImgUrl: "",
    userName: "",
    job: "",
    footprintNum: "",
    introduction: "",
  });

  const getOtherProfileContent = async (userId) => {
    console.log("함수 실행")
    const json = await (await fetch(`/users/profile/${userId}`)).json();
    console.log(json);

    const content = {
      userImgUrl: json.result.userImgUrl,
      userName: json.result.userName,
      job: json.result.job,
      footprintNum: json.result.footprintNum,
      introduction: json.result.introduction,
    }
    console.log(content)

    setOtherProfileContent(content);
  };

  // const OtherProfileCard =()=>{
  //   setOtherProfileCard((prev)=>!prev);
  // };
  // const[otherProfileCard, setOtherProfileCard] =useState(0)
  // setOtherProfileCard(true);
  // setOtherProfileCardContent(true);

  useEffect(() => {
    console.log("파일실행")
    getOtherProfileContent(1);    // test : dummy data
  }, []);


  return (
    <div>
      <Header
        state={open}
        clickFunc={sideBarHandler}
        comments_clickFunc={commentsHandler}
        icon={true}
        upper_block={true}
      />
      <div className={styles.contents}>
        <SideBar
          img={null}
          name={"문비"}
          job={"프론트앤드 디자이너"}
          footprint={2000}
          display={!open}
          login={true}
        />
        <div className={styles.scroll}>
          <div className={styles.body_contents}>
            <OtherProfileCard content={otherProfileContent} />
            <div className={styles.line}></div>
          </div>

        </div>
        <div>
          <Comments_SideBar display={commentsopen} />
        </div>
      </div>

      <Footer />


    </div>
  );
}

export default OtherFootstep;