import { useEffect, useState } from "react";
import React from 'react';
import styles from "../Preview.module.css";

function Preview(preview_title, preview_content){
    // const previewArr=[
    //     {
    //         h2: "Preview",
    //         p: '해당 페이지가 어떤 내용을 담고 있는지 작성하는 preview 글입니다. <br />한 줄 또는 두 줄로 간단하게 작성해주세요.',
    //     },
    // ];

    return(
            <div className ={styles.preview}>
                <h2 className ={styles.previw_title}>
                    {preview_title ="preview"}    
                </h2>
                <p className ={styles.preview_content}>
                    {preview_content = "해당 페이지가 어떤 내용을 담고 있는지 작성하는 preview 글입니다. <br />한 줄 또는 두 줄로 간단하게 작성해주세요."}
                </p>
            </div>
        );
}
export default Preview;