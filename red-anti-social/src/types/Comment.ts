import type { User, Post } from "./Index";

export type Comment = {
  _id: string;
  contenido: string;
  autor: User;
  post: Post | string;
  visible: boolean;
  createdAt: string;
  updatedAt?: string;
};
