import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { patchPost } from "../../reducers/postsReducer";
import { RootState, useAppDispatch } from "../../reducers";
import $ from "jquery";
import M from "materialize-css";

const EditPost = () => {
  const { post } = useSelector((state: RootState) => state.post);
  const dispatch = useAppDispatch();

  const [sox, setSox] = useState("");
  const [uploadedSox, setUploadedSox] = useState(false);

  useEffect(() => {
    if (uploadedSox) {
      M.textareaAutoResize($("#textarea1"));
    }
  }, [uploadedSox]);

  const navigate = useNavigate();
  const handleClick = (msg: string) => {
    if (sox === "") {
      setSox(msg);
      setUploadedSox(true);
    }
  };

  const handleSoxPatch = () => {
    if (sox === "" || post === null) return;
    dispatch(patchPost({ message: sox, postId: post._id }));
    navigate("/posts");
    setSox("");
  };

  const handleSoxUpdate = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setSox(value);
  };

  const handlePost = () => {
    switch (post) {
      case null:
        return <div></div>;
      default:
        const { message } = post;
        if (!sox && !uploadedSox) handleClick(message);
        return (
          <div className="message-container input-field">
            <textarea
              id="textarea1"
              className="materialize-textarea white-text"
              value={sox}
              onChange={handleSoxUpdate}
              placeholder="Message"
              name={sox}
            ></textarea>
            <button className="post-btn" onClick={handleSoxPatch}>
              Upload
            </button>
          </div>
        );
    }
  };
  return handlePost();
};

export default EditPost;
// to={sox !== "" && "/posts"}>
