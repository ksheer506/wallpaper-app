import styled, { css } from "styled-components";

const Container = styled.article`
  display: flex;
  flex-flow: column nowrap;
  row-gap: 5px;
  justify-content: center;
  padding: 5px;
  background-color: #f8f8f8;

  ${(props) =>
    (props.width || props.height) &&
    css`
      width: ${props.width};
      height: ${props.height};
    `}

  & > img {
    width: 90%;
    height: 90%;
    align-self: center;
  }
  & > div {
    display: flex;
    justify-content: space-between;
    flex-flow: row nowrap;

    & > .photographer {
      font-style: italic;
    }
  }
`;

export default function ImgContainer({ width, height, photographer, id, src, alt }) {
  return (
    <Container width={width} height={height}>
      <img src={src.portrait} alt={alt} />
      <div>
        <span className="photographer">{photographer}</span>
        <span className="others">즐겨 찾기</span>
      </div>
    </Container>
  );
}
