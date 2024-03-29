import { keyframes } from "styled-components";

export const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

export const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const upward = keyframes`
  0% {
    top: 50%;
  }
  100% {
    top: -50%;
  }
`;
