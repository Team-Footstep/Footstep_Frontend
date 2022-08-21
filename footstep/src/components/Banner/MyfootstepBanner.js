import { useEffect, useState } from "react";
import styles from "./MyfootstepBanner.module.css";
import img1 from "../../img/MyfootstepBanner.svg";
import img2 from "../../img/body-banner.svg";

function MyfootstepBanner() {
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
           
            p: '111내 풋스텝 페이지를 사용하는 방법을 적은 배너입니다.'
        },
        {
            img_url: img2,

            p: `222내 풋스텝 페이지를 사용하는 방법을 적은 배너입니다.`
        },
        {
            img_url: img1,

            p: `333내 풋스텝 페이지를 사용하는 방법을 적은 배너입니다.`
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

export default MyfootstepBanner;
