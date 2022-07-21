import React from "react";
import { createGlobalStyle } from "styled-components";
import "./css/reset.css";
import "./css/variables.css";
import Footer from "./components/Footer/Footer";

const GlobalStyle = createGlobalStyle`
  body {
    background: var(--white);
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <div>
        <Footer />
      </div>
    </>
  );
}

export default App;
