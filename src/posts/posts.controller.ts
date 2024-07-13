import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PatchPostDto } from './dto/patch-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { ReactToPostDto } from './dto/react-to-post.dto';
import { DeletePostDto } from './dto/delete-post.dto';
import { Request } from 'express';

@Controller('api/sox')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('post/view/:postId')
  async viewPostId(@Param('postId') postId: string) {
    return this.postsService.viewPostId(postId);
  }

  @Get('post/edit/:postId')
  async editPostId(@Param('postId') postId: string) {
    return this.postsService.editPostId(postId);
  }

  @Put('post/patch')
  async patchPost(@Body() patchPostDto: PatchPostDto) {
    return this.postsService.patchPost(patchPostDto);
  }

  @Post('create')
  async createPost(@Req() req: Request, @Body() createPostDto: CreatePostDto) {
    return this.postsService.createPost(req, createPostDto);
  }

  @Get('read')
  async getPosts() {
    return this.postsService.getPosts();
  }

  @Patch('like')
  async likePost(@Body() reactToPostDto: ReactToPostDto) {
    return this.postsService.likePost(reactToPostDto);
  }

  @Patch('dislike')
  async dislikePost(@Body() reactToPostDto: ReactToPostDto) {
    return this.postsService.dislikePost(reactToPostDto);
  }

  @Delete('delete')
  async deletePost(@Body() deletePostDto: DeletePostDto) {
    return this.postsService.deletePost(deletePostDto);
  }
}
