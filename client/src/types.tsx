export type PostType = {
  _id: string;
  posterId: string;
  message: string;
  date: string;
  posterName: string;
  likes: string[];
  dislikes: string[];
  parentId: string;
};

export type UserType = {
  _id: string;
  googleId: string;
  name: string;
  __v: number;
};
