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

function Home({ userId, login }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(true);
  const sideBarHandler = () => {
    setOpen((prev) => !prev);
  };

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

  const getLoginProfile = async (userid) => {
    const json = await (await fetch(`/users/profile/${userid}`)).json();
    console.log(json);
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

    // console.log(profile);
    setLoginProfile(profile);
  };

  const [longCardContent, setLongCardContent] = useState([]);
  const [trendContent, setTrendContent] = useState([]);

  //new footstep 가져오기
  const getNewProfile = async (userId, contentJson) => {
    const json = await (await fetch(`/users/profile/${userId}`)).json();
    console.log(contentJson, json.result);

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
    const contentJson = await (await fetch(`/mainpage/new/${userId}`)).json();

    for (let i = 0; i < contentJson.result.length; i++) {
      getNewProfile(contentJson.result[i].userId, contentJson.result[i]);
    }
  };

  //trending 가져오기
  const getTrendProfile = async (userId, contentJson) => {
    const json = await (await fetch(`/users/profile/${userId}`)).json();
    console.log(contentJson, json.result);

    if (json.result !== undefined) {
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
      setLoading(true);
    }
  };
  const getTrendContent = async () => {
    const contentJson = await (await fetch("/mainpage/trending")).json();

    for (let i = 0; i < contentJson.result.length; i++) {
      getTrendProfile(contentJson.result[i].userId, contentJson.result[i]);
    }
  };

  useEffect(() => {
    console.log("로그인 된 아이디: ", userId, login);
    if (userId > 0) {
      getLoginProfile(userId);
      getNewContent();
    }

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
        login={login}
        upper_block={false}
      />
      <div className={styles.contents}>
        <SideBar profile={loginProfile} display={!open} login={login} />
        <div className={styles.scroll}>
          <div className={styles.body_contents}>
            <TopBanner />
            <div id={styles.searchBar_div}>
              <MainSearchBar keywords={keywords} />
            </div>

            {login ? (
              <div className={styles.new_footstep}>
                <h2>
                  Follower's<span>NEW FOOTSTEP</span>
                </h2>
                {longCardContent.length > 0 ? (
                  <ProfileCard content={longCardContent[0]} />
                ) : null}
                <div className={styles.longcard_box}>
                  {longCardContent.length > 0
                    ? longCardContent
                        .slice(1, 5)
                        .map((item, index) => (
                          <LongCard content={item} key={index} />
                        ))
                    : null}
                </div>
                {/* <button className={styles.more_btn}>View More</button> */}
              </div>
            ) : null}
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
