import { useEffect, useState } from "react";
import { obtenerPosts } from "../api/PostApi";
import type { Post } from "../types/Post";
import PostCard from "./PostCard";
import { Sidebar } from "./Sidebar";
import AsideNoticias from "./AsideNoticias";

function PostsHome() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState<boolean>(true);

  const handleUpdatePost = (postActualizado: Post) => {
    setPosts((postsAnteriores) =>
      postsAnteriores.map((p) =>
        p._id === postActualizado._id ? postActualizado : p,
      ),
    );
  };

  useEffect(() => {
    const cargarPublicaciones = async () => {
      try {
        const data = await obtenerPosts();
        const listaPosts: Post[] = Array.isArray(data)
          ? data
          : ((data as any)?.posts ?? (data as any)?.data ?? []);
        setPosts(listaPosts);
      } catch (error: any) {
        setError(error.message || "Error al cargar los posts");
      } finally {
        setCargando(false);
      }
    };

    cargarPublicaciones();
  }, []);

  return (
    <div className="container-home">
      <div className="container mt-4">
        <div className="row ">
          <div className="col-md-3">
            <Sidebar />
          </div>

          {/* COLUMNA CENTRAL */}
          <main className="col-md-6">
            {cargando && <p>Cargando publicaciones...</p>}
            {error && <div className="alert alert-danger">{error}</div>}

            {!cargando && posts.length === 0 && (
              <p>No hay posts para mostrar.</p>
            )}

            {posts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                onUpdatePost={handleUpdatePost}
              />
            ))}
          </main>

          <aside className="col-md-3 d-none d-md-block">
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <div
                className="card p-3 border border-2 border-dark rounded-0 mb-0"
                style={{ background: "#F5F5DC" }}
              >
                <h5 className="fw-bold text-dark text-center">
                  🐵 Nosotros 🐵
                </h5>
                <hr className="my-2" />
                <p className="small text-muted mb-0">
                  UnaHur-Anti Social Net es el refugio digital para aquellos que
                  prefieren los árboles a las oficinas. Acá solo hablamos idioma
                  mono. Sin algoritmos, solo instinto.
                </p>
              </div>
              <AsideNoticias />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default PostsHome;
