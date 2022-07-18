import React from 'react';
import { createGlobalStyle } from 'styled-components';

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
