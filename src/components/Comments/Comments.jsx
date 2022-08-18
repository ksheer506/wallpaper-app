import { useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import { SERVER } from "../..";
import CommentItem from "./CommentsItem";
import { InputForm, SubmitButton, SubmitForm, NoComment } from "./style";


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
