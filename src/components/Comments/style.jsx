import styled from "styled-components";

export const SButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 20px;
  background-color: #575757;
  color: white;
  border: 1px solid #575757;
  transition: 0.6s all;
  padding: 4px;
  margin: 3px;
  border-radius: 10px;
  font-size: 0.7rem;

  &:hover {
    color: #575757;
    background-color: white;
    transition: 0.6s all;
  }
`;

export const EditComment = styled.div`
  display: flex;
`;

export const CommentInfo = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto;

  & > .username {
    font-weight: bold;
    margin-right: 15px;
  }
  & > .created {
    font-style: italic;
    font-size: 0.8rem;
  }
`;

export const CommentCont = styled.article`
  margin-top: 10px;
`;