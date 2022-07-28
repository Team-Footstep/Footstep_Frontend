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
            <Header state={open} clickFunc={sideBarHandler} />
            <div className={styles.contents}>
                <SideBar
                    img={null}
                    name={"문비"}
                    job={"프론트앤드 디자이너"}
                    footprint={2000}
                    display={!open}
                    login={false}
                />
                <LoginCard />
            </div>
        </div>
    );
}

export default Login;
