import { CommentCont, CommentInfo, EditComment, SButton } from "./style";

const { useState, useRef } = require("react");

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

export default CommentItem;