import { ConfigService } from '@nestjs/config';
import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (
      configService: ConfigService,
    ): Promise<typeof mongoose> => {
      const MONGO_URI = configService.get<string>('MONGO_URI');
      return mongoose.connect(MONGO_URI);
    },
    inject: [ConfigService],
  },
];
