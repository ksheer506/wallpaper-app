import styled, { css } from "styled-components";

const Container = styled.article`
  display: flex;
  flex-flow: column nowrap;
  row-gap: 5px;
  justify-content: center;
  padding: 15px;
  background-color: #f8f8f8;

  ${(props) =>
    (props.width || props.height) &&
    css`
      width: ${props.width}px;
      height: ${props.height}px;
    `}

  & > img {
    width: 90%;
    height: 80%;
    align-self: center;
  }
  & > div {
    display: flex;
    justify-content: space-between;
    flex-flow: row nowrap;

    & > .title {
      font-weight: bold;
    }
  }
`;

export default function ImgContainer({ width, height, src }) {
  return (
    <Container width={width} height={height}>
      <img src={src}></img>
      <div>
        <span className="title">사진 제목</span>
        <span className="others">즐겨 찾기</span>
      </div>
    </Container>
  );
}
