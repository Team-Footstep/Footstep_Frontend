import React from 'react';
import { createGlobalStyle } from 'styled-components';
import SideBar from './components/SideBar/SideBar';
import "./css/reset.css";
import "./css/variables.css";

const GlobalStyle = createGlobalStyle`
  body {
    background: var(--white);
  }
`;

function App() {
  return (
    <>
      <GlobalStyle/>
      <div>
        {/* 코드를 작성해주세요 */}
      </div>
    </>
  );
}

export default App;
