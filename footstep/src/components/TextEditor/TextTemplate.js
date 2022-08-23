import React from "react";
import styles from "./TextTemplate.module.css";
import { useState, useRef, useEffect, useCallback } from "react";
import {Link} from "react-router-dom";
import ContentEditable from "react-contenteditable";


function TextTemplate ({blockArray, commentArray, blockId, type, propFunction, edit, status}) {
  // const textArray = blockArray["result"]; => 이미 번역되어 들어옴
  const targetTextArray = blockArray.filter((id) => id.block_id == blockId);
  //입력받은 id에 해당하는 Array 필터
  const CHILD_ID = targetTextArray[0]["childPageId"];
  //하위 페이지 데이터 입력받음
  const newChildId = Date.now();
  //새로운 childId 부여
  const textContent = targetTextArray[0]["content"];
  //content 키 영역의 text만 추출

  //onFocus => div to input 기능 관련 함수
  const inputRef = useRef(null);

  const [editable, setEditable] = useState(edit);
  const editOn = () => {
    setEditable(true);
  };

  const [newtext, setNewtext] = useState(textContent);

  const ref = useRef(null);
  function handleClickOutside (e) {
    if (editable == true && !(ref.current.contains(e.target)) && (ref.current !== null)) {
      setEditable(false);
    };
  };
  useEffect(() => {
    window.addEventListener("click", handleClickOutside, true);
  });
  //외부 클릭 시 editable을 false 값으로 지정
  const handleClickInside = () => {
    editOn();
  };
    
  useEffect(() => {
    if (inputRef.current !== null) {inputRef.current.focus({
      cursor:'end'
    })};
  }, [editable]);

  const handleChange = (e) => {
    const text = e.target.value.replace(/(\r\n|\n|\r)/gm, "");
    setNewtext(text);
    propFunction({
      ...targetTextArray[0],
      block_id: `${blockId}`, 
      content: text, 
      childPageId: CHILD_ID
    }, {}, false);
  };
  //입력한 텍스트를 바꿔치기 해줌

  const handleKey = (e) => {
    if (e.key === "Enter") {
      setEditable(!editable);
      propFunction({
        block_id: `${Date.now()}`, 
        content: ``,
        childPageId: `null`,
        originalId: `null`,
        followeeId:`null`,
        status: `1`,
        stampCount: `0`,
        footprintCount: `0`
      }, 
      {
        ...targetTextArray[0],
        block_id: `${blockId}`, 
        content: e.target.value, 
        childPageId: CHILD_ID
      }, false);
    } else if ((e.key === "Delete" || e.key === "Backspace") && (e.target.value === "")) {
      propFunction(targetTextArray[0],{}, true);
    };
  };
  //엔터키 누르면 input => div
  //backspce 키 누르면 해당 block 숨김
  
  const [detailDisplay, setDetailDisplay] = useState(false);
  const detailDisplayHandler = (event) => {
    event.preventDefault();
    setDetailDisplay((prev) => !prev);
  };
  //작성/자세히 등 모달 표시 여부 

  const [textHeight, setTextHeight] = useState(32);
  useEffect(() => {
    if (inputRef === null || inputRef.current === null){
      return;
    };
    setTextHeight(inputRef.current.scrollHeight);
    inputRef.current.style.height = `${textHeight}px`;
  }, [editable]);
  //textarea height 값 자동화

  function nFormatter(num) {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num;
  };
  //숫자 표시 G, M, K
  
  return (
    <>
      <div ref={ref} className={`${styles.text_template} ${(status === "1") ? null : styles.blind}`} onClick={handleClickInside}>
        {editable ? (
          <textarea ref={inputRef} className={styles.textarea} type="text" spellCheck="false" value={newtext} onChange={(e) => handleChange(e)} onKeyUp={handleKey} placeholder={(newtext === ``) ? "내용을 입력하세요..." : null}/>
        ) : (
          <div>
            <div className={styles.textbox}>
              <div className={`${styles.history} ${(targetTextArray[0]["originalId"] !== "null" || targetTextArray[0]["followeeId"] !== "null") ? null : styles.blind}`}>
                <span className={styles.original_img}>
                  <img className={styles.original} src=""></img>
                </span>
                <span className={styles.newer_img}>
                  <img className={styles.newer} src=""></img>
                </span>
              </div>
              <div className={styles.contentbox}>
                <span onContextMenu={detailDisplayHandler} className={`${styles.handling_icon} ${styles.icon}`}></span>
                <div onClick={handleClickInside} className={`${styles.default_text} ${CHILD_ID != "null" ? styles.blind : null}`}>{newtext}</div>
                <div onClick={handleClickInside} className={`${styles.default_text} ${CHILD_ID != "null" ? styles.parent_page : styles.blind}`}>{newtext}</div>
              </div>
              <div className={`${styles.interaction_info} ${(targetTextArray[0]["stampCount"]==="0" && targetTextArray[0]["footprintCount"] === "0") ? styles.blind : null}`}>
                <button className={`${styles.info_icon} ${styles.icon}`}></button>
                <div className={`${styles.info_modal}`}>
                  <div className={styles.follow}>{`${nFormatter(targetTextArray[0]["stampCount"])} stamps`}</div>
                  <div className={styles.following}>{`${nFormatter(targetTextArray[0]["footprintCount"])} footprints`}</div>
                </div>
              </div>
            </div>
            <div className={`${styles.innerpage_modal} ${detailDisplay ? null : styles.blind}`}>
              <div className={`${styles.subpage_btn} ${((CHILD_ID === "null") && ((type === "myfootstep") || (type === "myfollow"))) ? null : styles.blind}`}>
                <span className={`${styles.add_icon} ${styles.icon}`}></span>
                <Link to={`/subpage/${newChildId}`} className={`${styles.add} ${styles.icon_text}`}>작성</Link>
              </div>
              <div className={`${styles.subpage_btn} ${CHILD_ID != "null" ? null : styles.blind}`}>
                <span className={`${styles.detail_icon} ${styles.icon}`}></span>
                <Link to={`/subpage/${CHILD_ID}`} className={`${styles.detail} ${styles.icon_text}`}>자세히</Link>
              </div>
              <div className={styles.bar}></div>
              <div className={`${styles.subpage_btn}`}>
                <span className={`${styles.comment_icon} ${styles.icon}`}></span>
                <div className={`${styles.comment} ${styles.icon_text}`}>댓글</div>
              </div>
              <div className={`${styles.bar} ${((CHILD_ID != "null")&&(type === "otherfootstep")&&(type === "myfollow")) ? null : styles.blind}`}></div>
              <div className={`${styles.subpage_btn} ${((CHILD_ID != "null") && (type === "myfollow")) ? null : styles.blind}`}>
                <span className={`${styles.finish_icon} ${styles.icon}`}></span>
                <div className={`${styles.finish} ${styles.icon_text}`}>종료</div>
              </div>
              <div className={`${styles.subpage_btn} ${(type === "otherfootstep") ? null : styles.blind}`}>
                <span className={`${styles.stamp_icon} ${styles.icon}`}></span>
                <div className={`${styles.stamp} ${styles.icon_text}`}>스탬프</div>
              </div>
            </div>
          </div>  
        )}
      </div>
      
    </>
  );
};

export default TextTemplate;