import React from "react";
import styles from "./TextEditor.module.css";
import { useState, useEffect, useRef } from "react";
import NewTextTemplate from "../TextEditor/NewTextTemplate";
import { useParams } from "react-router-dom";
import moment from 'moment';
import 'moment/locale/ko';

function TextEditor ({blockData, commentData, propDataFunction, userId, editorType, profileData, loading}) {
  const [nowTime, setNowTime] = useState(moment().format('YYYY-MM-DD HH:mm'));
  // let [localTextArray, setLocalTextArray] = useState(blockData);
  const [localCommentArray, setLocalCommentArray] = useState(commentData);
  const [liveTextArray, setLiveTextArray] = useState([]);
  const [deadTextArray, setDeadTextArray] = useState([]);
  const [focus, setFocus] = useState(0);
  // const [edited, setEdited] = useState(0);
  const COMMENT_ID = "commentId";
  const BLOCK_ID = "blockId";
  const PAGE_ID = useParams().pageId;

  // useEffect(()=> {
  //   setLocalCommentArray([...commentData]);
  // }, [commentData]);

  // const getNewComments = async (pageId, blockId) => {
  //   await fetch(`/comment/${pageId}/${blockId}`)
  //     .then((response) => response.json())
  //     .then((data) => (data.result.length === 0) ? setLocalCommentArray([...localCommentArray]) : setLocalCommentArray([...localCommentArray, data.result[0]]))
  //     .catch((error) => console.log(error));
  // };

  // const getCommentArray = (blockArray, pageId) => {
  //   blockArray.map(list => {
  //     getNewComments(pageId, list.blockId);
  //   })
  // };

  // useEffect(()=>{
  //   getCommentArray(blockData, PAGE_ID);
  //   console.log("data loaded:", localCommentArray);
  // }, [loading]);

  useEffect(()=> {
    setLiveTextArray([...blockData]);
    setLocalCommentArray([...commentData]);
  }, [blockData]);

  //delete & edited & added 처리
  const propBlockFunction = (referenceArray, editedArray, newSignal, deleteSignal, updateText, caretPosition) => {
    console.log("from TextEditor", referenceArray, editedArray, newSignal, deleteSignal, updateText, caretPosition);
    //수정 가능한 array로 복사
    const findIndex = (newSignal || deleteSignal) ? liveTextArray.filter(list => list[BLOCK_ID] === referenceArray[BLOCK_ID]) : liveTextArray.filter(list => list[BLOCK_ID] === editedArray[BLOCK_ID]);
    const key = (newSignal || deleteSignal) ? parseInt(getKeyByValueId(liveTextArray, findIndex[0], BLOCK_ID)) : null;
    //수정되었거나 새로 생긴 array 이전에 작성된 array의 값을 확인
    if (!newSignal && !deleteSignal){
      setLiveTextArray(liveTextArray.map(
        prevObj => prevObj[BLOCK_ID] === editedArray[BLOCK_ID] ? {...prevObj, content : editedArray.content } : prevObj
        ));
      } else if (newSignal && !deleteSignal) {
      let copyTextArray = [...liveTextArray];
      copyTextArray[key].content =  referenceArray.content;
      copyTextArray.splice(key+1, 0, editedArray);
      setLiveTextArray(copyTextArray);
      setFocus(key+1);
    } else if (deleteSignal && !newSignal){
      let copyTextArray = [...liveTextArray];
      console.log("deleted key", key);
      console.log(copyTextArray[key], referenceArray, editedArray);
      const beforeContent = copyTextArray[key-1].content;
      copyTextArray[key] = {...copyTextArray[key], status : 0};
      copyTextArray[key-1] = {...copyTextArray[key-1], content: beforeContent + updateText};
      setDeadTextArray(deadTextArray.concat(referenceArray));
      setLiveTextArray(copyTextArray.filter(list => list.status !== 0));
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
          commentArray={localCommentArray.filter(comment => {return comment[BLOCK_ID] === list[BLOCK_ID]})}
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
          profileData={profileData}
        />
        ))}
      </div>
    </div>
  )
}

export default TextEditor;