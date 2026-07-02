import { useState, useEffect, type Dispatch, type SetStateAction } from "react";
import { obtenerPosts } from "../api/PostApi";
import type { Post } from "../types/Index";

interface ApiResponse {
  posts?: Post[];
  data?: Post[];
}

export function useUserPosts(usuarioId: string | undefined): {
  misPosts: Post[];
  setMisPosts: Dispatch<SetStateAction<Post[]>>;
  loading: boolean;
  error: string | null;
} {
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
        const data = (await obtenerPosts()) as Post[] | ApiResponse | undefined;

        let postsLimpios: Post[] = [];
        if (Array.isArray(data)) {
          postsLimpios = data;
        } else if (data) {
          postsLimpios = data.posts ?? data.data ?? [];
        }

        const filtrados = postsLimpios.filter(
          (post) => post.autor && post.autor._id === usuarioId,
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
