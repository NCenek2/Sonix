import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../reducers/postsReducer";
import { useAppDispatch } from "../../reducers";
const AddMessage = () => {
  const [sox, setSox] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSoxPost = async () => {
    if (sox === "") return;
    await dispatch(createPost(sox));
    navigate("/posts");
    setSox("");
  };

  const handleSoxUpdate = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setSox(value);
  };

  return (
    <div className="message-container">
      <textarea
        id="textarea1"
        className="materialize-textarea white-text"
        value={sox}
        onChange={handleSoxUpdate}
        placeholder="Message"
        name={sox}
      ></textarea>
      <button className="post-btn" onClick={handleSoxPost}>
        Upload
      </button>
    </div>
  );
};

export default AddMessage;
