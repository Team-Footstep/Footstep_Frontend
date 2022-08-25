import styles from "../MyFootstep/MyFootstep.module.css";
import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar/SideBar.js";
import Header from "../../components/Header/Header.js";
import Footer from "../../components/Footer/Footer.js";
import Comments_SideBar from "../../components/Comments_SideBar/Comments_SideBar";
import TextEditor from "../../components/TextEditor/TextEditor.js";
import newDummyComment from "../../db/newDummyComment.json";
import dummyBlock from "../../db/dummyBlock.json";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import OtherProfileCard from "../../components/OtherProfileCard/OtherProfileCard";
import deleteImg from "../../icons/delete.svg";

function Footstep() {
  const [cookie] = useCookies("id");
  const userId = cookie.id;
  const login = cookie.id !== undefined ? true : false;

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
  const [otherProfileContent, setOtherProfileContent] = useState({
    userId: "",
    userImgUrl: "",
    userName: "",
    job: "",
    footprintNum: "",
    introduction: "",
    topPageId: {
      stamp: "",
      print: "",
    },
  });
  const pageUserId = useParams().userId;
  const pageId = useParams().pageId;
  console.log("pageId: ", pageId);
  const sideBarHandler = () => {
    setOpen((prev) => !prev);
  };

  //calling api area==================
  useEffect(() => {
    if (userId === undefined) {
      alert("로그인이 필요합니다");
      window.location.href = "/login";
    }
    getLoginProfile(userId);
    getOtherProfileContent(pageUserId);
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

  const getOtherProfileContent = async (userid) => {
    console.log("함수 실행");
    const json = await (await fetch(`/users/profile/${userid}`)).json();
    console.log(json);

    const content = {
      userId: json.result.userId,
      userImgUrl: json.result.userImgUrl,
      userName: json.result.userName,
      job: json.result.job,
      footprintNum: json.result.footprintNum,
      introduction: json.result.introduction,
      topPageId: {
        stamp: json.result.getStampTopPageRes.topStampPageId,
        print: json.result.getPrintTopPageRes.topPrintPageId,
      },
    };
    console.log(content);

    setOtherProfileContent(content);
  };

  const getNewContent = async () => {
    await fetch(`/pages/get/${pageId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPreviewText(data.result.preview);
        setLocalLiveBlock(data["result"]["blocks"]);
      })
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

  const [previewText, setPreviewText] = useState("");
  const handleSetValue = (e) => {
    setPreviewText(e.target.value);
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
            {parseInt(pageId) === otherProfileContent.topPageId.print ? (
              <OtherProfileCard content={otherProfileContent} />
            ) : (
              <div>
                <div className={styles.previewbox}>
                  <div className={styles.title}> Preview </div>
                  {/* <div className={styles.text}>
                  해당 페이지가 어떤 내용을 담고 있는지 작성하는 preview 글입니다.<br />
                  한 줄 또는 두 줄로 간단하게 작성해주세요.
                </div> */}
                  <textarea
                    placeholder=" 해당 페이지가 어떤 내용을 담고 있는지 작성하는 preview 글입니다.
                  한 줄 또는 두 줄로 간단하게 작성해주세요."
                    className={styles.text}
                    value={previewText}
                    onChange={(e) => handleSetValue(e)}
                  ></textarea>
                </div>
                <div className={styles.deletebox}>
                  <button className={styles.delete}>
                    <img
                      src={deleteImg}
                      className={styles.deleteImg}
                      alt="delete.svg"
                    ></img>
                    <div className={styles.deleteText}>페이지 삭제</div>
                  </button>
                </div>
              </div>
            )}
            <div className={styles.line}></div>
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

export default Footstep;
