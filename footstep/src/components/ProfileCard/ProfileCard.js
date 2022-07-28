// import { render } from '@testing-library/react';
import React from "react";
import styles from "./ProfileCard.module.css";
import new_icon from "../../icons/new_icon.svg";

function ProfileCard({ image, username, job, introduction, date, k }) {
    return (
        <div className={styles.profile_card}>
            <img src={image} className={styles.image}></img>
            <div className={styles.content}>
                <h2 className={styles.username}>{username}</h2>
                <p className={styles.job}>{job}</p>
                <p
                    className={styles.introduction}
                    dangerouslySetInnerHTML={{ __html: introduction }}
                ></p>
                <div className={styles.date_box}>
                    <img src={new_icon} alt="" />
                    <span className={styles.date}>{date}</span>
                </div>
                <div className={styles.line_4}></div>
                <div className={styles.foot_box}>
                    <span className={styles.Foot_print}>Foot print</span>
                    <span className={styles.k}>{k}</span>
                </div>
            </div>
        </div>
    );
}

export default ProfileCard;
