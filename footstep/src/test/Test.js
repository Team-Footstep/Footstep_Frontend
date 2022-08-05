import React, { useState } from "react";
import Header from "../components/Header/Header.js";
import SideBar from "../components/SideBar/SideBar.js";

function Test() {
  const [open, setOpen] = useState(true);
  const sideBarHandler = () => {
    setOpen((prev) => !prev);
  };
  return (
    <div>
      <Header state={open} clickFunc={sideBarHandler} icon={true} />
      <div>
        <SideBar
          img={null}
          name={"문비"}
          job={"프론트앤드 디자이너"}
          footprint={2000}
          display={!open}
          login={false}
        />
      </div>
    </div>
  );
}

export default Test;
