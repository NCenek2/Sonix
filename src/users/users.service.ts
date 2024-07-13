import { Inject, Injectable, Request } from '@nestjs/common';
import { Model } from 'mongoose';
import { Profile } from 'passport-google-oauth20';
import { User } from 'src/models/User';

@Injectable()
export class UsersService {
  constructor(@Inject('USER_MODEL') private userModel: Model<User>) {}

  getCurrentUser(@Request() req: any) {
    return req.user;
  }

  getByUserName(username: string) {
    return this.userModel.findOne({ username });
  }

  getByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  getUserById(_id: string) {
    return this.userModel.findById(_id);
  }

  getUserByGoogleId(googleId: string) {
    return this.userModel.findOne({ googleId });
  }

  async createUser(profile: Profile) {
    const {
      id: googleId,
      name: { familyName, givenName },
    } = profile;

    const user: User = {
      googleId,
      name: `${givenName} ${familyName}`,
    };

    return this.userModel.create(user);
  }
}
