import React, { useEffect, useState } from "react";
import styles from "../SideBar/SideBar.module.css";
import Button from "../Button/Button.js";
import SubToggle from "../SubToggle/SubToggle";

function SideBar({ profile, display, login }) {
  const [printList, setPrintList] = useState([]);
  const [stampList, setStampList] = useState([]);

  const getBookmark = async () => {
    const json = await (await fetch(`/bookmarks/${profile.userId}`)).json();
    // console.log(json);

    for (let result of json.result) {
      if (result.stampOrPrint === "P") {
        setPrintList((current) => [result, ...current]);
      } else if (result.stampOrPrint === "S") {
        setStampList((current) => [result, ...current]);
      }
    }
  };

  useEffect(() => {
    if (profile.userId > 0) {
      getBookmark();
    }
  }, [profile]);

  return (
    <div className={`${display ? styles.blind : null}`}>
      <div className={styles.side_bar}>
        <div className={`${styles.profile} ${login ? null : styles.blind}`}>
          <img src={profile.img} className={styles.img}></img>
          <h3 className={styles.name}>{profile.name}</h3>
          <h4 className={styles.job}>{profile.job}</h4>
          <div className={styles.footprint}>
            <p>footprint</p>
            <div className={styles.footprintNum}>
              {profile.footprint >= 1000
                ? `${Math.floor(profile.footprint / 1000)}K`
                : profile.footprint}
            </div>
          </div>
          <div className={styles.menu}>
            {/* <SubToggle
              type={0}
              topPageId={profile.topPageId}
              userId={profile.userId}
              bookmark={[]}
            /> */}
            <p>Portfolio</p>
            <SubToggle
              type={1}
              topPageId={profile.topPageId}
              userId={profile.userId}
              bookmark={printList}
            />
            <SubToggle
              type={2}
              topPageId={profile.topPageId}
              userId={profile.userId}
              bookmark={stampList}
            />
          </div>
        </div>
        <div
          className={`${styles.start_footstep} ${login ? styles.blind : null}`}
        >
          <img src={null} className={styles.img}></img>
          <div className={styles.slogan}>
            풋스텝의 슬로건이 들어갈 자리입니다. <br />
            짧게, 두줄로 만들어 주세요
          </div>
          <a className={styles.start_button} href="/login">
            시작하기
          </a>
          <div className={styles.menu}>
            <p>Portfolio</p>
            <p>My Footstep</p>
            <p>My Follow</p>
          </div>
        </div>
        <div className={login ? null : styles.blind}>
          <Button value={`설정`} onClick={null} />
          <Button value={`로그아웃`} onClick={null} />
        </div>
      </div>
      <div className={`${styles.block} ${display ? styles.blind : null}`}></div>
    </div>
  );
}

export default SideBar;
