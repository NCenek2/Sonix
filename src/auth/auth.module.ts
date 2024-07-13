import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { GoogleStrategy } from './google.strategy';
import { DatabaseModule } from 'src/database/database.module';
import { SessionSerializer } from './session.serializer';
import { APP_GUARD } from '@nestjs/core';
import { SessionGuard } from './session.guard';

@Module({
  imports: [UsersModule, DatabaseModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    GoogleStrategy,
    SessionSerializer,
    {
      provide: APP_GUARD,
      useClass: SessionGuard,
    },
  ],
})
export class AuthModule {}
