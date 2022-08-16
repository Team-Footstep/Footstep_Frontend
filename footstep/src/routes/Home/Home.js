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
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(true);
  const sideBarHandler = () => {
    setOpen((prev) => !prev);
  };

  const [longCardContent, setLongCardContent] = useState([]);
  const [trendContent, setTrendContent] = useState([]);

  //new footstep 가져오기
  const getNewProfile = async (userId, contentJson) => {
    const json = await (await fetch(`/users/profile/${userId}`)).json();

    let contentText = "";
    for (let block of contentJson.contents) {
      // console.log(block.content);
      contentText = contentText + " " + block.content;
    }

    const content = {
      userImgUrl: json.result.userImgUrl,
      userName: json.result.userName,
      job: json.result.job,
      profileFootprint: json.result.footprintNum,
      preview: contentJson.preview,
      content: contentText,
      date: contentJson.createdAt,
      stampNum: contentJson.stampNum,
      footprintNum: contentJson.footprintNum,
      commentNum: contentJson.commentNum,
    };
    // console.log(content);

    setLongCardContent((current) => [content, ...current]);
    setLoading(true);
  };
  const getNewContent = async () => {
    const contentJson = await (await fetch("/mainpage/new/2")).json();

    for (let i = 0; i < contentJson.result.length; i++) {
      getNewProfile(contentJson.result[i].userId, contentJson.result[i]);
    }
  };

  //trending 가져오기
  const getTrendProfile = async (userId, contentJson) => {
    const json = await (await fetch(`/users/profile/${userId}`)).json();
    console.log(contentJson, json);

    const content = {
      userImgUrl: json.result.userImgUrl,
      userName: json.result.userName,
      job: json.result.job,
      profileFootprint: json.result.footprintNum,
      preview: contentJson.content,
      stampNum: contentJson.stampNum,
      footprintNum: contentJson.footprintNum,
      commentNum: contentJson.commentNum,
    };
    // console.log(content);

    setTrendContent((current) => [content, ...current]);
    // setLoading(true);
  };
  const getTrendContent = async () => {
    const contentJson = await (await fetch("/mainpage/trending")).json();

    for (let i = 0; i < contentJson.result.length; i++) {
      getTrendProfile(contentJson.result[i].userId, contentJson.result[i]);
    }
  };

  useEffect(() => {
    getNewContent(); //세션(?)에 저장된 로그인 정보에 따라 userid 부분은 변수로 수정할 예정
    getTrendContent();
  }, []);

  // {
  //   userImgUrl: "https://placeimg.com/640/480/animals",
  //   userName: "백은미",
  //   job: "프론트엔드 개발자",
  //   preview: `카드 제목이 들어갈 자리입니다. 이 카드의 제목은 때로는 두줄까지
  //                 가능합니다. 카드 제목이 들어갈 자리입니다.`,
  //   content: `글의 내용이 들어갈 자리입니다. 이 내용은 대충 7줄 정도?`,
  //   date: "2022/08/08",
  //   stampNum: "12345",
  //   footprintNum: "2K",
  //   commentNum: "16",
  // }

  const keywords = [
    "프론트엔드 경험",
    "백엔드 경력",
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

            <div className={styles.new_footstep}>
              <h2>
                Follower's<span>NEW FOOTSTEP</span>
              </h2>
              {loading ? <ProfileCard content={longCardContent[0]} /> : null}
              <div className={styles.longcard_box}>
                {loading
                  ? longCardContent
                      .slice(1, 5)
                      .map((item, index) => (
                        <LongCard content={item} key={index} />
                      ))
                  : null}
              </div>
              {/* <button className={styles.more_btn}>View More</button> */}
            </div>
            <div style={{ height: 210 }}></div>
            <BodyBanner />
            <div id={styles.trend_box}>
              <h2>
                Trending<span>THIS WEEK</span>
              </h2>
              <div className={styles.shortcard_box}>
                {loading
                  ? trendContent
                      .slice(0, 12)
                      .map((item, index) => (
                        <ShortCard content={item} key={index} />
                      ))
                  : null}
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
