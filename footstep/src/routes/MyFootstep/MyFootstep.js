import styles from "../MyFootstep/MyFootstep.module.css";
import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar/SideBar.js";
import Header from "../../components/Header/Header.js";
import Footer from "../../components/Footer/Footer.js";
import TopBanner from "../../components/Banner/TopBanner";
import Comments_SideBar from "../../components/Comments_SideBar/Comments_SideBar";
import TextEditor from "../../components/TextEditor/TextEditor.js";
import { useParams } from "react-router-dom";
import Button from "../../components/Button/Button";

function MyFootstep({ userId, login}) {
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
  const [localComment, setLocalComment] = useState([]);
  const PAGE_ID = useParams().pageId;
  const sideBarHandler = () => {
    setOpen((prev) => !prev);
  };
  const [loading, setLoading] = useState(true);
  const EMPTY_BLOCK = {
    blockId: Date.now(),
    content: "",
    childPageId: 0,
    originalFolloweeId: {
      followeeId: 0,
      followeeImgUrl: null,
      originalId: 0,
      originalImgUrl:null
    },
    status: 1,
    isNewBlock: 1,
    stampNum: 0,
    footprintNum: 0
  }
  const PATCH_TEMPLATE = { 
    pageId : PAGE_ID,
    userId : userId,
    preview : "프리뷰입니다.",
    status : 1,
    stampOrPrint : "S",
    bookmark : 0,
    access : 1,
    contentList : [],
    depth : 1
  }

  //calling api area==================
  useEffect(() => {
    getLoginProfile(userId);
    getNewContent();
    // getNewComments();
  }, []);

  const getLoginProfile = async (userid) => {
    const json = await (await fetch(`/users/profile/${userid}`)).json();
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
    setLoginProfile(profile);
  };

  const getNewContent = async () => {
    await fetch(`/pages/get/${PAGE_ID}`)
      .then((response) => response.json())
      .then((data) => (data.result.blocks.length !== 0) ? setLocalLiveBlock(data["result"]["blocks"]) : setLocalLiveBlock([EMPTY_BLOCK]))
      .catch((error) => console.log(error));
      getCommentArray(localLiveBlock, PAGE_ID);
  };
  //content get
  const patchContent = async () => {
    await await fetch(`pages/save`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...PATCH_TEMPLATE, contentList: localBlock}),
    }).then((res) => res.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
  };
  //comments
  const getNewComments = async (pageId, blockId) => {
    await fetch(`/comment/${pageId}/${blockId}`)
      .then((response) => response.json())
      .then((data) => (data.isSuccess && data.result.length !== 0) ? setLocalComment([...localComment, data.result[0]]) : setLocalComment([...localComment]))
      .catch((error) => console.log(error));
  };

  const getCommentArray = (blockArray, pageId) => {
    blockArray.map(list => {
      getNewComments(pageId, list.blockId);
    })
  };

  // useEffect(()=>{
  //   getCommentArray(localLiveBlock, PAGE_ID);
  //   console.log("data loaded:", localComment);
  // }, []);
  //comment get
  //calling api area==================

  const commentsHandler = () => {
    setCommentsOpen((prev) => !prev);
  };

  // TextEditor===============
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
    setLocalBlock(liveTextArray + deadTextArray);
    setLocalComment(localCommentArray);
  };

  //TextEditor===============
  const handleCommentData = (feedcomments) => {
    console.log("사이드바 댓글 업데이트:", feedcomments);
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

  // useEffect(() => {
  //   console.log(history);
  //   const unblock = history.block("정말 떠나실건가요 ㅠㅠ?");
  //   return () => {
  //     unblock();
  //   };
  // }, [history]);

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
                commentData={localComment}
                propDataFunction={handleTextData}
                userId={USER_ID}
                editorType={login ? "myfootstep" : "otherfootstep"} //수정필요
                profileData={loginProfile}
                loading={loading}
              />
              <Button
                value={"저장하기"}
                onClick={patchContent}
              />
            </div>
          </div>
        </div>
        <div>
          <Comments_SideBar
            display={commentsopen}
            commentArray={localComment}
            profileData={loginProfile}
            propFunction={handleCommentData}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MyFootstep;
