import PostCard from "./PostCard";
import { Sidebar } from "./Sidebar";
import AsideNoticias from "./AsideNoticias";
import ModalPublication from "./ModalPublication";
import { useState } from "react";
import type { Post } from "../types/Post";

interface Props {
  posts: Post[];
  cargando: boolean;
  error: string | null;
  cargarPosts: () => void;
  onUpdatePost: (post: Post) => void;
  onDeletePost: (id: string) => void;
}

function PostsHome({ posts, cargando, error, cargarPosts, onUpdatePost, onDeletePost }: Props) {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div className="container mt-4">
      <div className="row g-4">
        <div className="col-12 col-lg-4 col-xl-3">
          <Sidebar />
        </div>

        <main className="col-12 col-lg-8 col-xl-6">
          <ModalPublication
            show={showModal}
            handleClose={() => setShowModal(false)}
            onPostCreated={cargarPosts}
          />

          {cargando && <p>Cargando publicaciones...</p>}
          {error && <div className="alert alert-danger">{error}</div>}
          {!cargando && posts.length === 0 && <p>No hay posts para mostrar.</p>}

          {posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              onUpdatePost={onUpdatePost}
              onDeletePost={onDeletePost}
            />
          ))}
        </main>

          {/* COLUMNA DERECHA: Noticias / Info Secundaria */}

          <aside
            className="col-12 col-xl-3 sticky-top d-none d-xl-block"
            style={{ top: "80px", height: "fit-content" }}
          >
            <div
              className="card p-3 border border-2 border-dark rounded-0"
              style={{ background: "#F5F5DC" }}
            >
              <h5 className="fw-bold text-dark text-center">🐵 Nosotros 🐵</h5>
              <hr className="my-2" />
              <p className="small text-muted mb-0">
                UnaHur-Anti Social Net es el refugio digital para aquellos que
                prefieren los árboles a las oficinas.
              </p>
            </div>

            <AsideNoticias />
          </aside>
        </div>
      </div>
    
  );
}

export default PostsHome;
