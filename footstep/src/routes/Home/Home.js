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

  const [profCardContent, setProfCardContent] = useState();
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
    setProfCardContent(longCardContent);
    setLoading(true);
  };
  const getNewContent = async () => {
    const contentJson = await (await fetch("/mainpage/new/2")).json();

    for (let i = 0; i < contentJson.result.length; i++) {
      getProfile(contentJson.result[i].userId, contentJson.result[i]);
    }
  };
  console.log(longCardContent, longCardContent[0], profCardContent);
  console.log(loading);

  //세션(?)에 저장된 로그인 정보에 따라 userid 부분은 변수로 수정할 예정
  useEffect(() => {
    getNewContent();

    // const newContent = [];
    // fetch("/mainpage/new/2")
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then(function (data) {
    //     console.log(JSON.stringify(data));

    //     for (let i = 0; i < data.result.length; i++) {
    //       let contentJson = {
    //         userImgUrl: "",
    //         userName: "",
    //         job: "",
    //         profileFootprint: "",
    //         preview: "",
    //         content: "",
    //         date: "",
    //         stampNum: "",
    //         footprintNum: "",
    //         commentNum: "",
    //       };

    //       contentJson.commentNum = data.result[i].commentNum;
    //       contentJson.date = data.result[i].createdAt;
    //       contentJson.footprintNum = data.result[i].footprintNum;
    //       contentJson.stampNum = data.result[i].stampNum;
    //       contentJson.preview = data.result[i].preview;

    //       fetch(`/users/profile/${data.result[i].userId}`)
    //         .then((res) => {
    //           return res.json();
    //         })
    //         .then((prodata) => {
    //           console.log(JSON.stringify(prodata));

    //           contentJson.userName = prodata.result.userName;
    //           contentJson.userImgUrl =
    //             "https://placeimg.com/640/480/animals"; /*prodata.result.userImgUrl*/
    //           contentJson.job = prodata.result.job;
    //           contentJson.profileFootprint = prodata.result.footprintNum;

    //           // newContent.push({
    //           //   userImgUrl:
    //           //     "https://placeimg.com/640/480/animals" /*prodata.userImgUrl*/,
    //           //   userName: prodata.result.userName,
    //           //   job: prodata.result.job,
    //           //   profileFootprint: prodata.result.footprintNum,
    //           //   preview: data.result.preview,
    //           //   content: `글의 내용이 들어갈 자리입니다. 이 내용은 대충 7줄 정도?`,
    //           //   date: data.result.createdAt,
    //           //   stampNum: data.result.stampNum,
    //           //   footprintNum: data.result.footprintNum,
    //           //   commentNum: data.result.commentNum,
    //           // });
    //           console.log(contentJson);
    //           newContent.push(contentJson);
    //           console.log(newContent);
    //         });
    //     }
    //     console.log("/?");

    //     setProfCardContent(newContent[0]);
    //     // newContent.pop();
    //     setLongCardContent(newContent);
    //  });
  }, []);

  //예시. trending 완성되면 지울것
  const [cardContent, setCardContent] = useState([]);
  useEffect(() => {
    // setProfCardContent({
    //   userImgUrl: "",
    //   userName: "",
    //   job: "",
    //   profileFootprint: "",
    //   preview: "",
    //   content: "",
    //   date: "",
    //   stampNum: "",
    //   footprintNum: "",
    //   commentNum: "",
    // });
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
