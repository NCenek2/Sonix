import React from "react";
import { reactionPost, deletePost } from "../../reducers/postsReducer";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { editPost } from "../../reducers/postReducer";

const PostOptions = ({ postId, posterId, likes, dislikes }) => {
  const {
    data: { _id: userId },
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handlePost = () => {
    dispatch(editPost(postId));
  };

  const handleDelete = () => {
    dispatch(deletePost(postId));
  };

  const likedStyle = likes.includes(userId)
    ? {
        color: "blue",
      }
    : null;
  const dislikedStyle = dislikes.includes(userId)
    ? {
        color: "red",
      }
    : null;

  const handleUserOptions = () => {
    if (posterId == userId) {
      return (
        <React.Fragment>
          <Link className="white-text" to={"/editPost"}>
            <i
              className="material-icons color-green"
              onClick={() => handlePost()}
            >
              edit
            </i>
          </Link>

          <i
            className="material-icons"
            // style={dislikes && userId in dislikes && likedStyle}
            onClick={() => {
              handleDelete();
            }}
          >
            delete
          </i>
        </React.Fragment>
      );
    }
  };

  const handleReaction = (kind) => {
    let output = {
      postId,
      userId,
      kind,
    };
    dispatch(reactionPost(output));
  };

  return (
    <div className="post-icons">
      <i
        className="material-icons"
        style={likedStyle}
        onClick={() => handleReaction("like")}
      >
        thumb_up
      </i>
      <i
        className="material-icons"
        style={dislikedStyle}
        onClick={() => handleReaction("dislike")}
      >
        thumb_down
      </i>
      {handleUserOptions()}
    </div>
  );
};

export default PostOptions;
