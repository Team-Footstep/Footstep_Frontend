import React from "react";
import "./css/reset.css";
import "./css/variables.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './routes/Home/Home.js';
import Login from "./routes/Login/Login.js";
import MyFootstep from "./routes/MyFootstep/MyFootstep.js";
import ProfileSetting from "./routes/ProfileSetting/ProfileSetting.js";
import Search from "./routes/Search/Search.js";
import Test from "./test/Test.js";

function App() {
    return <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/myfootstep" element={<MyFootstep/>}/>
        <Route path="/profilesetting" element={<ProfileSetting/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/test" element={<Test/>}/>
      </Routes>
    </Router>;
}

export default App;
