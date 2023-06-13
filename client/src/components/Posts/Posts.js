import React from "react";
import Post from "./Post";
import { useDispatch, useSelector } from "react-redux";
import { readPosts } from "../../reducers/postsReducer";

const Posts = () => {
  const [timeTrigger, setTimeTrigger] = React.useState(false);
  
  const { posts, status } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  const orderedPosts =
    posts && posts.slice().sort((a, b) => b.date.localeCompare(a.date));

  React.useState(() => {
    if (status === "idle") {
      dispatch(readPosts());
    }
  }, [status, dispatch]);

  React.useState(() => {
    const handleTrigger = setInterval(() => {
      setTimeTrigger((prevTrig) => !prevTrig);
    }, 60000);
    return () => clearInterval(handleTrigger);
  }, [timeTrigger]);

  return (
    <div className="posts">
      {orderedPosts &&
        (orderedPosts.length == 0
          ? ""
          : orderedPosts.map((post, index) => (
              <Post key={index} post={post} />
            )))}
    </div>
  );
};

export default Posts;
