import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createPost, readPosts } from "../../reducers/postsReducer";
const AddMessage = () => {
  const [sox, setSox] = React.useState("");
  const dispatch = useDispatch();

  const handleSoxSend = () => {
    if (sox === "") return;
    dispatch(createPost(sox));
    dispatch(readPosts());
    setSox("");
  };

  const handleSoxUpdate = (e) => {
    const { value } = e.target;
    setSox(value);
  };

  return (
    <div className="message-container">
      <textarea
        id="textarea1"
        class="materialize-textarea white-text"
        value={sox}
        type="text"
        onChange={handleSoxUpdate}
        placeholder="Message"
        name={sox}
      ></textarea>
      <Link to={sox !== "" && "/posts"}>
        <button className="post-btn" onClick={() => handleSoxSend()}>
          Upload
        </button>
      </Link>
    </div>
  );
};

export default AddMessage;
