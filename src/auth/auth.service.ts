import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthService {
  logout(req: Request) {
    req.logOut(() => {});
  }
}
