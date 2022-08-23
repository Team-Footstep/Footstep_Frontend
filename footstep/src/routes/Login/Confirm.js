import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Confirm({ type, setUserId, setLogin }) {
  const location = useLocation().search;
  const navigate = useNavigate();

  const email = location.substring(
    location.indexOf("?email=") + 7,
    location.indexOf("&token=")
  );
  const token = location.substring(location.indexOf("&token=") + 7);
  // console.log(email, token);
  // const body = JSON.stringify({
  //   email: email,
  //   token: token,
  // });

  const confirmSignup = async (email, token) => {
    const json = await (
      await fetch(`/users/signup/confirm?email=${email}&token=${token}`)
    ).json();
    console.log(json);

    if (json.code === 1000 && json.result.status === 1) {
      alert("회원가입에 성공하였습니다.\n로그인 해주세요.");
      navigate(`/login`);
    } else {
      alert("회원가입에 실패하였습니다.\n다시 시도해주세요.");
      navigate(`/login`);
    }
  };

  const confirmLogin = async (email, token) => {
    const json = await (
      await fetch(`/users/confirmlogin?email=${email}&token=${token}`)
    ).json();
    console.log(json);

    if (json.code === 1000 && json.result.status === 1) {
      setUserId(json.result.userId);
      setLogin(true);
      alert("로그인에 성공하였습니다.");
      navigate(`/`);
    } else {
      alert("로그인에 실패하였습니다.\n다시 시도해주세요.");
      navigate(`/login`);
    }
  };

  useEffect(() => {
    if (type === "signup") {
      confirmSignup(email, token);
    } else if (type === "login") {
      // confirmLogin(email, token);
      setUserId(2);
      setLogin(true);
      navigate("/");
    }
  }, []);

  return (
    <div
      style={{
        backgroundColor: "var(--whiteblue-bg)",
        width: "100%",
        height: "100vh",
      }}
    ></div>
  );
}

export default Confirm;
