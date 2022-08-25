import React from "react";
import Header from "../../components/Header/Header";
import SideBar from "../../components/SideBar/SideBar";
import styles from "../Login/Login.module.css";
import { useState } from "react";
import LoginCard from "../../components/LoginCard/LoginCard";

function Login() {
  const [open, setOpen] = useState(false);
  const sideBarHandler = () => {
    setOpen((prev) => !prev);
  };
  return (
    <div>
      <Header state={open} clickFunc={sideBarHandler} upper_block={false} />
      <div className={styles.contents}>
        <LoginCard />
      </div>
    </div>
  );
}

export default Login;
