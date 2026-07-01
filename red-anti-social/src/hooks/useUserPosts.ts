import { useState, useEffect } from "react";
import { obtenerPosts } from "../api/PostApi";
import type { Post } from "../types/Index";

export function useUserPosts(usuarioId: string | undefined) {
  const [misPosts, setMisPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Si no hay ID de usuario (porque está cargando la sesión), no hacemos nada todavía
    if (!usuarioId) {
      setLoading(false);
      return;
    }

    const cargarYFiltrar = async () => {
      try {
        setLoading(true);
        const data = await obtenerPosts();

        // Limpiamos los datos de la API igual que en el Home
        const postsLimpios = Array.isArray(data)
          ? data
          : ((data as Record<string, unknown>)?.posts ??
            (data as Record<string, unknown>)?.data ??
            []);

        // 🍌 Filtramos para quedarnos solo con los del chimpancé actual
        const filtrados = (postsLimpios as Post[]).filter(
          (post: Post) => post.autor && post.autor._id === usuarioId,
        );

        setMisPosts(filtrados);
        setError(null);
      } catch (err: unknown) {
        console.error("Error en useUserPosts:", err);
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Error al cargar los posts del usuario";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    cargarYFiltrar();
  }, [usuarioId]); // 🍌 Se vuelve a ejecutar si cambia el usuarioId

  // Retornamos todo lo necesario, incluyendo setMisPosts para que las vistas puedan actualizarse en tiempo real
  return { misPosts, setMisPosts, loading, error };
}
