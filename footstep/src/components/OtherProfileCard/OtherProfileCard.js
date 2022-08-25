import React, { useEffect, useState } from "react";
import styles from "./OtherProfileCard.module.css";



function OtherProfileCard({ content }) {
    // const footContent={
    //     footprintcnt: content.footprintcnt,
    // };
    // const[addPerson, setAddPerson]=useState(false);
    // const plus_btn= ()=>{
    //     setAddPerson((prev)=> !prev);
    //}

    // const Contents={
    //     userImgUrl: "https://placeimg.com/640/480/animals",
    //     userName : '문비',
    //     job:'프론드엔드',
    //     profileFootprint: "2000",
    //     introduction: `글의 내용이 들어갈 자리입니다. 이 내용은 대충 7줄 정도?`,
    // }
    console.log(content);


    return (
        <div className={styles.profile_card}>
            <img src={content.userImgUrl} className={styles.image}></img>
            <div className={styles.content}>

                <h3 className={styles.username}>{content.userName}
                    <span className={styles.Foot_print}>Foot print</span>
                    <span className={styles.footprintNum}>{content.footprintNum}</span>
                </h3>
                {/* <img src={plus} alt='' className={styles.plus}></img> */}
                <button className={styles.plus_btn}>
                </button>

                <p className={styles.job}>{content.job}</p>
                <div className={styles.line_4}></div>
                <p
                    className={styles.introduction}
                    dangerouslySetInnerHTML={{ __html: content.introduction }}>
                </p>
            </div>


        </div>
    );

}
export default OtherProfileCard;