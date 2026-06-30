import { useEffect, useState } from "react";
import { obtenerPostsDeUsuario } from "../services/PostService";
import type { Post } from "../types/Index";

export function useUserPosts(userId: string | undefined) {
  const [misPosts, setMisPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let activo = true;

    const cargar = async () => {
      if (!userId) {
        setMisPosts([]);
        setLoading(false);
        setError(null);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const posts = await obtenerPostsDeUsuario(userId);

        if (activo) {
          setMisPosts(posts);
        }
      } catch (err) {
        if (!activo) return;
        setError(err instanceof Error ? err.message : "Error inesperado");
      } finally {
        if (activo) {
          setLoading(false);
        }
      }
    };

    void cargar();

    return () => {
      activo = false;
    };
  }, [userId]);

  return { misPosts, setMisPosts, loading, error };
}
