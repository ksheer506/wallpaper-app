import styled from "styled-components"

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
`

export default function Header() {
  return (
    <StyledHead>
      <h1>배경화면</h1>
    </StyledHead>
  );
}