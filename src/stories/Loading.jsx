import React from "react";
import styled, { css } from "styled-components";

const Dot = styled.span`
  position: relative;
  width: 10px;
  height: 10px;
  border-radius: 20px;
  animation: pop 1s linear infinite;

  ${(props) =>
    props.colors &&
    css`
      @keyframes pop {
        0% {
          top: 0%;
          background-color: ${props.colors[0]};
        }
        25% {
          top: -7%;
        }
        50% {
          top: 0%;
          background-color: ${props.colors[1]};
        }
        75% {
          top: 7%;
          background-color: ${props.colors[2]};
        }
        100% {
          top: 0%;
          background-color: ${props.colors[0]};
        }
      }
    `}
`;

const StyledLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 5px;
  width: 100%;
  height: 50px;
  background-color: rgba(255, 255, 255, 0);

  & span:nth-child(2) {
    animation-delay: 300ms;
  }
  & span:nth-child(3) {
    animation-delay: 600ms;
  }
`;

const Loading = ({ colors, number = 3 }) => {
  const dotArr = new Array(number).fill(0);

  return (
    <StyledLoading>
      {dotArr.map((el) => (
        <Dot colors={colors} />
      ))}
    </StyledLoading>
  );
};

export default Loading;
