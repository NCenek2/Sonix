import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Post } from 'src/models/Posts';
import { DeletePostDto } from './dto/delete-post.dto';
import { ReactToPostDto } from './dto/react-to-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { PatchPostDto } from './dto/patch-post.dto';
import { Request } from 'express';

@Injectable()
export class PostsService {
  constructor(@Inject('POST_MODEL') private postModel: Model<Post>) {}

  async viewPostId(postId: string) {
    const post = await this.postModel.findById(postId);
    return post;
  }

  async editPostId(postId: string) {
    const post = await this.postModel.findById(postId);
    return post;
  }

  async patchPost(patchPostDto: PatchPostDto) {
    const { message, postId } = patchPostDto;
    const post = await this.postModel.findById(postId);
    post.message = message;
    post.date = new Date().toISOString();
    await post.save();
    const posts = await this.postModel.find();
    return posts;
  }

  async createPost(req: Request, createPostDto: CreatePostDto) {
    const { sox } = createPostDto;
    const { _id, name } = req.user;

    await new this.postModel({
      posterId: _id,
      message: sox,
      date: new Date().toISOString(),
      posterName: name,
    }).save();

    const posts = await this.postModel.find();
    return posts;
  }

  async getPosts() {
    return this.postModel.find().exec();
  }

  async likePost(reactToPostDto: ReactToPostDto) {
    const { postId: _id, userId } = reactToPostDto;
    const isLiked = await this.postModel.findOne({
      $and: [{ _id }, { likes: { $in: [userId] } }],
    });
    const isDisliked = await this.postModel.findOne({
      $and: [{ _id }, { dislikes: { $in: [userId] } }],
    });

    if (isDisliked) {
      await this.postModel.updateOne({ _id }, { $pull: { dislikes: userId } }); // await post.save();
    }
    if (isLiked) {
      await this.postModel.updateOne({ _id }, { $pull: { likes: userId } }); // await post.save();
    } else {
      await this.postModel.updateOne({ _id }, { $push: { likes: userId } }); // await post.save();
    }

    const posts = await this.postModel.find();
    return posts;
  }

  async dislikePost(reactToPostDto: ReactToPostDto) {
    const { postId: _id, userId } = reactToPostDto;
    const isLiked = await this.postModel.findOne({
      $and: [{ _id }, { likes: { $in: [userId] } }],
    });
    const isDisliked = await this.postModel.findOne({
      $and: [{ _id }, { dislikes: { $in: [userId] } }],
    });

    if (isLiked) {
      await this.postModel.updateOne({ _id }, { $pull: { likes: userId } }); // await post.save();
    }
    if (isDisliked) {
      await this.postModel.updateOne({ _id }, { $pull: { dislikes: userId } }); // await post.save();
    } else {
      await this.postModel.updateOne({ _id }, { $push: { dislikes: userId } }); // await post.save();
    }

    const posts = await this.postModel.find();
    return posts;
  }

  async deletePost(deletePostDto: DeletePostDto) {
    const { soxId } = deletePostDto;
    await this.postModel.findByIdAndDelete(soxId);

    const posts = await this.postModel.find();
    return posts;
  }
}
