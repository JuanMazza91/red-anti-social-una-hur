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


export const darBananoAlPost = async (postId: string, usuarioId: string): Promise<string[]> => {
  const res = await fetch(`${API_URL}/${postId}/banano`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", "x-usuario-id": usuarioId }
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Error al dar banano 🍌');
  return data.bananos;
};