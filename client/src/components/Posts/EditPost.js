import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { patchPost } from "../../reducers/postReducer";
import { readPosts } from "../../reducers/postsReducer";
import $ from "jquery";
import M from "materialize-css";

const EditPost = () => {
  const { post } = useSelector((state) => state.post);
  const [sox, setSox] = React.useState("");
  const [uploadedSox, setUploadedSox] = React.useState(false);

  React.useEffect(() => {
    if (uploadedSox) {
      M.textareaAutoResize($("#textarea1"));
    }
  }, [uploadedSox]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = (msg) => {
    if (sox == "") {
      setSox(msg);
      setUploadedSox(true);
    }
  };

  const handleSoxSend = () => {
    if (sox === "") return;
    dispatch(patchPost({ message: sox, postId: post._id }));
    navigate("/posts");
    dispatch(readPosts());
    setSox("");
  };

  const handleSoxUpdate = (e) => {
    const { value } = e.target;
    setSox(value);
  };

  const handlePost = () => {
    switch (post) {
      case null:
        return <div></div>;
      case false:
        return <div>Cant Find Post</div>;
      default:
        const { message } = post;
        if (!sox && !uploadedSox) handleClick(message);
        return (
          <div className="message-container input-field">
            <textarea
              id="textarea1"
              className="materialize-textarea white-text"
              value={sox}
              type="text"
              onChange={handleSoxUpdate}
              placeholder="Message"
              name={sox}
            ></textarea>
            <button className="post-btn" onClick={() => handleSoxSend()}>
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
