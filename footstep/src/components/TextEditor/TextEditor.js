import React from "react";
import styles from "./TextEditor.module.css";
import { useState, useEffect, useRef } from "react";
import NewTextTemplate from "../TextEditor/NewTextTemplate";
import moment from 'moment';
import 'moment/locale/ko';

function TextEditor ({blockData, commentData, propDataFunction, userId, editorType}) {
  const [nowTime, setNowTime] = useState(moment().format('YYYY-MM-DD HH:mm'));
  let [localTextArray, setLocalTextArray] = useState(blockData);
  const [localCommentArray, setLocalCommentArray] = useState(commentData);
  const [liveTextArray, setLiveTextArray] = useState(localTextArray);
  const [deadTextArray, setDeadTextArray] = useState([]);
  const [focus, setFocus] = useState(0);
  const [edited, setEdited] = useState(0);
  const COMMENT_ID = "comment_id";
  const BLOCK_ID = "blockId";
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

  // useEffect(() => {
  //   setLiveTextArray(localTextArray.filter(list => {return (list["status"] !== "0" && list !== undefined)}));
  //   setDeadTextArray(localTextArray.filter(list => {return (list["status"] === "0" && list !== undefined)}));
  // }, [localTextArray, focus, edited]);

  const propBlockFunction = (originalArray, editedArray, newSignal, deleteSignal, updateText, caretPosition) => {
    console.log("from TextEditor", originalArray, editedArray, newSignal, deleteSignal, updateText, caretPosition);
    let copyTextArray = [...liveTextArray];
    //수정 가능한 array로 복사
    const findIndex = (newSignal || deleteSignal) ? liveTextArray.filter(list => list[BLOCK_ID] === originalArray[BLOCK_ID]) : liveTextArray.filter(list => list[BLOCK_ID] === editedArray[BLOCK_ID]);
    const key = parseInt(getKeyByValueId(liveTextArray, findIndex[0], BLOCK_ID));
    //수정되었거나 새로 생긴 array 이전에 작성된 array의 값을 확인
    console.log("key", key, "findIndex", findIndex);
    if (!newSignal && !deleteSignal){
      setLiveTextArray(liveTextArray.map(
        prevObj => prevObj[BLOCK_ID] === editedArray[BLOCK_ID] ? {...prevObj, content : editedArray.content } : prevObj
        ));
      setEdited(prev => !prev);
    } else if (newSignal && !deleteSignal) {
      copyTextArray[key].content =  originalArray.content;
      copyTextArray.splice(key+1, 0, editedArray);
      setLiveTextArray(copyTextArray);
      setFocus(key+1);
      setEdited(prev => !prev);
    } else if (deleteSignal && !newSignal){
      // const liveArray = copyTextArray.filter(list => {return (list["status"] !== "0" && list !== undefined);});
      // let focDeleteKey = copyTextArray.map(row => row[BLOCK_ID]).indexOf(originalArray[BLOCK_ID]);
      copyTextArray[key] = {...copyTextArray[key], status : `0`};
      setDeadTextArray(deadTextArray.concat(originalArray));
      setLiveTextArray(copyTextArray.filter(list => list.status !== "0"));
      // setFocus(parseInt(getKeyByValueId(localTextArray, copyTextArray[focDeleteKey-1], BLOCK_ID)));
      setFocus(key-1);
      setEdited(prev => !prev);
    };
    //=========================
    // let copyTextArray = [...localTextArray];
    // //수정 가능한 array로 복사
    // const findIndex = liveTextArray.filter((id) => id[BLOCK_ID] === originalArray[BLOCK_ID]);
    // const key = parseInt(getKeyByValueId(liveTextArray, findIndex[0], BLOCK_ID));
    // //수정되었거나 새로 생긴 array 이전에 작성된 array의 값을 확인
    // if (!newSignal && !deleteSignal){
    //   setLocalTextArray(localTextArray.map(
    //     prevObj => prevObj[BLOCK_ID] === editedArray[BLOCK_ID] ? {...prevObj, content : editedArray.content } : prevObj
    //     ));
    // } else if (newSignal && !deleteSignal) {
    //   copyTextArray[key] = {...copyTextArray[key], content : localTextArray[key]["content"].slice(0, caretPosition)};
    //   // console.log(copyTextArray[key]);
    //   copyTextArray.splice(key+1, 0, editedArray);
    //   setLocalTextArray(copyTextArray);
    //   setFocus(key+1);
    // } else if (deleteSignal && !newSignal){
    //   const liveArray = copyTextArray.filter(list => {return (list["status"] !== "0" && list !== undefined);});
    //   let focDeleteKey = liveArray.map(row => row[BLOCK_ID]).indexOf(originalArray[BLOCK_ID]);
    //   copyTextArray[key] = {...copyTextArray[key], status : `0`};
    //   setLocalTextArray(copyTextArray);
    //   setFocus(parseInt(getKeyByValueId(localTextArray, liveArray[focDeleteKey-1], BLOCK_ID)));
    // };
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

  // const onSubmitHandler = (event) => {
  //   event.preventDefault();
  //   setLocalTextArray([...localTextArray, {
  //     blockId: `${Date.now()}`,
  //     content: event.target[0].value,
  //     childPageId: "null",
  //     originalFolloweeId : {
  //       originalId: `null`,
  //       followeeId:`null`,
  //     },
  //     status: `1`,
  //     new: `1`,
  //     stampNum: `0`,
  //     footprintNum: `0`
  //     }]);
  //     // propDataFunction(localTextArray, localCommentArray);
  //   event.target[0].value = "";
  // };

  function getKeyByValueId(array, value, id) {
    return Object.keys(array).find(key => array[key][id] === value[id]);
  };
  // function getKeyByValueId(array, value, id) {
  //   const idArray = array.map(list => list[id]);
  //   const idIndex = idArray.indexOf(value[id]);
  //   console.log(array, value, id, );
  //   return idIndex;
  // };

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
          blockArray={liveTextArray}
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
      {/* <form onSubmit={onSubmitHandler}>
        <input className={styles.input} placeholder="내용을 입력하세요..."/>
      </form> */}
      <button onClick={hi}>console.log(localTextArray)</button>
    </div>
  )
}

export default TextEditor;