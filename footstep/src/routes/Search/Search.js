import styles from "../Search/Search.module.css";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import SideBar from "../../components/SideBar/SideBar";
import SearchBar from "../../components/SearchBar/SearchBar";
import SearchText from "../../components/SearchResult/SearchText";
import SearchProfile from "../../components/SearchResult/SearchProfile";

function Search() {
    const [open, setOpen] = useState(false);
    const sideBarHandler = () => {
        setOpen((prev) => !prev);
    };

    const [cate, setCate] = useState(true);

    const [word, setWord] = useState("");
    const getWord = (text)=>{
        setWord(text);
        console.log(text);
        // console.log(word);
        // getResult(word);
    }
    const getResult = async (word) => {
        const res = await fetch(
          `/search?word=${word}&page=1`
        ).then((res) => res.json());
        console.log(res);
    }

    useEffect(()=>{
        getResult(word);
    }, [word]);
    // return{title, img_url, name, job, content, date, foot_cnt};
    // useEffect(() => {
    //     searchResultArr();
    //   }, []);


    console.log(word);
    
    const searchResultArr = [
        {
            title: "111Preview 내용이 들어갈 자리입니다. 이 카드의 제목은 한 줄까지 가능합니다. 111Preview 내용이 들어갈 자리입니다. 이 카드의 제목은 한 줄까지 가능합니다.",
            img_url: "https://via.placeholder.com/60x40",
            name: "문비",
            job: "프론트엔드 개발자",
            content: `글의 내용이 들어갈 자리입니다. 이 내용은 대충 2~3줄 정도?<br>
          간략한 글의 내용이 들어가는 자리입니다. 글이 이 네모박스 밖으로 튀어나가지 않게, 길이가 길어지면 overflow:hidden하고 ellipsis 처리해주세요! 글의 길이가 짧아져도 카드의 크기는 동일합니다.
          간략한 글의 내용이 들어가는 자리입니다. 글이 이 네모박스 밖으로 튀어나가지 않게, 길이가 길어지면 overflow:hidden하고 ellipsis 처리해주세요! 글의 길이가 짧아져도 카드의 크기는 동일합니다.`,
            date: "2021/07/12",
            foot_cnt: "4",
        },
        {
            title: "222Preview 내용이 들어갈 자리입니다. 이 카드의 제목은 한 줄까지 가능합니다.",
            img_url: "https://via.placeholder.com/60x40",
            name: "문비",
            job: "프론트엔드 개발자",
            content: `글의 내용이 들어갈 자리입니다. 이 내용은 대충 2~3줄 정도?<br>
          간략한 글의 내용이 들어가는 자리입니다. 글이 이 네모박스 밖으로 튀어나가지 않게, 길이가 길어지면 overflow:hidden하고 ellipsis 처리해주세요! 글의 길이가 짧아져도 카드의 크기는 동일합니다.
          간략한 글의 내용이 들어가는 자리입니다. 글이 이 네모박스 밖으로 튀어나가지 않게, 길이가 길어지면 overflow:hidden하고 ellipsis 처리해주세요! 글의 길이가 짧아져도 카드의 크기는 동일합니다.`,
            date: "2021/07/12",
            foot_cnt: "4",
        },
        {
            title: "333Preview 내용이 들어갈 자리입니다. 이 카드의 제목은 한 줄까지 가능합니다.",
            img_url: "https://via.placeholder.com/60x40",
            name: "문비",
            job: "프론트엔드 개발자",
            content: `글의 내용이 들어갈 자리입니다. 이 내용은 대충 2~3줄 정도?<br>
          간략한 글의 내용이 들어가는 자리입니다. 글이 이 네모박스 밖으로 튀어나가지 않게, 길이가 길어지면 overflow:hidden하고 ellipsis 처리해주세요! 글의 길이가 짧아져도 카드의 크기는 동일합니다.
          간략한 글의 내용이 들어가는 자리입니다. 글이 이 네모박스 밖으로 튀어나가지 않게, 길이가 길어지면 overflow:hidden하고 ellipsis 처리해주세요! 글의 길이가 짧아져도 카드의 크기는 동일합니다.`,
            date: "2021/07/12",
            foot_cnt: "4",
        },
        {
            title: "444Preview 내용이 들어갈 자리입니다. 이 카드의 제목은 한 줄까지 가능합니다.",
            img_url: "https://via.placeholder.com/60x40",
            name: "문비",
            job: "프론트엔드 개발자",
            content: `글의 내용이 들어갈 자리입니다. 이 내용은 대충 2~3줄 정도?<br>
          간략한 글의 내용이 들어가는 자리입니다. 글이 이 네모박스 밖으로 튀어나가지 않게, 길이가 길어지면 overflow:hidden하고 ellipsis 처리해주세요! 글의 길이가 짧아져도 카드의 크기는 동일합니다.
          간략한 글의 내용이 들어가는 자리입니다. 글이 이 네모박스 밖으로 튀어나가지 않게, 길이가 길어지면 overflow:hidden하고 ellipsis 처리해주세요! 글의 길이가 짧아져도 카드의 크기는 동일합니다.`,
            date: "2021/07/12",
            foot_cnt: "4",
        },
        {
            title: "555Preview 내용이 들어갈 자리입니다. 이 카드의 제목은 한 줄까지 가능합니다.",
            img_url: "https://via.placeholder.com/60x40",
            name: "문비",
            job: "프론트엔드 개발자",
            content: `글의 내용이 들어갈 자리입니다. 이 내용은 대충 2~3줄 정도?<br>
          간략한 글의 내용이 들어가는 자리입니다. 글이 이 네모박스 밖으로 튀어나가지 않게, 길이가 길어지면 overflow:hidden하고 ellipsis 처리해주세요! 글의 길이가 짧아져도 카드의 크기는 동일합니다.
          간략한 글의 내용이 들어가는 자리입니다. 글이 이 네모박스 밖으로 튀어나가지 않게, 길이가 길어지면 overflow:hidden하고 ellipsis 처리해주세요! 글의 길이가 짧아져도 카드의 크기는 동일합니다.`,
            date: "2021/07/12",
            foot_cnt: "4",
        },
        {
            title: "666Preview 내용이 들어갈 자리입니다. 이 카드의 제목은 한 줄까지 가능합니다.",
            img_url: "https://via.placeholder.com/60x40",
            name: "문비",
            job: "프론트엔드 개발자",
            content: `글의 내용이 들어갈 자리입니다. 이 내용은 대충 2~3줄 정도?<br>
          간략한 글의 내용이 들어가는 자리입니다. 글이 이 네모박스 밖으로 튀어나가지 않게, 길이가 길어지면 overflow:hidden하고 ellipsis 처리해주세요! 글의 길이가 짧아져도 카드의 크기는 동일합니다.
          간략한 글의 내용이 들어가는 자리입니다. 글이 이 네모박스 밖으로 튀어나가지 않게, 길이가 길어지면 overflow:hidden하고 ellipsis 처리해주세요! 글의 길이가 짧아져도 카드의 크기는 동일합니다.`,
            date: "2021/07/12",
            foot_cnt: "4",
        },
    ];

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
                            <SearchBar getWord={getWord} />
                            <div className={styles.cate_btns}>
                                <button
                                    className={
                                        cate
                                            ? styles.cate_select
                                            : styles.cate_select_no
                                    }
                                    onClick={() => setCate(true)}
                                >
                                    글
                                </button>
                                <button
                                    className={
                                        cate
                                            ? styles.cate_select_no
                                            : styles.cate_select
                                    }
                                    onClick={() => setCate(false)}
                                >
                                    사람
                                </button>
                            </div>
                        </div>
                        <div id={styles.content_wrapper}>
                            {cate ? (
                                <SearchText contentArr={searchResultArr} />
                            ) : (
                                <SearchProfile contentArr={searchResultArr} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;
