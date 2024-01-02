import React from "react";
import { reactionPost, deletePost } from "../../reducers/postsReducer";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { editPost } from "../../reducers/postReducer";
import { PostType, UserType } from "../../types";
import { useAppDispatch, RootState } from "../../reducers";

const PostOptions = ({
  _id: postId,
  posterId,
  likes,
  dislikes,
}: Partial<PostType>) => {
  const { data } = useSelector((state: RootState) => state.auth);
  const userId = (data as UserType)?._id;
  const dispatch = useAppDispatch();

  const handlePost = () => {
    if (!postId) return;
    dispatch(editPost(postId));
  };

  const handleDelete = () => {
    dispatch(deletePost());
  };

  const likedStyle =
    likes !== undefined && likes.includes(userId)
      ? {
          color: "blue",
        }
      : null;
  const dislikedStyle =
    dislikes !== undefined && dislikes.includes(userId)
      ? {
          color: "red",
        }
      : null;

  const handleUserOptions = () => {
    if (posterId == userId) {
      return (
        <React.Fragment>
          <Link className="white-text" to={"/editPost"}>
            <i className="material-icons color-green" onClick={handlePost}>
              edit
            </i>
          </Link>

          <i
            className="material-icons"
            // style={dislikes && userId in dislikes && likedStyle}
            onClick={handleDelete}
          >
            delete
          </i>
        </React.Fragment>
      );
    }
  };

  const handleReaction = (kind: string) => {
    if (postId === undefined) return;
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
        style={likedStyle ?? {}}
        onClick={() => handleReaction("like")}
      >
        thumb_up
      </i>
      <i
        className="material-icons"
        style={dislikedStyle ?? {}}
        onClick={() => handleReaction("dislike")}
      >
        thumb_down
      </i>
      {handleUserOptions()}
    </div>
  );
};

export default PostOptions;
