const mongoose = require("mongoose");
const Post = mongoose.model("posts");
const requireLogin = require("../middlewares/requireLogin");

module.exports = (app) => {
  app.get("/api/sox/post/view/:postId", requireLogin, async (req, res) => {
    const post = await Post.findById(req.params.postId);
    // console.log(post);
    res.send(post);
  });

  app.get("/api/sox/post/edit/:postId", requireLogin, async (req, res) => {
    const post = await Post.findById(req.params.postId);
    // console.log(post);
    res.send(post);
  });

  app.put("/api/sox/post/patch", requireLogin, async (req, res) => {
    const { message, postId } = req.body;
    const post = await Post.findById(postId);
    post.message = message;
    post.date = new Date().toISOString();
    // console.log(post, "patch");
    await post.save();
    res.send(post);
  });

  app.post("/api/sox/create", requireLogin, async (req, res) => {
    let post = await new Post({
      posterId: req.user.id,
      message: req.body.sox,
      date: new Date().toISOString(),
      posterName: req.user.name,
    }).save();
    res.send(post);
  });

  app.get("/api/sox/read", requireLogin, async (req, res) => {
    let posts = await Post.find();
    res.send(posts);
  });

  app.patch("/api/sox/like", requireLogin, async (req, res) => {
    console.log("THIS IS A LIKE");
    const { userId, postId } = req.body;
    let isLiked = await Post.findOne({
      $and: [{ _id: postId }, { likes: { $in: [userId] } }],
    });
    let isDisliked = await Post.findOne({
      $and: [{ _id: postId }, { dislikes: { $in: [userId] } }],
    });

    if (isDisliked) {
      await Post.updateOne({ _id: postId }, { $pull: { dislikes: userId } }); // await post.save();
    }
    if (isLiked) {
      await Post.updateOne({ _id: postId }, { $pull: { likes: userId } }); // await post.save();
    } else {
      await Post.updateOne({ _id: postId }, { $push: { likes: userId } }); // await post.save();
    }

    let posts = await Post.find();
    console.log(posts);
    res.send(posts);
  });

  app.patch("/api/sox/dislike", requireLogin, async (req, res) => {
    console.log("THIS IS A DISLIKE");
    const { userId, postId } = req.body;
    let isLiked = await Post.findOne({
      $and: [{ _id: postId }, { likes: { $in: [userId] } }],
    });
    let isDisliked = await Post.findOne({
      $and: [{ _id: postId }, { dislikes: { $in: [userId] } }],
    });

    if (isLiked) {
      await Post.updateOne({ _id: postId }, { $pull: { likes: userId } }); // await post.save();
    }
    if (isDisliked) {
      await Post.updateOne({ _id: postId }, { $pull: { dislikes: userId } }); // await post.save();
    } else {
      await Post.updateOne({ _id: postId }, { $push: { dislikes: userId } }); // await post.save();
    }

    let posts = await Post.find();
    console.log(posts);
    res.send(posts);
  });

  app.delete("/api/sox/delete", requireLogin, async (req, res) => {
    await Post.findByIdAndDelete(req.body.soxId);
    let post = await Post.find();
    res.send(post);
  });
};
