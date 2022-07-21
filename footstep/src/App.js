import React, { useEffect, useState } from "react";
import { createGlobalStyle } from "styled-components";
import SideBar from "./components/SideBar/SideBar";
import "./css/reset.css";
import "./css/variables.css";
import ShortCard from "./components/Card/ShortCard";
import LongCard from "./components/Card/LongCard";

const GlobalStyle = createGlobalStyle`
  body {
    background: var(--white);
  }
`;

function App() {
    const [cardContent, setCardContent] = useState({});
    useEffect(() => {
        setCardContent({
            img_url: "https://via.placeholder.com/60x40",
            name: "백은미",
            job: "프론트엔드 개발자",
            title: `카드 제목이 들어갈 자리입니다. 이 카드의 제목은 때로는 두줄까지
      가능합니다. 카드 제목이 들어갈 자리입니다.`,
            content: `글의 내용이 들어갈 자리입니다. 이 내용은 대충 7줄 정도?`,
            foot_cnt: "12345",
            footprint_cnt: "2K",
            follow_cnt: "16",
        });
    }, []);
    return (
        <>
            <GlobalStyle />

            <div>
                <ShortCard content={cardContent} />
                <LongCard content={cardContent} />
            </div>
        </>
    );
}

export default App;
