import styles from "../SubMyFootstep/SubMyFootstep.module.css";
import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar/SideBar.js";
import Header from "../../components/Header/Header.js";
import Footer from "../../components/Footer/Footer.js";
//import MyfootstepBanner from "../../components/Banner/MyfootstepBanner";
//import TopBanner from"../../components/Banner/TopBanner";
import Comments_SideBar from "../../components/Comments_SideBar/Comments_SideBar";
import deleteImg from "../../icons/delete.svg";

function SubMyFootstep () {
  const [open, setOpen] = useState(false);
  const [commentsopen, setCommentsOpen] = useState(false);
  const sideBarHandler = () => {
    setOpen((prev) => !prev);
  };

  const commentsHandler = () => {
    setCommentsOpen((prev) => !prev);
  };

  const [textValue, setTextValue] = useState("");
  const handleSetValue = (e) => {
    setTextValue(e.target.value);

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
              <div className={styles.previewbox}>
                <div className={styles.title}> Preview </div>
                {/* <div className={styles.text}>
                  해당 페이지가 어떤 내용을 담고 있는지 작성하는 preview 글입니다.<br />
                  한 줄 또는 두 줄로 간단하게 작성해주세요.
                </div> */}
                <textarea placeholder=" 해당 페이지가 어떤 내용을 담고 있는지 작성하는 preview 글입니다.
                  한 줄 또는 두 줄로 간단하게 작성해주세요." className={styles.text}
                  value={textValue}onChange={(e) => handleSetValue(e)}>
                </textarea>
              </div>
              <div className={styles.deletebox}>
                <button className={styles.delete}>
                  <img src={deleteImg} className={styles.deleteImg} alt="delete.svg"></img>
                  <div className={styles.deleteText}>페이지 삭제</div>
                </button>
                
              </div>
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

export default SubMyFootstep;