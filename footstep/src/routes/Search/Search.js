import styles from "../Search/Search.module.css";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import SideBar from "../../components/SideBar/SideBar";
import SearchBar from "../../components/SearchBar/SearchBar";
import SearchText from "../../components/SearchResult/SearchText";
import SearchProfile from "../../components/SearchResult/SearchProfile";
import { useLocation } from "react-router-dom";

function Search() {
  const [open, setOpen] = useState(false);
  const sideBarHandler = () => {
    setOpen((prev) => !prev);
  };

  const [cate, setCate] = useState(true);

  const location = useLocation();
  const word = decodeURI(
    location.search.substring(location.search.indexOf("word=") + 5)
  );
  const [page, setPage] = useState(1);
  console.log(word, page);

  const [postList, setPostList] = useState([
    {
      userInfo: {
        userIdx: 1,
        userName: "허서윤",
        introduction: "hi",
        job: "학생",
        userImgUrl: "https://via.placeholder.com/60x40",
        pageId: 3,
      },
      preview: "하위 페이지 프리뷰입니다.",
      parentBlockId: 3,
      updatedAt: "2022-08-11T18:29:14.000+00:00",
      contentsList: [
        {
          blockId: 4,
          content: "하위페이지 내용입니다.",
          orderNum: 0,
        },
        {
          blockId: 11,
          content: "asdfasdfasdf",
          orderNum: 4,
        },
        {
          blockId: 12,
          content: "qwerqwerqwer",
          orderNum: 5,
        },
        {
          blockId: 13,
          content: "zxcvzcxvzxcv",
          orderNum: 6,
        },
      ],
      commentNum: 0,
      stampNum: 0,
      footPrintNum: 1,
    },
  ]);
  const [userList, setUserList] = useState([]);
  const getProfile = async (json) => {
    const userJson = await (
      await fetch(`/users/profile/${json.userIdx}`)
    ).json();
    console.log(userJson);
    json.commentNum = userJson.result.commentNum;
    json.stampNum = userJson.result.stampNum;
    json.footprintNum = userJson.result.footprintNum;

    console.log(json);
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

    setPostList((current) => [...json.result.postInfoList, ...current]);
  };
  console.log(userList, postList);

  useEffect(() => {
    getResult();
  }, [page, word]);

  //임시 데이터, api에서 받아온 결과로 대체할 예정
  // const searchResultArr = [
  //   {
  //     title:
  //       "111Preview 내용이 들어갈 자리입니다. 이 카드의 제목은 한 줄까지 가능합니다. 111Preview 내용이 들어갈 자리입니다. 이 카드의 제목은 한 줄까지 가능합니다.",
  //     img_url: "https://via.placeholder.com/60x40",
  //     name: "문비",
  //     job: "프론트엔드 개발자",
  //     content: `글의 내용이 들어갈 자리입니다. 이 내용은 대충 2~3줄 정도?<br>
  //         간략한 글의 내용이 들어가는 자리입니다. 글이 이 네모박스 밖으로 튀어나가지 않게, 길이가 길어지면 overflow:hidden하고 ellipsis 처리해주세요! 글의 길이가 짧아져도 카드의 크기는 동일합니다.
  //         간략한 글의 내용이 들어가는 자리입니다. 글이 이 네모박스 밖으로 튀어나가지 않게, 길이가 길어지면 overflow:hidden하고 ellipsis 처리해주세요! 글의 길이가 짧아져도 카드의 크기는 동일합니다.`,
  //     date: "2021/07/12",
  //     foot_cnt: "4",
  //   },
  //   {
  //     title:
  //       "222Preview 내용이 들어갈 자리입니다. 이 카드의 제목은 한 줄까지 가능합니다.",
  //     img_url: "https://via.placeholder.com/60x40",
  //     name: "문비",
  //     job: "프론트엔드 개발자",
  //     content: `글의 내용이 들어갈 자리입니다. 이 내용은 대충 2~3줄 정도?<br>
  //         간략한 글의 내용이 들어가는 자리입니다. 글이 이 네모박스 밖으로 튀어나가지 않게, 길이가 길어지면 overflow:hidden하고 ellipsis 처리해주세요! 글의 길이가 짧아져도 카드의 크기는 동일합니다.
  //         간략한 글의 내용이 들어가는 자리입니다. 글이 이 네모박스 밖으로 튀어나가지 않게, 길이가 길어지면 overflow:hidden하고 ellipsis 처리해주세요! 글의 길이가 짧아져도 카드의 크기는 동일합니다.`,
  //     date: "2021/07/12",
  //     foot_cnt: "4",
  //   },
  //   {
  //     title:
  //       "333Preview 내용이 들어갈 자리입니다. 이 카드의 제목은 한 줄까지 가능합니다.",
  //     img_url: "https://via.placeholder.com/60x40",
  //     name: "문비",
  //     job: "프론트엔드 개발자",
  //     content: `글의 내용이 들어갈 자리입니다. 이 내용은 대충 2~3줄 정도?<br>
  //         간략한 글의 내용이 들어가는 자리입니다. 글이 이 네모박스 밖으로 튀어나가지 않게, 길이가 길어지면 overflow:hidden하고 ellipsis 처리해주세요! 글의 길이가 짧아져도 카드의 크기는 동일합니다.
  //         간략한 글의 내용이 들어가는 자리입니다. 글이 이 네모박스 밖으로 튀어나가지 않게, 길이가 길어지면 overflow:hidden하고 ellipsis 처리해주세요! 글의 길이가 짧아져도 카드의 크기는 동일합니다.`,
  //     date: "2021/07/12",
  //     foot_cnt: "4",
  //   },
  //   {
  //     title:
  //       "444Preview 내용이 들어갈 자리입니다. 이 카드의 제목은 한 줄까지 가능합니다.",
  //     img_url: "https://via.placeholder.com/60x40",
  //     name: "문비",
  //     job: "프론트엔드 개발자",
  //     content: `글의 내용이 들어갈 자리입니다. 이 내용은 대충 2~3줄 정도?<br>
  //         간략한 글의 내용이 들어가는 자리입니다. 글이 이 네모박스 밖으로 튀어나가지 않게, 길이가 길어지면 overflow:hidden하고 ellipsis 처리해주세요! 글의 길이가 짧아져도 카드의 크기는 동일합니다.
  //         간략한 글의 내용이 들어가는 자리입니다. 글이 이 네모박스 밖으로 튀어나가지 않게, 길이가 길어지면 overflow:hidden하고 ellipsis 처리해주세요! 글의 길이가 짧아져도 카드의 크기는 동일합니다.`,
  //     date: "2021/07/12",
  //     foot_cnt: "4",
  //   },
  // ];

  return (
    <div>
      <Header state={open} clickFunc={sideBarHandler} />
      <div className={styles.contents}>
        <SideBar
          img={null}
          name={"문비"}
          job={"프론트앤드 디자이너"}
          footprint={2000}
          display={!open}
          login={true}
        />
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
