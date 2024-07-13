export type Post = {
  posterId: string;
  message: string;
  date: string;
  posterName: string;
  likes: [string];
  dislikes: [string];
  parentId: string;
};
