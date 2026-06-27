import type {Tag, User} from "./Index"



export type PostImage = {
  _id: string;
  url: string;
}

export type Post = {
  _id: string;
  texto: string;
  imagenes?: PostImage[];
  autor:User;
  tag?: Tag[];
  createdAt: Date;
  updatedAt: Date;
}
