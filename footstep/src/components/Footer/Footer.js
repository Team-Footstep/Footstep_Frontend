import styles from "./Footer.module.css";
import React from "react";
import logo from "../../icons/FooterLogo.svg";

function Footer() {
  return (
    <div className={styles.footer}>
      <img className={styles.icon} src={logo}></img>
      <div className={styles.text_box}>
        <div className={styles.main}>
          <a href="#">Main</a>
        </div>
        <div className={styles.about_us}>
          <a href="#">About US</a>
        </div>
        <div className={styles.search_footstep}>
          <a href="#">Search Footstep</a>
        </div>
        <div className={styles.my_footstep}>
          <a href="#">My Footsteps</a>
        </div>
        <div className={styles.portfolio}>
          <a href="#">PortFolio</a>
        </div>
      </div>
      <hr className={styles.line_3}></hr>
      <span className={styles.copyright_team_footstep_design_by_directed_by_jb}>
        Copyright Team Footstep | Design by 이다슬 | Directed by JB
      </span>
    </div>
  );
}

export default Footer;
