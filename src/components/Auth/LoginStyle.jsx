import styled, { css } from "styled-components";

export const ValidityMsg = styled.p`
  display: flex;
  align-items: center;
  height: 30px;
  font-size: 0.8rem;
  font-style: italic;
  padding: 5px;

  ${({ code }) =>
    code > 0 &&
    css`
      color: red;
    `}
`;

export const InputForm = styled.div`
  display: flex;
  flex-flow: column wrap;
  row-gap: 5px;
  margin-top: 17px;

  & > label {
    font-weight: bold;
  }
  & > input {
    height: 25px;
  }
`;

export const SButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 30px;
  background-color: #0382cc;
  color: white;
  border: 1px solid #0382cc;
  transition: 0.6s all;
  padding: 5px;
  margin-left: auto;
  border-radius: 3px;
  font-size: 1rem;
  font-weight: bold;

  &:hover {
    color: #0382cc;
    background-color: white;
    transition: 0.6s all;
  }
`;
