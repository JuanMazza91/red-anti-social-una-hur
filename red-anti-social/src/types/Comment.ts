import type {User,Post} from "./Index"

export type Comment ={
    contenido: string
    autor: User;
    post: Post;
    visible: boolean;
}
