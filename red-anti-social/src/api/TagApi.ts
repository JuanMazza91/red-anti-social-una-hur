import type {Tag} from "../types/Index"

const API_URL = "http://localhost:3000/tags";

export async function obtenerTags(): Promise<Tag[]> {
  const respuesta = await fetch(API_URL);
  if (!respuesta.ok) {
    throw new Error("No se pudieron obtener los Tags");
  }
  const posts: Tag[] = await respuesta.json();
  return posts;
}