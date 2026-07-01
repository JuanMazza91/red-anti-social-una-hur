import { useEffect, useState } from "react";
import { obtenerPosts } from "../api/PostApi"; // Asegúrate de ajustar la ruta de tu función
import type { Post } from "../types/Post";
import PostCard from "./PostCard";
import AsideNavCard from "./AsideNavCard";
import AsideNoticias from "./AsideNoticias";
import ModalPublication from "./ModalPublication";

function PostsHome() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);

  const limpiarDatos = (data: any): Post[] => {
    if (Array.isArray(data)) return data;
    return data?.posts ?? data?.data ?? [];
  };

  const cargarPosts = async () => {
    console.log("🍌🍌🍌 cargarPosts EJECUTÁNDOSE 🍌🍌🍌");
    try {
      setCargando(true);
      console.log("🔄 Solicitando posts al servidor...");
      const data = await obtenerPosts();
      console.log("📦 Respuesta del servidor:", data);
      const postsLimpios = limpiarDatos(data);
      console.log("✅ Posts después de limpiar:", postsLimpios);
      console.log("📊 Cantidad de posts:", postsLimpios.length);
      setPosts(postsLimpios);
      setError(null);
    } catch (error: any) {
      console.error("❌ Error en cargarPosts:", error);
      setError(error.message || "Error al cargar los posts");
    } finally {
      setCargando(false);
      console.log("🏁 cargarPosts TERMINADO");
    }
  };
  // En el useEffect
  useEffect(() => {

    cargarPosts();
  }, []);

  const handleUpdatePost = (postActualizado: Post) => {
    setPosts((postsAnteriores) =>
      postsAnteriores.map((p) =>
        p._id === postActualizado._id ? postActualizado : p,
      ),
    );
  };

  const handleDeletePost = (postId: string) => {
    setPosts((postsAnteriores) =>
      postsAnteriores.filter((p) => p._id !== postId)
    );
  };

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
            <ModalPublication
              show={showModal}
              handleClose={() => {
                console.log("🟡 Cerrando modal");
                setShowModal(false);
              }}
              onPostCreated={() => {
                console.log("🟢 onPostCreated llamado desde el modal");
                cargarPosts();
              }}
            />
            {posts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                onUpdatePost={handleUpdatePost}
                onDeletePost={handleDeletePost}
              />
            ))}
          </main>

          {/* COLUMNA DERECHA: Noticias / Info Secundaria */}

          <aside
            className="col-md-3 sticky-top d-none d-md-block"
            style={{ top: "80px", height: "fit-content" }}
          >
            {/* SECCIÓN NUEVA: Nosotros */}
            <div
              className="card p-3 border border-2 border-dark rounded-0 "
              style={{ background: "#F5F5DC" }}
            >
              <h5 className="fw-bold text-dark text-center">🐵 Nosotros 🐵</h5>
              <hr className="my-2" />
              <p className="small text-muted mb-0">
                UnaHur-Anti Social Net es el refugio digital para aquellos que
                prefieren los árboles a las oficinas. Acá solo hablamos idioma
                mono. Sin algoritmos, solo instinto.
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
