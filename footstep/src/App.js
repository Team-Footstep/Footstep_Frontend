import React, { useEffect, useState } from "react";
import "./css/reset.css";
import "./css/variables.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home/Home.js";
import Login from "./routes/Login/Login.js";
import MyFootstep from "./routes/MyFootstep/MyFootstep.js";
import Route_ProfileSetting from "./routes/ProfileSetting/ProfileSetting";
import Search from "./routes/Search/Search.js";
// import Test from "./test/Test.js";
import SubPage from "./routes/SubPage/SubPage.js";
import LoginTerms from "./routes/Login/LoginTerms";
import Confirm from "./routes/Login/Confirm";
import SubMyFootstep from "./routes/SubMyFootstep/SubMyFootstep";
import OtherFootstep from "./routes/OtherFootstep/OtherFootstep";

function App() {
  const [userId, setUserId] = useState(0);
  //userId===0 -> 로그인 안 된 상태
  //userId>0 -> 로그인 된 상태 / 로그인 된 userId값
  const [login, setLogin] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/users/confirmlogin"
          element={
            <Confirm type="login" setUserId={setUserId} setLogin={setLogin} />
          }
        />
        <Route path="/" element={<Home userId={userId} login={login} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/terms" element={<LoginTerms />} />
        <Route
          path="/users/signup/confirm"
          element={<Confirm type="signup" />}
        />
        <Route path="/myfootstep" element={<MyFootstep userId={userId}/>} />
        <Route path="/profilesetting" element={<Route_ProfileSetting />} />
        <Route
          path="/search"
          element={<Search userId={userId} login={login} />}
        />
        <Route path="/test" element={<Test />} />
        <Route path="/submyfootstep" element={<SubMyFootstep/>}/>
        <Route path="/otherfootstep" element={<OtherFootstep/>}/>
      </Routes>
    </Router>
  );
}

export default App;
