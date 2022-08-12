import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar/SideBar.js";
import styles from "../Home/Home.module.css";
import Header from "../../components/Header/Header.js";
import Footer from "../../components/Footer/Footer.js";
import ShortCard from "../../components/Card/ShortCard.js";
import LongCard from "../../components/Card/LongCard.js";
import ProfileCard from "../../components/ProfileCard/ProfileCard.js";
import TopBanner from "../../components/Banner/TopBanner.js";
import BodyBanner from "../../components/Banner/BodyBanner.js";
import MainSearchBar from "../../components/MainSearchBar/MainSearchBar.js";

function Home() {
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

  const keywords = [
    "프론트앤드 경험",
    "백앤드 경력",
    "IT회사 면접",
    "디자인 커리큘럼",
  ];
  return (
    <div>
      <Header
        state={open}
        clickFunc={sideBarHandler}
        icon={false}
        upper_block={false}
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
            <div id={styles.searchBar_div}>
              <MainSearchBar keywords={keywords} />
            </div>
            <ProfileCard
              image={"https://via.placeholder.com/200x100"}
              username={"문비"}
              job={"프론트앤드 디자이너"}
              introduction={`새로운 기록입니다.
                            <br />Preview에 작성한 내용이 출력됩니다.`}
              date={"2021/07/12"}
              k={"2K"}
            />
            <div id={styles.new_footstep}>
              <h2>
                Follower's<span>NEW FOOTSTEP</span>
              </h2>
              <div className={styles.longcard_box}>
                <LongCard content={cardContent} />
                <LongCard content={cardContent} />
                <LongCard content={cardContent} />
                <LongCard content={cardContent} />
              </div>
              <button className={styles.more_btn}>View More</button>
            </div>
            <BodyBanner />
            <div id={styles.trend_box}>
              <h2>
                Trending<span>THIS WEEK</span>
              </h2>
              <div className={styles.shortcard_box}>
                <ShortCard content={cardContent} />
                <ShortCard content={cardContent} />
                <ShortCard content={cardContent} />
                <ShortCard content={cardContent} />
                <ShortCard content={cardContent} />
                <ShortCard content={cardContent} />
                <ShortCard content={cardContent} />
                <ShortCard content={cardContent} />
                <ShortCard content={cardContent} />
                <ShortCard content={cardContent} />
                <ShortCard content={cardContent} />
                <ShortCard content={cardContent} />
                <ShortCard content={cardContent} />
                <ShortCard content={cardContent} />
                <ShortCard content={cardContent} />
                <ShortCard content={cardContent} />
              </div>
            </div>

            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
