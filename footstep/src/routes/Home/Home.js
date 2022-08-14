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

  const getProfile = async (userId, contentJson) => {
    const json = await (await fetch(`/users/profile/${userId}`)).json();
    console.log(contentJson, json);
    const content = {
      userImgUrl: json.result.userImgUrl,
      userName: json.result.userName,
      job: json.result.job,
      profileFootprint: json.result.footprintNum,
      preview: contentJson.preview,
      content: `글의 내용이 들어갈 자리입니다. 이 내용은 대충 7줄 정도?`,
      date: contentJson.createdAt,
      stampNum: contentJson.stampNum,
      footprintNum: contentJson.footprintNum,
      commentNum: contentJson.commentNum,
    };
    console.log(content);

    setLongCardContent((current) => [content, ...current]);
    setLoading(true);
  };
  const getNewContent = async () => {
    const contentJson = await (await fetch("/mainpage/new/2")).json();

    for (let i = 0; i < contentJson.result.length; i++) {
      getProfile(contentJson.result[i].userId, contentJson.result[i]);
    }
  };
  console.log(loading);

  //세션(?)에 저장된 로그인 정보에 따라 userid 부분은 변수로 수정할 예정
  useEffect(() => {
    getNewContent();
  }, []);

  //예시. trending 완성되면 지울것
  const [cardContent, setCardContent] = useState([]);
  useEffect(() => {
    setCardContent({
      userImgUrl: "https://placeimg.com/640/480/animals",
      userName: "백은미",
      job: "프론트엔드 개발자",
      preview: `카드 제목이 들어갈 자리입니다. 이 카드의 제목은 때로는 두줄까지
                    가능합니다. 카드 제목이 들어갈 자리입니다.`,
      content: `글의 내용이 들어갈 자리입니다. 이 내용은 대충 7줄 정도?`,
      date: "2022/08/08",
      stampNum: "12345",
      footprintNum: "2K",
      commentNum: "16",
    });
  }, []);

<<<<<<< HEAD
    const keywords = [
        "프론트앤드 경험",
        "백앤드 경력",
        "IT회사 면접",
        "디자인 커리큘럼",
    ];
  
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
                            <button className={styles.more_btn}>
                                View More
                            </button>
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
=======
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
>>>>>>> develop
            </div>

            <div className={styles.new_footstep}>
              <h2>
                Follower's<span>NEW FOOTSTEP</span>
              </h2>
              {loading ? <ProfileCard content={longCardContent[0]} /> : null};
              <div className={styles.longcard_box}>
                {/* {longCardContent.length > 3
                  ? longCardContent.map((item, index) => (
                      <LongCard content={item} key={index} />
                    ))
                  : null} */}
                {loading
                  ? longCardContent
                      .slice(1)
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
