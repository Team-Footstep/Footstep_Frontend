import React, { useState } from "react";
import Header from "../components/Header/Header.js";
import SideBar from "../components/SideBar/SideBar.js";
import Comments_SideBar from "../components/Comments_SideBar/Comments_SideBar";

//지금 이  Test 컴포넌트가 myfootstep컴포넌트라고 생각하고 만드는 중입니다..!!!
function Test() {
  const [open, setOpen] = useState(false);
  const [commentsopen, setCommentsOpen] = useState(false);
  const sideBarHandler = () => {
    setOpen((prev) => !prev);
  };

  const commentsHandler = () => {
    setCommentsOpen((prev) => !prev);
  };
  return (
    <div>
      <Header
        state={open}
        clickFunc={sideBarHandler}
        comments_clickFunc={commentsHandler}
        icon={true}
      />
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
      <div>
        <Comments_SideBar display={commentsopen} />
      </div>
    </div>
  );
}

export default Test;
