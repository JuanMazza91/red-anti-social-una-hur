import type {Tag, User, Comment} from "./Index"



export type PostImage = {
  _id: string;
  url: string;
}

export type Post = {
  _id: string;
  texto: string;
  imagenes?: PostImage[];
  autor:User;
  tags?: Tag[];
  comentarios?: Comment[];
  bananos: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type PostCardProps = {
  post: Post;
  onUpdatePost: (updatedPost: Post) => void; // 🍌 Agregamos la prop para actualizar el post en el feed
};
