import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import styles from "../TextEditor/NewTextTemplate.module.css";
import ContentEditable from 'react-contenteditable';
import useNumberFormatter from "../../Hooks/useNumberFormatter.js";
import usefocusContentEditableTextToEnd from "../../Hooks/usefocusContentEditableTextToEnd.js";
import useClick from '../../Hooks/useClick.js';
import CommentModal from '../CommentModal/CommentModal.js';

function NewTextTemplate ({blockArray, commentArray, blockId, type, propBlockFunction, propCommentFunction, status, focus, userId, nowTime}) {
  const BLOCK_ID = "blockId";
  const COMMENT_ID = "comment_id";
  // const textArray = blockArray["result"]; => 이미 번역되어 들어옴
  const targetTextArray = blockArray.filter((id) => id[BLOCK_ID] == blockId);
  //입력받은 id에 해당하는 Array 필터
  const [comments, setComments] = useState(commentArray);

  const CHILD_ID = targetTextArray[0]["childPageId"];
  //하위 페이지 데이터 입력받음
  const newChildId = Date.now();
  //새로운 childId 부여
  const textContent = targetTextArray[0]["content"];
  //content 키 영역의 text만 추출
  const [newtext, setNewtext] = useState(textContent);

  const NEWLINE_OBJECT = {
    blockId: `${Date.now()}`, 
    content: ``,
    childPageId: `null`,
    originalFolloweeId : {
      originalId: `null`,
      followeeId:`null`,
    },
    status: `1`,
    new: `1`,
    stampNum: `0`,
    footprintNum: `0`
  };

  const editModalRef = useRef(null);
  const inputRef = useRef(null);
  useEffect(() => {
    if (focus) {
      usefocusContentEditableTextToEnd(inputRef.current);
    };
  }, [focus]);

  const [editModal, setEditModal] = useState(false);
  // const handleCaret = (e) => {
  //   const reRange = {start:(document.getSelection().extentOffset - document.getSelection().baseOffset >= 0) ? document.getSelection().baseOffset : document.getSelection().extentOffset, end: (document.getSelection().extentOffset - document.getSelection().baseOffset >= 0) ? document.getSelection().extentOffset : document.getSelection().baseOffset};
  //   const originalText = document.getSelection().baseNode.textContent;
  //   const output = [originalText.slice(0,reRange.start), "cut position:start", originalText.substring(reRange.start, reRange.end), "cut position:end", originalText.slice(reRange.end)].join('');
  //   if (document.getSelection().type === "Range") {
  //     setEditModal(true);
  //   } else if (document.getSelection().type === "Caret") {
  //     setEditModal(false);
  //   }
  //   console.log(inputRef.current === e.target)
  //   console.log(document.getSelection().anchorNode.parentElement)
  //   console.log(document.getSelection().anchorNode.parentElement === e.target)
  //   // console.log(x, y);
  // };
  const handleOutsideClickevent = () => {
    setEditModal(false);
  };

  const handleInsideClickEvent = () => {
    if (document.getSelection().anchorNode.parentElement === inputRef.current && document.getSelection().type === "Range") {
      setEditModal(true);
    } else if (document.getSelection().type === "Caret" || document.getSelection().anchorNode.parentElement !== inputRef.current) {
      setEditModal(false);
    }
  };

  useClick(inputRef, handleOutsideClickevent, handleInsideClickEvent);
  // const [followText, setFollowText] = useState("");

  const handleKey = (e) => {
    const caretPosition = document.getSelection().anchorOffset;
    // console.log(e.target.innerText.slice(document.getSelection().extentOffset), caretPosition);
    // setFollowText(e.target.innerText.slice(document.getSelection().extentOffset));
    console.log("e.target.innerText", e.target.innerText, "followText", e.target.innerText.slice(document.getSelection().extentOffset), "caretPosition", caretPosition);
    if ((e.key === "Delete" || e.key === "Backspace") && (caretPosition === 0)) {
      // console.log({...targetTextArray[0], content: newtext});
      propBlockFunction({...targetTextArray[0], content: newtext}, {}, false, true, e.target.innerText.slice(document.getSelection().extentOffset), caretPosition);
    } else if (e.key === "Enter" && e.key !== "Shift") {
      propBlockFunction({
        ...targetTextArray[0],
        blockId: `${blockId}`,
        content: e.target.innerText.replace(/<div>|<\/div>|<br>|/gi, "").slice(0, caretPosition), 
        childPageId: CHILD_ID
        }, {...NEWLINE_OBJECT, content: e.target.innerText.slice(document.getSelection().extentOffset)}, true, false, null, caretPosition);
    } else {
      return;
    };
    };

  const handleChange = (e) => {
    const caretPosition = document.getSelection().anchorOffset;
    const text = e.target.value.replace(/<div>|<\/div>|<br>|/gi, "");
    // setFollowText(text.slice(document.getSelection().extentOffset));
    // console.log(followText, document.getSelection().extentOffset, e.target.value.search('<div><br></div>'));
    setNewtext(text);
    // console.log(e.nativeEvent.inputType);
    if (e.nativeEvent.inputType === "insertText" && e.nativeEvent.inputType !== "insertParagraph" || e.nativeEvent.inputType === "deleteContentBackward") {
      propBlockFunction({}, {
        ...targetTextArray[0],
        blockId: `${blockId}`,
        content: text,
        childPageId: CHILD_ID
      }, false, false, null, caretPosition);
    };
      //텍스트 입력 시에 onChange event listen & Enter키 입력시 onChange Event 무시
    // } else if (e.nativeEvent.inputType === "insertParagraph" || e.target.value.search('<div><br></div>') !== -1 ) {
    //   propBlockFunction({
    //     ...targetTextArray[0],
    //     blockId: `${blockId}`, 
    //     content: text, 
    //     childPageId: CHILD_ID
    //     }, {}, true, false, followText);
    //   // Enter 키 입력 시 기존 블럭 아이디와 함께 엔터키 입력 정보 전송
    // }
    // if (e.nativeEvent.inputType === "deleteContentBackward") {
    //   console.log(e.nativeEvent.inputType, followText, caretPosition);
    //   // propBlockFunction({...targetTextArray[0], content: newtext}, {}, false, true);
    // };
  };

  const [detailDisplay, setDetailDisplay] = useState(false);
  const detailDisplayHandler = (event) => {
    event.preventDefault();
    setDetailDisplay((prev) => !prev);
  };

  const [commentDisplay, setCommentDisplay] = useState(false);
  const handleCommentDisplay = (event) => {
    event.preventDefault();
    setCommentDisplay((prev) => !prev);
    setDetailDisplay(false);
  };

  const [deletedComment, setDeletedComment] = useState(null);
  const handleNewCommentArray = (commentObj, deletedObj) => {
    const commentIdArray = comments.map(list => list[COMMENT_ID]);
    if (commentObj !== null && deletedObj === null) {
      if (commentIdArray.find(element => element === commentObj[COMMENT_ID]) !== undefined) {
        setComments(comments.map((list) => list[COMMENT_ID] === commentObj[COMMENT_ID] ? {...list, content: commentObj.content} : list));
        setDeletedComment(null);
      } else {
        setComments(comments.concat(commentObj));
        setDeletedComment(null);
      };
    } else if (commentObj === null && deletedObj !== null) {
      setDeletedComment(deletedObj);
    };
  };
  //새 comment를 받아서 기존 comment 배열에 끼워 넣어 주는 함수

  const handleNewCommentSubmit = (event) => {
    event.preventDefault();
    setComments([...comments, {
      "comment_id": `${Date.now()}`,
      "blockId": `${blockId}`,
      "userId": `${userId}`,
      "userName": "홍길동",
      "content": event.target[0].value,
      "createdAt": nowTime
    }])
    event.target[0].value = "";
  };
  
  useEffect(() => {
    propCommentFunction(comments, deletedComment);
  }, [comments, deletedComment]);
  //댓글 변화 시 데이터 전송

  function relativeTime (timeInput) {
    const thisTime = {
      year : timeInput.substr(0, 4),
      month : timeInput.substr(5, 2),
      date : timeInput.substr(8, 2),
      hour : timeInput.substr(11, 2),
      minute : timeInput.substr(14, 2),
    };
    const nowDate = new Date(nowTime);
    const thisDate = new Date(timeInput);
    const elapsedMSec = nowDate.getTime() - thisDate.getTime();
    const elapsedMin = elapsedMSec / 1000 / 60;
    const elapsedHour = elapsedMSec / 1000 / 60 / 60;
    const elapsedDay = elapsedMSec / 1000 / 60 / 60 / 24;
    let timeOutput;
    if (elapsedDay > 365) {
      timeOutput = `${thisTime.year}년 ${thisTime.month}월`;
    } else if (elapsedDay > 5 && elapsedDay <=365) {
      timeOutput = `${thisTime.month}월 ${thisTime.date}일`;
    } else if (elapsedDay <= 5 && elapsedDay >= 1) {
      timeOutput =`${Math.floor(elapsedDay)}일 전`;
    } else if (elapsedHour >= 1 && elapsedHour <= 24){
      timeOutput =`${Math.floor(elapsedHour)}시간 전`;
    } else if (elapsedMin <= 60 && elapsedMin > 3) {
      timeOutput =`${Math.floor(elapsedMin)}분 전`;
    } else if (elapsedMin <= 3) {
      timeOutput ="방금 전";
    };
    return timeOutput;
  };

  return (
    <div className={`${styles.text_template} ${(status === "1") ? null : styles.blind}`}>
      <div className={styles.textbox}>
        <div className={`${styles.history} ${(targetTextArray[0]["originalFolloweeId"]["originalId"] !== "null" || targetTextArray[0]["originalFolloweeId"]["followeeId"] !== "null") ? null : styles.blind}`}>
          <span className={styles.original_img}>
            <img className={styles.original} src=""></img>
          </span>
          <span className={styles.newer_img}>
            <img className={styles.newer} src=""></img>
          </span>
        </div>
        <div className={styles.contentbox}>
          <span onContextMenu={detailDisplayHandler} className={`${styles.handling_icon} ${styles.icon}`}></span>
          <ContentEditable innerRef={inputRef} onChange={handleChange} onKeyDown={handleKey} disabled={false} className={`${styles.default_text} ${CHILD_ID != "null" ? styles.parent_page : null}`} html={newtext}/>
        </div>
        <div className={`${styles.interaction_info} ${(targetTextArray[0]["stampNum"]==="0" && targetTextArray[0]["footprintNum"] === "0") ? styles.blind : null}`}>
          <button className={`${styles.info_icon} ${styles.icon}`}></button>
          <div className={`${styles.info_modal}`}>
            <div className={styles.follow}>{`${useNumberFormatter(targetTextArray[0]["stampNum"])} stamps`}</div>
            <div className={styles.following}>{`${useNumberFormatter(targetTextArray[0]["footprintNum"])} footprints`}</div>
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
        <div className={`${styles.subpage_btn}`} onClick={handleCommentDisplay}>
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
      <div className={`${styles.edit_modal} ${editModal ? null : styles.blind}`} ref={editModalRef}>
        <div className={`${styles.bold_icon} ${styles.modal_icon}`}></div>
        <div className={styles.modal_bar}></div>
        <div className={`${styles.underline_icon} ${styles.modal_icon}`}></div>
        <div className={styles.modal_bar}></div>
        <div className={`${styles.textcolor_icon} ${styles.modal_icon}`}></div>
        <div className={styles.modal_bar}></div>
        <div className={`${styles.highlight_icon} ${styles.modal_icon}`}></div>
        <div className={styles.modal_bar}></div>
        <div className={`${styles.textresizing_icon} ${styles.modal_icon}`}></div>
      </div>
      <div className={`${styles.comment_modal} ${commentDisplay ? null : styles.blind}`}>
        {
          commentArray && commentArray.map(list => (
            <CommentModal
              key={list[COMMENT_ID]}
              commentObj={list}
              propfunction={handleNewCommentArray}
              edit={false}
              bar={list !== commentArray[commentArray.length - 1] ? true : false}
              editable={userId === list.userId ? true : false}
              imgURL={null}
              newComment={false}
              elapsedTime={relativeTime(list.createdAt)}
            />
          ))
        }
        <div className={`${styles.comment_modal_bar} ${commentArray.length !== 0 ? null : styles.blind}`}></div>
        <div className={styles.comment_form} onSubmit={handleNewCommentSubmit}>
          <form>
            <textarea className={styles.comment_input} type="text" placeholder={"댓글 달기"}></textarea>
            <button className={styles.comment_btn}></button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default NewTextTemplate;