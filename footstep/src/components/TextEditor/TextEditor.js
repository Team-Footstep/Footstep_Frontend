import React from "react";
import styles from "./TextEditor.module.css";
import { useState, useEffect, useRef } from "react";
import NewTextTemplate from "../TextEditor/NewTextTemplate";
import moment from 'moment';
import 'moment/locale/ko';

function TextEditor ({blockData, commentData, propDataFunction, userId, pageId, editorType}) {
  console.log("blockData from texteditor: ", blockData);
  const [nowTime, setNowTime] = useState(moment().format('YYYY-MM-DD HH:mm'));
  // let [localTextArray, setLocalTextArray] = useState(blockData);
  const [localCommentArray, setLocalCommentArray] = useState(commentData);
  const [liveTextArray, setLiveTextArray] = useState([]);
  const [deadTextArray, setDeadTextArray] = useState([]);
  const [focus, setFocus] = useState(0);
  // const [edited, setEdited] = useState(0);
  const COMMENT_ID = "comment_id";
  const BLOCK_ID = "blockId";


  useEffect(()=> {
    setLiveTextArray([...blockData]);
  }, [blockData]);

  //delete & edited & added 처리
  const propBlockFunction = (originalArray, editedArray, newSignal, deleteSignal, updateText, caretPosition) => {
    console.log("from TextEditor", originalArray, editedArray, newSignal, deleteSignal, updateText, caretPosition);
    let copyTextArray = [...liveTextArray];
    //수정 가능한 array로 복사
    const findIndex = (newSignal || deleteSignal) ? liveTextArray.filter(list => list[BLOCK_ID] === originalArray[BLOCK_ID]) : liveTextArray.filter(list => list[BLOCK_ID] === editedArray[BLOCK_ID]);
    const key = (newSignal || deleteSignal) ? parseInt(getKeyByValueId(liveTextArray, findIndex[0], BLOCK_ID)) : null;
    //수정되었거나 새로 생긴 array 이전에 작성된 array의 값을 확인
    if (!newSignal && !deleteSignal){
      setLiveTextArray(liveTextArray.map(
        prevObj => prevObj[BLOCK_ID] === editedArray[BLOCK_ID] ? {...prevObj, content : editedArray.content } : prevObj
        ));
    } else if (newSignal && !deleteSignal) {
      console.log("new line key:", key, copyTextArray[key]);
      copyTextArray[key].content =  originalArray.content;
      console.log("new copyTextArray", copyTextArray[key+1]);//오류가 존재하는 듯
      copyTextArray.splice(key+1, 0, editedArray);
      setLiveTextArray(copyTextArray);
      setFocus(key+1);
    } else if (deleteSignal && !newSignal){
      // const liveArray = copyTextArray.filter(list => {return (list["status"] !== "0" && list !== undefined);});
      // let focDeleteKey = copyTextArray.map(row => row[BLOCK_ID]).indexOf(originalArray[BLOCK_ID]);
      copyTextArray[key] = {...copyTextArray[key], status : `0`};
      setDeadTextArray(deadTextArray.concat(originalArray));
      setLiveTextArray(copyTextArray.filter(list => list.status !== "0"));
      // setFocus(parseInt(getKeyByValueId(localTextArray, copyTextArray[focDeleteKey-1], BLOCK_ID)));
      setFocus(key-1);
    };
  };

  const propCommentFunction = (comments, deletedComment) => {
    if (comments !== null && deletedComment === null) {
      const localCommentArrayKey = localCommentArray.map(element => element[COMMENT_ID]);
      const commentsKey = comments.map(element => element[COMMENT_ID]);
      const commonKeyArray = localCommentArrayKey.filter(element => commentsKey.includes(element) ? element : null);
      const newKeyArray = commentsKey.filter(element => !localCommentArrayKey.includes(element) ? element : null);
      const addedArray = comments.filter(obj => newKeyArray.includes(obj[COMMENT_ID]) ? obj : null);
      let newArray = localCommentArray.map(obj => {
        if (commonKeyArray.includes(obj[COMMENT_ID])) {
          return comments.filter(element => element[COMMENT_ID] === obj[COMMENT_ID])[0];
        } else {
          return obj;
        };
      });
      const setArray = new Set(newArray.concat(addedArray));
      const finalArray = [...setArray];
      setLocalCommentArray(finalArray);
    } else if (deletedComment !== null) {
      setLocalCommentArray(localCommentArray.filter(element => element[COMMENT_ID] !== deletedComment[COMMENT_ID]));
    };
  };
  //Todo: delete한 line의 index가 0일 때를 고려한 코딩

  function getKeyByValueId(array, value, thisId) {
    return Object.keys(array).find(key => array[key][thisId] === value[thisId]);
  };

  const handleFocus = (event) => {
    if (event.code === "ArrowUp") {
      setFocus((focus > 0) ? focus-1 : focus);
    } else if (event.code === "ArrowDown") {
      setFocus((focus < liveTextArray.length) ? focus+1 : focus);
    };
  };
  
  const hi = () => {
    // console.log(localTextArray);
    // console.log("caret:", document.getSelection());
    console.log("localCommentArray", localCommentArray);
    console.log("liveTextArray", liveTextArray);
    console.log("focus", focus);
  };
  // useRelativeTime("2022-08-18 10:10");

  useEffect(() => {
    propDataFunction(liveTextArray, deadTextArray, localCommentArray);
    setNowTime(moment().format('YYYY-MM-DD HH:mm'));
  }, [localCommentArray, liveTextArray, deadTextArray, focus]);



  return (
    <div className={styles.texteditor_list} onKeyDown={handleFocus}>
      <div>
        {liveTextArray && liveTextArray.map(list => (
          <NewTextTemplate
          key={list[BLOCK_ID]}
          blockObj={list}
          commentArray={localCommentArray.filter(comment => {return comment["blockId"] === list[BLOCK_ID]})}
          blockId={list[BLOCK_ID]}
          type={editorType}
          propBlockFunction={propBlockFunction}
          propCommentFunction={propCommentFunction}
          status={list.status}
          focus={
            (Object.keys(liveTextArray).find(key => liveTextArray[key] === list) === `${focus}`) ? true : false
          }//ToDo: liveTextArray의 값만 받아서 focus할 수 있도록 수정할 필요
          userId={userId}
          nowTime={nowTime}
        />
        ))}
      </div>
      <button onClick={hi}>console.log(localTextArray)</button>
    </div>
  )
}

export default TextEditor;