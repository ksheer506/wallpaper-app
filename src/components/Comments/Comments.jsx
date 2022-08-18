import { useRef, useState } from "react";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import { SERVER } from "../..";
import { CommentCont, CommentInfo, EditComment, SButton } from "./style";

const CommentItem = ({ username, comment, createdAt, handleEdit, handleDelete }) => {
  const [isEdit, setIsEdit] = useState(false);
  const editComment = useRef(null);

  const onEdit = () => {
    handleEdit(editComment.current.value);
    setIsEdit(false);
  };

  return (
    <CommentCont>
      <EditComment>
        <CommentInfo>
          <p className="username">{username}</p>
          <p className="created">{new Date(createdAt).toLocaleDateString()}</p>
        </CommentInfo>
        {isEdit ? (
          <SButton onClick={onEdit}>완료</SButton>
        ) : (
          <SButton onClick={() => setIsEdit(true)}>수정</SButton>
        )}
        <SButton onClick={handleDelete}>삭제</SButton>
      </EditComment>
      {isEdit ? <textarea defaultValue={comment} ref={editComment} /> : <div>{comment}</div>}
    </CommentCont>
  );
};

const SubmitForm = styled.form`
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

const InputForm = styled.div`
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

const SubmitButton = styled(SButton)`
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

const NoComment = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;

  font-size: 1.5rem;
  font-weight: bold;
  font-style: italic;
  color: #5e5e5e;
`;

const Comments = ({ id, comment, setComment }) => {
  const username = useRef(null);
  const body = useRef(null);

  const submitComment = async (e) => {
    e.preventDefault();

    const controller = new AbortController();
    const L = comment.length;
    const newEntry = {
      uuid: uuid(),
      username: username.current.value,
      comment: body.current.value,
      createdAt: Date.now(),
    };
    const updated = [newEntry, ...comment];

    try {
      const res = await fetch(`${SERVER}/pictures/${L ? id : ""}`, {
        method: L ? "PUT" : "POST",
        signal: controller.signal,
        body: JSON.stringify({ id, comments: updated }),
        headers: {
          "content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (res.ok) {
        setComment(data.comments);
        username.current.value = "";
        body.current.value = "";
      }
    } catch (e) {
      console.log("전송 실패");
    }
  };

  const handleEdit = async (edited, uuid) => {
    const controller = new AbortController();
    const updated = comment.map((e) => {
      if (e.uuid === uuid) {
        return { ...e, comment: edited };
      }
      return e;
    });

    try {
      const res = await fetch(`${SERVER}/pictures/${id}`, {
        method: "PUT",
        signal: controller.signal,
        body: JSON.stringify({ id, comments: updated }),
        headers: {
          "content-Type": "application/json",
        },
      });

      await res.json();

      if (res.ok) {
        setComment(updated);
      }
    } catch (e) {
      console.log("전송 실패");
    }
  };

  const handleDelete = async (uuid) => {
    const controller = new AbortController();
    const updated = comment.filter((e) => e.uuid !== uuid);

    try {
      const res = await fetch(`${SERVER}/pictures/${id}`, {
        method: "PUT",
        signal: controller.signal,
        body: JSON.stringify({ id, comments: updated }),
        headers: {
          "content-Type": "application/json",
        },
      });

      await res.json();

      if (res.ok) {
        setComment(updated);
      }
    } catch (e) {
      console.log("전송 실패");
    }
  };


  return (
    <section>
      <SubmitForm onSubmit={submitComment}>
        <InputForm className="id">
          <label>아이디</label>
          <input type="text" ref={username} required />
        </InputForm>
        <InputForm>
          <label>댓글</label>
          <textarea ref={body} required />
        </InputForm>
        <SubmitButton>댓글 입력</SubmitButton>
      </SubmitForm>
      {comment.length ? (
        comment.map((com) => (
          <CommentItem
            {...com}
            handleEdit={(edited) => handleEdit(edited, com.uuid)}
            handleDelete={() => handleDelete(com.uuid)}
            key={com.uuid}
          />
        ))
      ) : (
        <NoComment>댓글이 없습니다. (｡･･｡)</NoComment>
      )}
    </section>
  );
};

export default Comments;
