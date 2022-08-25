import styles from "../Search/Search.module.css";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import SideBar from "../../components/SideBar/SideBar";
import SearchBar from "../../components/SearchBar/SearchBar";
import SearchText from "../../components/SearchResult/SearchText";
import SearchProfile from "../../components/SearchResult/SearchProfile";
import { useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";

function Search() {
  const [open, setOpen] = useState(false);
  const [cookie, setCookie, removeCookie] = useCookies("id");
  const userId = cookie.id;
  const login = cookie.id !== undefined ? true : false;

  const sideBarHandler = () => {
    setOpen((prev) => !prev);
  };

  const [loginProfile, setLoginProfile] = useState({
    img: "",
    name: "",
    job: "",
    footprint: "",
    userId: "",
    topPageId: {
      stamp: "",
      print: "",
    },
  });

  const getLoginProfile = async (userid) => {
    const json = await (await fetch(`/users/profile/${userid}`)).json();
    console.log(json);
    const profile = {
      img: json.result.userImgUrl,
      name: json.result.userName,
      job: json.result.job,
      footprint: json.result.footprintNum,
      userId: json.result.userId,
      topPageId: {
        stamp: json.result.getStampTopPageRes.topStampPageId,
        print: json.result.getPrintTopPageRes.topPrintPageId,
      },
    };

    // console.log(profile);
    setLoginProfile(profile);
  };

  const [cate, setCate] = useState(true);

  const location = useLocation();
  const word = decodeURI(
    location.search.substring(location.search.indexOf("word=") + 5)
  );
  const [page, setPage] = useState(1);
  // console.log(word, page);

  const [postList, setPostList] = useState([]);
  const [userList, setUserList] = useState([]);
  const getProfile = async (json) => {
    const userJson = await (
      await fetch(`/users/profile/${json.userIdx}`)
    ).json();
    // console.log(userJson.result.commentNum);
    if (userJson.result.commentNum === undefined) {
      json.commentNum = null;
    } else {
      json.commentNum = userJson.result.commentNum;
    }
    json.stampNum = userJson.result.stampNum;
    json.footprintNum = userJson.result.footprintNum;

    // console.log(json);
    setUserList((current) => [json, ...current]);
  };
  const getResult = async () => {
    const json = await (
      await fetch(`/search?word=${word}&page=${page}`)
    ).json();
    console.log(json.result.postInfoList, json.result.usersInfoList);

    for (let user of json.result.usersInfoList) {
      getProfile(user);
    }

    // setUserList((current) => [...json.result.usersInfoList, ...current]);
    setPostList((current) => [...json.result.postInfoList, ...current]);
  };
  // console.log(userList, postList);

  useEffect(() => {
    getLoginProfile(userId);
    getResult();
  }, [page, word]);

  //임시 데이터, api에서 받아온 결과로 대체할 예정
  // const searchResultArr = [
  //   {
  //     userInfo: {
  //       userIdx: 1,
  //       userName: "허서윤",
  //       introduction: "hi",
  //       job: "학생",
  //       userImgUrl: "https://via.placeholder.com/60x40",
  //       pageId: 3,
  //     },
  //     preview: "하위 페이지 프리뷰입니다.",
  //     parentBlockId: 3,
  //     updatedAt: "2022-08-11T18:29:14.000+00:00",
  //     contentsList: [
  //       {
  //         blockId: 4,
  //         content: "하위페이지 내용입니다.",
  //         orderNum: 0,
  //       },
  //       {
  //         blockId: 11,
  //         content: "asdfasdfasdf",
  //         orderNum: 4,
  //       },
  //       {
  //         blockId: 12,
  //         content: "qwerqwerqwer",
  //         orderNum: 5,
  //       },
  //       {
  //         blockId: 13,
  //         content: "zxcvzcxvzxcv",
  //         orderNum: 6,
  //       },
  //     ],
  //     commentNum: 0,
  //     stampNum: 0,
  //     footPrintNum: 1,
  //   },
  // ];

  return (
    <div>
      <Header
        state={open}
        clickFunc={sideBarHandler}
        icon={false}
        login={login}
        upper_block={false}
      />
      <div className={styles.contents}>
        <SideBar profile={loginProfile} display={!open} login={login} />
        <div className={styles.scroll}>
          <div className={styles.body_contents}>
            <div id={styles.body_header}>
              <SearchBar word={word} />
              <div className={styles.cate_btns}>
                <button
                  className={cate ? styles.cate_select : styles.cate_select_no}
                  onClick={() => setCate(true)}
                >
                  글
                </button>
                <button
                  className={cate ? styles.cate_select_no : styles.cate_select}
                  onClick={() => setCate(false)}
                >
                  사람
                </button>
              </div>
            </div>
            <div id={styles.content_wrapper}>
              {cate ? (
                <SearchText contentArr={postList} />
              ) : (
                <SearchProfile contentArr={userList} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
