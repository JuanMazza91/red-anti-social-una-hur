import type {Post} from "../types/Post"

const API_URL = "http://localhost:3000/posts";

export async function obtenerPosts(): Promise<Post[]> {
  const respuesta = await fetch(API_URL);

  if (!respuesta.ok) {
    throw new Error("No se pudieron obtener los posts");
  }

  const posts: Post[] = await respuesta.json();

  return posts;
}
