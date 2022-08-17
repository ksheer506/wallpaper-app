import { useRef, useState } from "react";

const Login = () => {
  const [msg, setMsg] = useState("");
  const id = useRef(null);
  const password = useRef(null);

  const LoginHandler = (e) => {
    e.preventDefault();
    const form = {
      id: id.current.value,
      password: password.current.value,
    };

    console.log(form);

    try {
      fetch("http://localhost:4000/login", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "content-Type": "application/json"
        },
      });
    } catch (e) {}
  };

  return (
    <form onSubmit={LoginHandler}>
      <div>
        <label>아이디</label>
        <input type="text" ref={id}></input>
      </div>
      <div>
        <label>비밀번호</label>
        <input type="password" ref={password}></input>
      </div>
      <p></p>
      <button>로그인</button>
    </form>
  );
};

export default Login;
