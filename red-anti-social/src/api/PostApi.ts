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

export const obtenerPostPorId = async (id: string) => {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Error al obtener publicación");
  }

  return response.json();
};

export const obtenerComentariosDelPost = async (id: string) => {
  const response = await fetch(
    `${API_URL}/${id}/comentarios`
  );


  if (!response.ok) {
    throw new Error("Error al obtener comentarios");
  }

  return response.json();
};

export const obtenerImagenesDelPost = async (id: string) => {
  const response = await fetch(
    `${API_URL}/${id}/imagenes`
  );

  if (!response.ok) {
    throw new Error("Error al obtener imágenes");
  }

  return response.json();
};

