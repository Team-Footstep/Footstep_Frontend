import React from 'react';
import { createGlobalStyle } from 'styled-components';
// import SideBar from './components/SideBar/SideBar';
import ProfileCard from './components/ProfileCard/ProfileCard'
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
      {/* <div className="ProfileCard"></div> */}
      <ProfileCard/>
      
      
    </>
  );
}

export default App;
