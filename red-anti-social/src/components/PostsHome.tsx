import { useEffect, useState } from "react";
import { obtenerPosts } from "../api/PostApi"; // Asegúrate de ajustar la ruta de tu función
import type { Post } from "../types/Post";
import PostCard from "./PostCard";
import AsideNavCard from "./AsideNavCard";
import AsideNoticias from "./AsideNoticias";

function PostsHome() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState<boolean>(true);

  // 1. Traer los posts de la base de datos al cargar la página
  useEffect(() => {
    const cargarPublicaciones = async () => {
      try {
        const data = await obtenerPosts();
        console.log("Datos recibidos:", data);

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
          {/* COLUMNA IZQUIERDA: Menú de Navegación "Red Social de Monos" */}
          <AsideNavCard />

          {/* COLUMNA CENTRAL: Feed de Posts */}
          <main className="col-md-6">
            {cargando && <p>Cargando publicaciones...</p>}
            {error && <div className="alert alert-danger">{error}</div>}

            {!cargando && posts.length === 0 && (
              <p>No hay posts para mostrar.</p>
            )}

            {posts.map((post) => {
              return <PostCard key={post._id} post={post} />;
            })}
          </main>

          {/* COLUMNA DERECHA: Noticias / Info Secundaria */}
        
          <aside className="col-md-3 sticky-top d-none d-md-block" style={{ top: "80px", height: "fit-content" }}>
            
            {/* SECCIÓN NUEVA: Nosotros */}
            <div className="card p-3 border border-2 border-dark rounded-0 " style={{ background: "#F5F5DC" }}>
              <h5 className="fw-bold text-dark text-center">🐵 Nosotros 🐵</h5>
              <hr className="my-2" />
              <p className="small text-muted mb-0">
                UnaHur-Anti Social Net es el refugio digital para aquellos que prefieren los árboles a las oficinas. Acá solo hablamos idioma mono. Sin algoritmos, solo instinto.
              </p>
            </div>

            <AsideNoticias />

          </aside>
          
        </div>
        
      </div>
    </div>
  );
}

export default PostsHome;
