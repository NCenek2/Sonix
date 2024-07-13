import {
  Controller,
  Get,
  HttpStatus,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleOauthGuard } from './google.oauth.guard';
import { Public } from './public.decorator';
import { Request, Response } from 'express';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Get('auth/google')
  @UseGuards(GoogleOauthGuard)
  async googleAuth() {}

  @Public()
  @Get('auth/google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(@Res() res: Response) {
    return res.status(HttpStatus.FOUND).redirect('/posts');
  }

  @Get('api/logout')
  logout(@Req() req: Request, @Res() res: Response) {
    this.authService.logout(req);
    return res.status(HttpStatus.OK).redirect('/');
  }
}
