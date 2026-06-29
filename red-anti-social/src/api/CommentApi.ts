const API_URL = "http://localhost:3000/comentarios";

export const crearComentario = async (
  contenido: string,
  autor: string,
  post: string
) => {
  const response = await fetch(
    API_URL,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contenido,
        autor,
        post,
      }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Error backend:", errorData);
    throw new Error("Error al crear comentario");
  }

  return response.json();
};