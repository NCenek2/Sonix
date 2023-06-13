import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createPost } from "../../reducers/postsReducer";
const AddMessage = () => {
  const [sox, setSox] = React.useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSoxSend = async () => {
    if (sox === "") return;
    await dispatch(createPost(sox));
    navigate("/posts");
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
      <button className="post-btn" onClick={() => handleSoxSend()}>
        Upload
      </button>
    </div>
  );
};

export default AddMessage;
