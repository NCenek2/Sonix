import { Controller, Get, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from 'src/auth/public.decorator';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Get('api/current_user')
  getCurrentUser(@Request() req: any) {
    return this.usersService.getCurrentUser(req);
  }
}
