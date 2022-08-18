import { useRef, useState } from "react";
import { SERVER } from "../..";
import { useAuth } from "./AuthContext";
import { InputForm, SButton, ValidityMsg } from "./LoginStyle";

const Login = () => {
  const [msg, setMsg] = useState({ code: null, message: "" });
  const { setAuth } = useAuth();
  const id = useRef(null);
  const password = useRef(null);

  const LoginHandler = async (e) => {
    e.preventDefault();

    const form = {
      id: id.current.value,
      password: password.current.value,
      keepLoggedin: true,
    };

    try {
      const res = await fetch(`${SERVER}/login`, {
        method: "POST",
        body: JSON.stringify(form),
        credentials: "include",
        headers: {
          "content-Type": "application/json",
        },
      });

      const resData = await res.json();

      if (resData.status === "Not Authorized") {
        setMsg({ code: 2, message: "존재하지 않는 사용자입니다." });
      }
      if (resData.status === "Wrong Password") {
        setMsg({ code: 1, message: "비밀번호를 확인해주세요" });
      }
      if (resData.status === "Authorized") {
        setMsg({ code: 0, message: "" });
        setAuth({ ...resData, status: true });
      }
    } catch (e) {}
  };

  return (
    <form onSubmit={LoginHandler}>
      <InputForm>
        <label>아이디</label>
        <input type="text" ref={id}></input>
      </InputForm>
      <InputForm>
        <label>비밀번호</label>
        <input type="password" ref={password}></input>
      </InputForm>
      <ValidityMsg code={msg.code}>{msg.message}</ValidityMsg>
      <SButton>로그인</SButton>
    </form>
  );
};


export default Login;
