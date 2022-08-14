import styles from "../MyFootstep/MyFootstep.module.css";
import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar/SideBar.js";
import Header from "../../components/Header/Header.js";
import Footer from "../../components/Footer/Footer.js";
import MyfootstepBanner from "../../components/Banner/MyfootstepBanner";
import TopBanner from"../../components/Banner/TopBanner";

function MyFootstep () {
  const [open, setOpen] = useState(true);
  const sideBarHandler = () => {
      setOpen((prev) => !prev);
  };

  return (
    <div>
        <Header state={open} clickFunc={sideBarHandler} />
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
        </div>
      
      <Footer />
            
      
    </div>
  );
}

export default MyFootstep;