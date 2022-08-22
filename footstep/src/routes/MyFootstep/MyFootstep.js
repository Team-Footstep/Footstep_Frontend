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
  const [open, setOpen] = useState(false);
  const [commentsopen, setCommentsOpen] = useState(false);
  const [localLiveBlock, setLocalLiveBlock] = useState([]);
  const [localBlock, setLocalBlock] = useState(localLiveBlock);
  const [localComment, setLocalComment] = useState(newDummyComment["result"][0]["comments"]);
  const sideBarHandler = () => {
    setOpen((prev) => !prev);
  };
  //calling api area==================
  useEffect(()=>{
    getNewContent();
    getNewComments();
  },[]);
  
  const getNewContent = async () => {
    await fetch(`/pages/get/${14}`)
    .then(response => response.json())
    .then(data => setLocalLiveBlock(data["result"]["blocks"]))
    .catch(error => console.log(error));
  };
  const getNewComments = async () => {
    await fetch(`/comment/${4}/${2}`)
    .then(response => response.json())
    .then(data => console.log("comments data message", data.message))
    .catch(error => console.log(error))
  };
  //calling api area==================

  const commentsHandler = () => {
    setCommentsOpen((prev) => !prev);
  };

  // TextEditor===============
  // dummy id value

  const USER_ID = "13";
  //local data array
  const handleTextData = (liveTextArray, deadTextArray, localCommentArray) => {
    console.log("liveTextArray:", liveTextArray, "deadTextArray", deadTextArray, "localCommentArray", localCommentArray);
    // setLocalLiveBlock(liveTextArray);
    // setLocalLiveBlock([...liveTextArray]);
    setLocalBlock(liveTextArray+deadTextArray);
    setLocalComment(localCommentArray);
  };
  //TextEditor===============
  const handleCommentData = (feedcomments) => {
    console.log("댓글 업데이트:", feedcomments);
  };


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