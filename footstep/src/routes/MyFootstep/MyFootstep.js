import styles from "../MyFootstep/MyFootstep.module.css";
import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar/SideBar.js";
import Header from "../../components/Header/Header.js";
import Footer from "../../components/Footer/Footer.js";
import TopBanner from "../../components/Banner/TopBanner";
import Comments_SideBar from "../../components/Comments_SideBar/Comments_SideBar";
import TextEditor from "../../components/TextEditor/TextEditor.js";
import { useLocation, useParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import { useCookies } from "react-cookie";
import deleteImg from "../../icons/delete.svg";

function MyFootstep() {
  const [cookie, setCookie, removeCookie] = useCookies("id");
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
  const [localComment, setLocalComment] = useState([]);
  const PAGE_ID = useParams().pageId;
  const sideBarHandler = () => {
    setOpen((prev) => !prev);
  };
  console.log(useLocation().pathname);

  const [loading, setLoading] = useState(true);
  const EMPTY_BLOCK = {
    blockId: Math.floor(Math.random() * 1000000),
    content: "",
    childPageId: null,
    originalFolloweeId: {
      followeeId: 0,
      followeeImgUrl: null,
      originalId: 0,
      originalImgUrl: null,
    },
    status: 1,
    isNewBlock: 1,
    stampNum: 0,
    footprintNum: 0,
  };
  const PATCH_TEMPLATE = {
    pageId: parseInt(PAGE_ID),
    userId: parseInt(userId),
    preview: "프리뷰입니다.",
    status: 1,
    stampOrPrint: useLocation().pathname.indexOf("footstep") !== -1 ? "P" : "S",
    bookmark: 0,
    access: 1,
    contentList: [],
    depth: 1,
  };

  //calling api area==================
  useEffect(() => {
    if (userId === undefined) {
      alert("로그인이 필요합니다");
      window.location.href = "/login";
    }
    getLoginProfile(userId);
    getNewContent();
    // getNewComments();
  }, [PAGE_ID]);

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
      .then((data) =>
        data.result.blocks.length !== 0
          ? setLocalLiveBlock(data["result"]["blocks"])
          : setLocalLiveBlock([EMPTY_BLOCK])
      )
      .catch((error) => console.log(error));
    getCommentArray(localLiveBlock, PAGE_ID);
  };
  //content get
  const patchContent = async () => {
    const blockTemplate = localBlock.map((list) =>
      list.isNewBlock !== undefined
        ? {
            userId: parseInt(userId),
            blockId: list.blockId,
            curPageId: parseInt(PAGE_ID),
            childPageId: list.childPageId,
            content: list.content,
            isNewBlock: list.isNewBlock,
            status: list.status,
          }
        : {
            userId: parseInt(userId),
            blockId: list.blockId,
            curPageId: parseInt(PAGE_ID),
            childPageId: list.childPageId,
            content: list.content,
            isNewBlock: 0,
            status: list.status,
          }
    );
    const jsonTemplate = { ...PATCH_TEMPLATE, contentList: blockTemplate };
    await fetch(`/pages/save`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonTemplate),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
    console.log({ ...PATCH_TEMPLATE, contentList: blockTemplate });
  };
  //comments
  const getNewComments = async (pageId, blockId) => {
    const json = await fetch(`/comment/${pageId}/${blockId}`)
      .then((response) => response.json())
      .then((data) =>
        data.isSuccess && data.result.length !== 0
          ? setLocalComment([...localComment, data.result[0]])
          : setLocalComment([...localComment])
      )
      .catch((error) => console.log(error));
    console.log(json);
    // if (json.isSuccess && json.result.length !== 0) {

    // }
  };

  const getCommentArray = (blockArray, pageId) => {
    blockArray.map((list) => {
      getNewComments(pageId, list.blockId);
    });
  };

  // useEffect(()=> {
  //   window.location.reload();
  // }, []);

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
    setLocalBlock(liveTextArray.concat(deadTextArray));
    setLocalComment(localCommentArray);
  };

  //TextEditor===============
  const handleCommentData = (feedcomments) => {
    console.log("사이드바 댓글 업데이트:", feedcomments);
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
            {parseInt(PAGE_ID) === loginProfile.topPageId.print ? (
              <TopBanner />
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
                <div className={styles.line}></div>
              </div>
            )}
            <div className={styles.body_texteditor}>
              <TextEditor
                // blockData={dummyBlock["result"]["blocks"]}
                blockData={localLiveBlock}
                commentData={localComment}
                propDataFunction={handleTextData}
                userId={USER_ID}
                pageId={PAGE_ID}
                editorType={"myfootstep"}
              />
              <Button value={"저장하기"} onClick={patchContent} />
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
