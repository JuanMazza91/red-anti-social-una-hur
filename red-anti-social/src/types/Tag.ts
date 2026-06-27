import type { Post } from './Post';

export type Tag = {
    _id:string;
   nombre: string;
    posts: Post[]
}
