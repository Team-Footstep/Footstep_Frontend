import styles from "../MyFootstep/MyFootstep.module.css";
import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar/SideBar.js";
import Header from "../../components/Header/Header.js";
import Footer from "../../components/Footer/Footer.js";
import MyfootstepBanner from "../../components/Banner/MyfootstepBanner";
import TopBanner from"../../components/Banner/TopBanner";
import Comments_SideBar from "../../components/Comments_SideBar/Comments_SideBar";
import TextEditor from "../../components/TextEditor/TextEditor.js";
import newDummyComment from "../../db/newDummyComment.json";
import dummyBlock from "../../db/dummyBlock.json";

function MyFootstep ({userId}) {
  //calling api area==================
  useEffect(()=>{
    getNewContent();
  },[]);
  
  const getNewContent = async () => {
    const contentJson = await (await fetch("/pages/get/14")).json();
    console.log(contentJson);
  };

  // const postEditedContent = async () => {
  //   fetch(`/mainpage/new/${2}`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify([...localBlock]),
  //   }).then((response) => response.json())
  // }
  //calling api area==================
  const [open, setOpen] = useState(false);
  const [commentsopen, setCommentsOpen] = useState(false);
  const [localLiveBlock, setLocalLiveBlock] = useState(dummyBlock["result"]["blocks"]);
  const [localBlock, setLocalBlock] = useState(localLiveBlock);
  const [localComment, setLocalComment] = useState(newDummyComment["result"][0]["comments"]);
  const sideBarHandler = () => {
    setOpen((prev) => !prev);
  };

  const commentsHandler = () => {
    setCommentsOpen((prev) => !prev);
  };

  // TextEditor===============
  // dummy id value

  const USER_ID = "13";
  //local data array
  const handleTextData = (liveTextArray, deadTextArray, localCommentArray) => {
    console.log("liveTextArray:", liveTextArray, "deadTextArray", deadTextArray, "localCommentArray", localCommentArray);
    setLocalLiveBlock(liveTextArray);
    setLocalBlock(liveTextArray+deadTextArray);
    setLocalComment(localCommentArray);
  };
  //TextEditor===============
  const handleCommentData = (feedcomments) => {
    console.log(feedcomments);
  }


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
              <TopBanner />
              <div className={styles.body_texteditor}>
                <TextEditor
                  blockData={dummyBlock["result"]["blocks"]}
                  commentData={newDummyComment["result"][0]["comments"]}
                  propDataFunction={handleTextData}
                  userId={USER_ID}
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