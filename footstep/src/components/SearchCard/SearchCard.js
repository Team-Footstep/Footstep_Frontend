//import { render } from '@testing-library/react';
import React from "react";
import styles from "./SearchCard.module.css";
import footprint from "../../icons/footprint.svg";

// hoverEvent = (e)=>{
//     e.target.styles.background = "#E7EAEE";
// }

function SearchCard({ content }) {
    return (
        <div className={styles.searchcard_frame}>
            <div className={styles.search_card}>
                <img
                    className={styles.searchcard_profile_img}
                    src={content.img_url}
                ></img>

                <div className={styles.contentBox}>
                    <h2 className={styles.searchcard_text_title}>
                        {content.title}
                    </h2>
                    {/* <div className={styles.filter_box}> */}
                    <div className={styles.profile_box}>
                        <span className={styles.searchcard_name}>
                            {content.name}
                        </span>
                        <span className={styles.searchcard_job}>
                            {content.job}
                        </span>
                    </div>
                    {/* </div> */}
                    <h2
                        className={styles.searchcard_contents}
                        dangerouslySetInnerHTML={{ __html: content.content }}
                    ></h2>
                    <div className={styles.footerBox}>
                        <h2 className={styles.searchcard_date}>
                            {content.date}
                        </h2>
                        <div className={styles.footBox}>
                            <img
                                className={styles.searchcard_foot_img}
                                src={footprint}
                                alt={footprint}
                            ></img>
                            <h2 className={styles.searchcard_num}>
                                {content.foot_cnt}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchCard;
