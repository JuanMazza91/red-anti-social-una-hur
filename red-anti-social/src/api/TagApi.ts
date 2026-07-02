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


export const crearTag = async (nombreTag: string) => {
  const response = await fetch('API_URL', { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nombre: nombreTag }),
  });
  if (!response.ok) {
    throw new Error('Error al crear el tag');
  }
  return await response.json();
};