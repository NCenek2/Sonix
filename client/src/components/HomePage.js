import React from "react";

const HomePage = () => {
  return (
    <div className="homepage-container">
      <h4>About</h4>
      <p>
        Hello, welcome to Sonix. I am currently testing, my first FullStack web
        application. Users can login with Google, as of right now, this is the
        only way. Once logged in, you can post, like posts, and view individual
        posts by clicking the post title (This is harder to see on mobile as
        theres no hover). Clicking the logo will redirect you to posts if logged
        in, and to this home page if not. Please feel free to test or report
        anything buggy or make suggestions, so I can make changes and learn
        along the way.
      </p>
      <p>P.S. Please keep posts PG</p>
    </div>
  );
};

export default HomePage;
