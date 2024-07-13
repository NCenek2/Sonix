import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from 'src/models/User';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(user: User, done: (err: any, id: any) => void) {
    done(null, user._id); // Store user ID in session
  }

  async deserializeUser(_id: string, done: (err: any, user: any) => void) {
    const user = await this.usersService.getUserById(_id); // Fetch user from DB
    return user ? done(null, user) : done(null, null);
  }
}
