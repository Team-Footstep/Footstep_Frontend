import React from 'react';
import styles from "../SideBar/SideBar.module.css";
import Button from "../Button/Button.js";
import SubToggle from '../SubToggle/SubToggle';

function SideBar ({img, name, job, footprint, display, login}) {
  return (
  <div className={`${styles.side_bar} ${display ? styles.blind : null}`}>
    <div className={`${styles.profile} ${login ? null : styles.blind}`}>
      <img src={img} className={styles.img}></img>
      <h3 className={styles.name}>{name}</h3>
      <h4 className={styles.job}>{job}</h4>
      <div className={styles.footprint}>
        <p>footprint</p>
        <div className={styles.footprintNum}>{(footprint >= 1000) ? `${Math.floor(footprint/1000)}K` : footprint}</div>
      </div>
      <div className={styles.menu}>
        <SubToggle 
          title={"Portfolio"}
        />
        <SubToggle 
          title={"My Footstep"}
        />
        <SubToggle 
          title={"My Follow"}
        />
      </div>
    </div>
    <div className={`${styles.start_footstep} ${login ? styles.blind : null}`}>
      <img src={null} className={styles.img}></img>
      <div className={styles.slogan}>
      풋스텝의 슬로건이 들어갈 자리입니다. <br/>
      짧게, 두줄로 만들어 주세요
      </div>
      <a className={styles.start_button}>시작하기</a>
      <div className={styles.menu}>
        <SubToggle 
          title={"Portfolio"}
        />
        <SubToggle 
          title={"My Footstep"}
        />
        <SubToggle 
          title={"My Follow"}
        />
      </div>
    </div>
    <div className={login ? null : styles.blind}>
      <Button value={`설정`} onClick={null}/>
      <Button value={`로그아웃`} onClick={null}/>
    </div>
  </div>
  );
};

export default SideBar;