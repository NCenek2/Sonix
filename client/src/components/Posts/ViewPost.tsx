import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";

const ViewPost = () => {
  const { post } = useSelector((state: RootState) => state.post);
  const handlePost = () => {
    switch (post) {
      case null:
        return <div></div>;
      default:
        const { message, likes, dislikes, posterName } = post;
        return (
          <div className="message-container">
            <div className="single-post">
              <p>{message}</p>
              <p>Written By {posterName}</p>
              <div className="post-reactions">
                <p>Likes: {likes.length}</p>
                <p>Dislikes: {dislikes.length}</p>
              </div>
            </div>
          </div>
        );
    }
  };
  return handlePost();
};

export default ViewPost;
