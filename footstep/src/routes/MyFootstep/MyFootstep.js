import styles from "../MyFootstep/MyFootstep.module.css";
import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar/SideBar.js";
import Header from "../../components/Header/Header.js";
import Footer from "../../components/Footer/Footer.js";
import MyfootstepBanner from "../../components/Banner/MyfootstepBanner";
import TopBanner from"../../components/Banner/TopBanner";
import Comments_SideBar from "../../components/Comments_SideBar/Comments_SideBar";

function MyFootstep () {
  const [open, setOpen] = useState(false);
  const [commentsopen, setCommentsOpen] = useState(false);
  const sideBarHandler = () => {
    setOpen((prev) => !prev);
  };

  const commentsHandler = () => {
    setCommentsOpen((prev) => !prev);
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

export default MyFootstep;