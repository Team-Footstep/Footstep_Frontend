import styles from "../MyFootstep/MyFootstep.module.css";
import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar/SideBar.js";
import Header from "../../components/Header/Header.js";
import Footer from "../../components/Footer/Footer.js";
import MyfootstepBanner from "../../components/Banner/MyfootstepBanner";
import TopBanner from "../../components/Banner/TopBanner";
import Comments_SideBar from "../../components/Comments_SideBar/Comments_SideBar";
import TextEditor from "../../components/TextEditor/TextEditor.js";
import newDummyComment from "../../db/newDummyComment.json";
import dummyBlock from "../../db/dummyBlock.json";
import { useParams } from "react-router-dom";

function MyFootstep({ userId, login }) {
  const [loginProfile, setLoginProfile] = useState({
    img: "",
    name: "",
    job: "",
    footprint: "",
    userId: "",
    topPageId: {
      stamp: "",
      print: "",
    },
  });
  const [open, setOpen] = useState(false);
  const [commentsopen, setCommentsOpen] = useState(false);
  const [localLiveBlock, setLocalLiveBlock] = useState([]);
  const [localBlock, setLocalBlock] = useState(localLiveBlock);
  const [localComment, setLocalComment] = useState(
    newDummyComment["result"][0]["comments"]
  );
  const pageId = useParams().pageId;
  console.log("pageId: ", pageId);
  const sideBarHandler = () => {
    setOpen((prev) => !prev);
  };

  //calling api area==================
  useEffect(() => {
    getLoginProfile(userId);
    getNewContent();
    getNewComments();
  }, []);

  const getLoginProfile = async (userid) => {
    const json = await (await fetch(`/users/profile/${userid}`)).json();
    console.log(json);
    const profile = {
      img: json.result.userImgUrl,
      name: json.result.userName,
      job: json.result.job,
      footprint: json.result.footprintNum,
      userId: json.result.userId,
      topPageId: {
        stamp: json.result.getStampTopPageRes.topStampPageId,
        print: json.result.getPrintTopPageRes.topPrintPageId,
      },
    };

    // console.log(profile);
    setLoginProfile(profile);
  };

  const getNewContent = async () => {
    await fetch(`/pages/get/${pageId}`)
      .then((response) => response.json())
      .then((data) => setLocalLiveBlock(data["result"]["blocks"]))
      .catch((error) => console.log(error));
  };
  //content get
  const patchContent = async () => {
    await await fetch(`pages/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(localBlock),
    }).catch((error) => console.log(error));
  };

  const getNewComments = async () => {
    await fetch(`/comment/${4}/${2}`)
      .then((response) => response.json())
      .then((data) => console.log("comments data message", data.message))
      .catch((error) => console.log(error));
  };
  //comment get
  //calling api area==================

  const commentsHandler = () => {
    setCommentsOpen((prev) => !prev);
  };

  // TextEditor===============
  // dummy id value

  // const USER_ID = "13";
  const USER_ID = userId;
  //local data array
  const handleTextData = (liveTextArray, deadTextArray, localCommentArray) => {
    console.log(
      "liveTextArray:",
      liveTextArray,
      "deadTextArray",
      deadTextArray,
      "localCommentArray",
      localCommentArray
    );
    // setLocalLiveBlock(liveTextArray);
    // setLocalLiveBlock([...liveTextArray]);
    setLocalBlock(liveTextArray + deadTextArray);
    setLocalComment(localCommentArray);
  };
  //TextEditor===============
  const handleCommentData = (feedcomments) => {
    console.log("댓글 업데이트:", feedcomments);
  };

  // let keys = [];
  // const handleKeyDown = (e) => {
  //   keys[e.keyCode] = true;
  //   if (keys[91] && keys[83]) {
  //     console.log("Ctrl + Space");
  //     e.preventDefault();	 // prevent default browser behavior
  // }
  //   console.log(e);
  // }

  // const handleKeyUp = (e) => {
  //   keys[e.keyCode] = false;
  // }

  return (
    <div>
      <Header
        state={open}
        clickFunc={sideBarHandler}
        icon={true}
        login={login}
        upper_block={true}
      />
      <div className={styles.contents}>
        <SideBar profile={loginProfile} display={!open} login={login} />
        <div className={styles.scroll}>
          <div className={styles.body_contents}>
            <TopBanner />
            <div className={styles.body_texteditor}>
              <TextEditor
                // blockData={dummyBlock["result"]["blocks"]}
                blockData={localLiveBlock}
                commentData={newDummyComment["result"][0]["comments"]}
                propDataFunction={handleTextData}
                userId={USER_ID}
                pageId={14}
                editorType={"myfootstep"}
              />
            </div>
          </div>
        </div>
        <div>
          <Comments_SideBar
            display={commentsopen}
            commentArray={localComment}
            getUserId={USER_ID}
            propFunction={handleCommentData}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MyFootstep;
