import { useEffect, useState } from "react";
import styles from "./TopBanner.module.css";
import img1 from "../../img/top-banner.svg";
import img2 from "../../img/body-banner.svg";

function TopBanner() {
    const [slideCnt, setSlideCnt] = useState(0);
    // const [slide, setSlide] = useState(true);
    // let interval;
    // useEffect(() => {
    //     interval = setInterval(() => {
    //         slideCnt < 2 ? setSlideCnt((cnt) => cnt + 1) : setSlideCnt(0);

    //         // return () => clearTimeout(interval);
    //     }, 1000);
    // }, [slide]);

    // console.log(slideCnt);
    // useEffect(() => {}, [slideCnt]);

    const bannerArr = [
        {
            img_url: img1,
            h1: "111By Following their FOOTSTEP",
            p: `111여러분의 풋스텝을 시작하세요! 이곳은 슬로건이나 서비스를
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
            img_url: img1,
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
            <div className={styles.inner_container}>
                <h1>{bannerArr[slideCnt].h1}</h1>
                <p
                    dangerouslySetInnerHTML={{ __html: bannerArr[slideCnt].p }}
                ></p>
                <div id={styles.slide_container}>
                    <div id={styles.slide_box}>
                        <div
                            className={styles.slide_circle}
                            onClick={() => setSlideCnt(0)}
                        ></div>
                        <div
                            className={styles.slide_circle}
                            onClick={() => setSlideCnt(1)}
                        ></div>
                        <div
                            className={styles.slide_circle}
                            onClick={() => setSlideCnt(2)}
                        ></div>
                        <button id={styles.slide_btn}></button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopBanner;
