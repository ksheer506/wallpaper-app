import styled, { css, keyframes } from "styled-components";

const wave = keyframes`
  0% {
      opacity: 0;
    }
  50% {
      opacity: 0.3;
  }
  100% {
      opacity: 0;
  }
`;

const Skelcontainer = styled.div`
  display: flex;
  position: relative;
  flex-flow: column nowrap;
  row-gap: 10px;
  justify-content: center;

  ${(props) =>
    props.width &&
    props.height &&
    css`
      width: ${props.width};
      height: ${props.height};
    `}
`;

export const Rectangle = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 5px;
  background-color: #f8f8f8;

  ${(props) =>
    props.width &&
    props.height &&
    css`
      width: ${props.width};
      height: ${props.height};
    `}

  &::before {
    content: "";
    display: block;
    overflow: hidden;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #dbdbdb;
    animation: ${wave} 1.5s ease infinite;
  }
`;

export const Circle = styled.div`
  position: relative;
  overflow: hidden;
  background-color: #f8f8f8;

  ${(props) =>
    props.radius &&
    css`
      width: ${props.radius};
      height: ${props.radius};
      border-radius: ${props.radius};
    `}

  &::before {
    content: "";
    display: block;
    overflow: hidden;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #dbdbdb;
    animation: ${wave} 1.5s ease infinite;
  }
`;

const ImgSkelContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  row-gap: 10px;
  justify-content: space-between;
  align-items: center;

  ${(props) =>
    props.width &&
    props.height &&
    css`
      width: ${props.width};
      height: ${props.height};
    `}
`;

export const ImageSkel = () => {
  return (
    <Skeleton width="auto" height="auto">
      <Rectangle width={200} height={200}></Rectangle>
      <ImgSkelContainer width={200} height={30}>
        <Rectangle width={160} height={30}></Rectangle>
        <Circle radius={30}></Circle>
      </ImgSkelContainer>
    </Skeleton>
  );
};

export default function Skeleton({ width, height, children }) {
  return (
    <Skelcontainer width={width} height={height}>
      {children}
    </Skelcontainer>
  );
}
