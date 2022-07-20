import React from "react";
import SideBar from "../../components/SideBar/SideBar.js";
import styles from "../Home/Home.module.css";
import Header from "../../components/Header/Header.js"
import { useState } from "react";

function Home () {
  const [open, setOpen] = useState(true);
  const sideBarHandler = () => {
    setOpen((prev) => !prev);
  };
  return (
    <div>
      <div className={styles.header}>
        <Header 
          state={open}
          clickFunc={sideBarHandler}
        />
      </div>
      <div className={styles.contents}>
        <div className={styles.side_bar}>
          <SideBar
              img={null}
              name={"문비"}
              job={"프론트앤드 디자이너"}
              footprint={2000}
              display={!open}
              login={false}
          />
        </div>
        <div className={styles.scroll}>

        </div>
      </div>
    </div>
  );
};

export default Home;