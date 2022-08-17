import { useRef, useState } from "react";
import { v4 as uuid } from "uuid";

const CommentItem = ({ username, comment, createdAt, handleEdit }) => {
  const [isEdit, setIsEdit] = useState(false);
  const editComment = useRef(null);

  const onEdit = () => {
    console.log(editComment.current.value);
    handleEdit(editComment.current.value);
    setIsEdit(false);
  };

  return (
    <article>
      <div>
        <p>{username}</p>
        <p>{new Date(createdAt).toLocaleDateString()}</p>
      </div>
      <div>
        {isEdit ? (
          <button onClick={onEdit}>완료</button>
        ) : (
          <button onClick={() => setIsEdit(true)}>수정</button>
        )}
        <button>삭제</button>
      </div>
      {isEdit ? <textarea defaultValue={comment} ref={editComment} /> : <div>{comment}</div>}
    </article>
  );
};

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
      const res = await fetch(`http://localhost:4000/pictures/${L ? id : ""}`, {
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
        return {...e, comment: edited};
      }
      return e;
    });

    console.log(updated);

    try {
      const res = await fetch(`http://localhost:4000/pictures/${id}`, {
        method: "PUT",
        signal: controller.signal,
        body: JSON.stringify({ id, comments: updated }),
        headers: {
          "content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (res.ok) {
        setComment(updated);
      }
    } catch (e) {
      console.log("전송 실패");
    }
  };

  return (
    <section>
      <form onSubmit={submitComment}>
        <div>
          <label>아이디</label>
          <input type="text" ref={username} required />
        </div>
        <div>
          <textarea ref={body} required />
        </div>
        <button>댓글 입력</button>
      </form>
      {comment.map((com) => (
        <CommentItem
          {...com}
          handleEdit={(edited) => handleEdit(edited, com.uuid)}
          key={com.uuid}
        />
      ))}
    </section>
  );
};

export default Comments;
