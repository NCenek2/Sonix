import { Connection } from 'mongoose';
import { UsersSchema } from 'src/schemas/users.schema';

export const usersProviders = [
  {
    provide: 'USER_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('User', UsersSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
