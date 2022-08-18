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

export const NoComment = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 260px;

  font-size: 1.5rem;
  font-weight: bold;
  font-style: italic;
  color: #5e5e5e;
`;

export const SubmitForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-top: 50px;
  margin-bottom: 15px;
  row-gap: 5px;
  box-shadow: 0px 0px 4px grey;

  & > .id {
  }
`;

export const InputForm = styled.div`
  display: grid;
  align-items: center;
  row-gap: 5px;

  & > label {
    font-size: 0.9rem;
    margin-right: 5px;
  }

  & > input {
    height: 30px;
  }
`;

export const SubmitButton = styled(SButton)`
  display: flex;
  background-color: #3191ff;
  border: 1px solid #3191ff;
  font-size: 1rem;
  width: 80px;
  height: 28px;
  margin-left: auto;
  margin-top: 5px;

  &:hover {
    color: #3191ff;
  }
`;