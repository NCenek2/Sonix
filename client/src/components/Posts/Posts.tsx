import React, { useEffect, useState } from "react";
import Post from "./Post";
import { RootState, useAppDispatch } from "../../reducers";
import { useSelector } from "react-redux";
import { readPosts } from "../../reducers/postsReducer";

const Posts = () => {
  const { posts, status } = useSelector((state: RootState) => state.posts);
  const dispatch = useAppDispatch();

  const orderedPosts =
    posts && posts.slice().sort((a, b) => b.date.localeCompare(a.date));

  useEffect(() => {
    if (status === "idle") {
      dispatch(readPosts());
    }
  }, [status, dispatch]);

  return (
    <div className="posts">
      {orderedPosts &&
        (orderedPosts.length === 0
          ? ""
          : orderedPosts.map((post, index) => <Post key={index} {...post} />))}
    </div>
  );
};

export default Posts;
