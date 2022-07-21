import React from "react";
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
    return (
        <>
            <GlobalStyle />
            <div>{/* 코드를 작성해주세요 */}</div>
            <div>
                <LongCard />
            </div>
        </>
    );
}

export default App;
