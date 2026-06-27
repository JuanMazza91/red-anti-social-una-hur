import { useEffect, useState } from "react";
import { obtenerPosts } from "../api/PostApi"; // Asegúrate de ajustar la ruta de tu función
import type { Post } from "../types/Post";
import PostCard from "./PostCard";

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

        // Si data es un array, usa data. Si no, busca en data.posts o data.data. Si todo falla, usa []
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
      {/* Estructura principal de 3 columnas (ejemplo usando clases estándar de Bootstrap) */}
      <div className="container mt-4">
        <div className="row">
          {/* COLUMNA IZQUIERDA: Etiquetas */}
          <aside className="col-md-3">
            <div className="card p-3 sticky-top" style={{ top: "80px" }}>
              <h5>Etiquetas populares</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="#tech" className="text-decoration-none">
                    #TypeScript
                  </a>
                </li>
                <li>
                  <a href="#react" className="text-decoration-none">
                    #React
                  </a>
                </li>
                <li>
                  <a href="#mongoose" className="text-decoration-none">
                    #Mongoose
                  </a>
                </li>
              </ul>
            </div>
          </aside>

          {/* COLUMNA CENTRAL: Feed de Posts */}
          <main className="col-md-6">

            {cargando && <p>Cargando publicaciones...</p>}
            {error && <div className="alert alert-danger">{error}</div>}

            {/* Si no hay posts guardados todavía */}
            {!cargando && posts.length === 0 && (
              <p>No hay posts para mostrar.</p>
            )}

            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </main>

          {/* COLUMNA DERECHA: Noticias / Info Secundaria */}
          <aside className="col-md-3">
            <div className="card p-3 sticky-top" style={{ top: "80px" }}>
              <h5>Noticias de interés</h5>
              <hr />
              <div className="mb-2">
                <h6>Nueva actualización de React 19</h6>
                <p className="small text-muted">
                  Ya están disponibles las nuevas características del
                  framework...
                </p>
              </div>
              <div className="mb-2">
                <h6>Tendencias IT 2026</h6>
                <p className="small text-muted">
                  Mongoose y TypeScript siguen liderando el ecosistema Node...
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default PostsHome;
