import { Connection } from 'mongoose';
import { PostsSchema } from 'src/schemas/posts.schema';

export const postsProviders = [
  {
    provide: 'POST_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Post', PostsSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
