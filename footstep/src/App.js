import React from 'react';
import { createGlobalStyle } from 'styled-components';
import "./css/reset.css";
import "./css/variables.css";
import Home from './routes/Home/Home.js';

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
        <Home/>
      </div>
    </>
  );
}

export default App;
