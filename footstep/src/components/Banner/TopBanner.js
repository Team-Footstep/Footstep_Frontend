import { useEffect, useState } from "react";
import styles from "./TopBanner.module.css";
import img1 from "../../img/top-banner.svg";
import img2 from "../../img/body-banner.svg";
import img3 from "../../img/top-banner2.jpg";

function TopBanner() {
  const [slideCnt, setSlideCnt] = useState(0);
  const [slide, setSlide] = useState(true);
  // let interval;
  // useEffect(() => {
  //     interval = setInterval(() => {
  //         slideCnt < 2 ? setSlideCnt((cnt) => cnt + 1) : setSlideCnt(0);

  //         // return () => clearTimeout(interval);
  //     }, 1000);
  // }, [slide]);

  // console.log(slideCnt);
  // useEffect(() => {}, [slideCnt]);
  let timer;
  useEffect(() => {
    if (slide == true) {
      timer = setInterval(() => {
        setSlideCnt((prev) => (prev === bannerArr.length - 1 ? 0 : prev + 1));
      }, 3000);
    } else {
      clearInterval(timer);
    }
    return () => {
      clearInterval(timer);
    };
  }, [slide]);

  const bannerArr = [
    {
      img_url: img1,
      h1: "By Following their FOOTSTEP",
      p: `여러분의 풋스텝을 시작하세요! 이곳은 슬로건이나 서비스를
설명하는 페이지이며,
<br />이 정도 길이의 두줄 문장이었으면 좋겠습니다.`,
    },
    {
      img_url: img2,
      h1: "222By Following their FOOTSTEP",
      p: `222여러분의 풋스텝을 시작하세요! 이곳은 슬로건이나 서비스를
설명하는 페이지이며,
<br />이 정도 길이의 두줄 문장이었으면 좋겠습니다.`,
    },
    {
      img_url: img3,
      h1: "333By Following their FOOTSTEP",
      p: `333여러분의 풋스텝을 시작하세요! 이곳은 슬로건이나 서비스를
설명하는 페이지이며,
<br />이 정도 길이의 두줄 문장이었으면 좋겠습니다.`,
    },
  ];

  return (
    <div
      className={styles.outer_container}
      style={{
        backgroundImage: `url(${bannerArr[slideCnt].img_url})`,
      }}
    >
      {/* <div slideCnt={slideCnt} className={styles.imgBox}>
        <img src={img1} />
        <img src={img2} />
        <img src={img3} />
        <img src={img1} />
      </div> */}
      <div className={styles.inner_container}>
        <h1>{bannerArr[slideCnt].h1}</h1>
        <p dangerouslySetInnerHTML={{ __html: bannerArr[slideCnt].p }}></p>
        <div id={styles.slide_container}>
          <div id={styles.slide_box}>
            <div
              className={
                styles.slide_circle +
                " " +
                (slideCnt == 0 ? styles.selected : "")
              }
              onClick={() => setSlideCnt(0)}
            ></div>
            <div
              className={
                styles.slide_circle +
                " " +
                (slideCnt == 1 ? styles.selected : "")
              }
              onClick={() => setSlideCnt(1)}
            ></div>
            <div
              className={
                styles.slide_circle +
                " " +
                (slideCnt == 2 ? styles.selected : "")
              }
              onClick={() => setSlideCnt(2)}
            ></div>
            <button
              id={slide ? styles.slide_btn : styles.play}
              onClick={() => setSlide((cur) => !cur)}
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
}

// const ImgBox = styled.div`
//   // position: absolute;
//   // top: 0;
//   // left: 0;
//   // right: 0;
//   overflow: hidden;
//   z-index: -5;
//   height: 27.2rem;
//   display: flex;
//   flex-direction: row;
//   transition: ${(props) =>
//     props.slideCnt === 0 ? "" : "transform 1s ease-in"};
//   transform: ${(props) => "translateX(-" + props.slideCnt * 100 + "%)"};
// `;

export default TopBanner;
