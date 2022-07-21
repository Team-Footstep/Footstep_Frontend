import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar/SideBar.js";
import styles from "../Home/Home.module.css";
import Header from "../../components/Header/Header.js"
import Footer from "../../components/Footer/Footer.js"
import ShortCard from "../../components/Card/ShortCard.js";
import LongCard from "../../components/Card/LongCard.js";

function Home () {
  const [open, setOpen] = useState(true);
  const sideBarHandler = () => {
    setOpen((prev) => !prev);
  };
  const [cardContent, setCardContent] = useState({});
    useEffect(() => {
        setCardContent({
            img_url: "https://via.placeholder.com/60x40",
            name: "백은미",
            job: "프론트엔드 개발자",
            title: `카드 제목이 들어갈 자리입니다. 이 카드의 제목은 때로는 두줄까지
                    가능합니다. 카드 제목이 들어갈 자리입니다.`,
            content: `글의 내용이 들어갈 자리입니다. 이 내용은 대충 7줄 정도?`,
            foot_cnt: "12345",
            footprint_cnt: "2K",
            follow_cnt: "16",
        });
    }, []);
  return (
    <div>
        <Header 
          state={open}
          clickFunc={sideBarHandler}
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
            <ShortCard content={cardContent}/>
            <LongCard content={cardContent}/>
          </div>
          <Footer/>
        </div>
      </div>
    </div>
  );
};

export default Home;