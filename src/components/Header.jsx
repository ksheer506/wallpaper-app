import styled from "styled-components";
import { useAuth } from "./Auth/AuthContext";
import Login from "./Auth/Login";
import useModal from "./Modal/useModal";

const StyledHead = styled.header`
  width: 100vw;
  height: 60px;
  display: flex;
  position: fixed;
  justify-content: center;
  align-items: center;
  background-color: white;
  box-shadow: 0px 3px 10px #e6e6e6;
  margin-bottom: 15px;
  z-index: 1;
`;

const SButton = styled.button`
  position: absolute;
  right: 30px;
  background-color: white;
  border: 0px;
  transition: 0.6s all;

  &:hover {
    background-color: blanchedalmond;
    transition: 0.6s all;
  }
`;

export default function Header() {
  const openModal = useModal(300, 300);
  const { auth } = useAuth();

  return (
    <StyledHead>
      <h1>WallPaper</h1>
      <p>{auth.status.toString()}</p>
      {auth.status ? (
        <SButton>로그아웃</SButton>
      ) : (
        <SButton onClick={() => openModal(<Login />)}>로그인</SButton>
      )}
    </StyledHead>
  );
}
