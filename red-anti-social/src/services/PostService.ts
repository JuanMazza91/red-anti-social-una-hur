import type { Post } from "../types/Post";

const API_URL = "http://localhost:3000";

function perteneceAlUsuario(post: Post, userId: string) {
  return String(post.autor._id) === String(userId);
}

export async function obtenerPostsDeUsuario(userId: string): Promise<Post[]> {
  const res = await fetch(`${API_URL}/posts`);

  if (!res.ok) {
    throw new Error("No se pudieron cargar los posts");
  }

  const data = await res.json();

  const posts = data?.posts;

  if (!Array.isArray(posts)) {
    console.error("Formato inesperado de API:", data);
    return [];
  }

  return posts.filter((post: Post) => perteneceAlUsuario(post, userId));
}
