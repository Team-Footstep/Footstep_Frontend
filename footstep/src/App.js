import React from "react";
import "./css/reset.css";
import "./css/variables.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home/Home.js";
import Login from "./routes/Login/Login.js";
import MyFootstep from "./routes/MyFootstep/MyFootstep.js";
import Route_ProfileSetting from "./routes/ProfileSetting/ProfileSetting";
import Search from "./routes/Search/Search.js";
import Test from "./test/Test.js";
import SubPage from "./routes/SubPage/SubPage.js"
import LoginTerms from "./routes/Login/LoginTerms";
import Confirm from "./routes/Login/Confirm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/login/terms" element={<LoginTerms />} />
        <Route
          path="/users/signup/confirm"
          element={<Confirm type="signup" />}
        />
        <Route path="/users/confirmlogin" element={<Confirm type="login" />} />
        <Route path="/myfootstep" element={<MyFootstep />} />
        <Route path="/profilesetting" element={<Route_ProfileSetting />} />
        <Route path="/search" element={<Search />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
}

export default App;
