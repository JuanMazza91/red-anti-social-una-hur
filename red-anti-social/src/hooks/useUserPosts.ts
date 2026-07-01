import { useState, useEffect } from "react";
import { obtenerPosts } from "../api/PostApi";
import type { Post } from "../types/Index";

export function useUserPosts(usuarioId: string | undefined) {
  const [misPosts, setMisPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!usuarioId) {
      setLoading(false);
      return;
    }

    const cargarYFiltrar = async () => {
      try {
        setLoading(true);
        const data = await obtenerPosts();

        const postsLimpios = Array.isArray(data)
          ? data
          : ((data as Record<string, unknown>)?.posts ??
            (data as Record<string, unknown>)?.data ??
            []);

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
  }, [usuarioId]);

  return { misPosts, setMisPosts, loading, error };
}
