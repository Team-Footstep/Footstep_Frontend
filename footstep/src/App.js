import React, { useState } from "react";
import "./css/reset.css";
import "./css/variables.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home/Home.js";
import Login from "./routes/Login/Login.js";
import MyFootstep from "./routes/MyFootstep/MyFootstep.js";
import Route_ProfileSetting from "./routes/ProfileSetting/ProfileSetting";
import Search from "./routes/Search/Search.js";
import LoginTerms from "./routes/Login/LoginTerms";
import Confirm from "./routes/Login/Confirm";
import SubMyFootstep from "./routes/SubMyFootstep/SubMyFootstep";
import OtherFootstep from "./routes/OtherFootstep/OtherFootstep";
import Footstep from "./routes/OtherFootstep/Footstep";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/users/confirmlogin" element={<Confirm type="login" />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/terms" element={<LoginTerms />} />
        <Route
          path="/users/signup/confirm"
          element={<Confirm type="signup" />}
        />
        <Route path="/myfootstep/:pageId" element={<MyFootstep />} />
        <Route path="/footstep/:userId/:pageId" element={<Footstep />} />
        <Route path="/profilesetting" element={<Route_ProfileSetting />} />
        <Route path="/search" element={<Search />} />
        <Route path="/submyfootstep" element={<SubMyFootstep />} />
        <Route path="/otherfootstep" element={<OtherFootstep />} />
      </Routes>
    </Router>
  );
}

export default App;
