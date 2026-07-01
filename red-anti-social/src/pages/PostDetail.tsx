import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Post } from "../types/Index";
import type { Comment } from "../types/Index";
import Sidebar from "../components/Sidebar";
import AsideNoticias from "../components/AsideNoticias";
import "../style/PostDetail.css";
import { useAuth } from "../context/LoginContext";

import DetailPostCard from "../components/DetailPostCard";
import CommentSection from "../components/CommentSection";

import { obtenerPostPorId, obtenerComentariosDelPost } from "../api/PostApi";

function PostDetail() {
  const { id } = useParams();

  const [post, setPost] = useState<Post>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const { usuarioActual } = useAuth();

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        if (!id) return;

        const [postData, commentsData] = await Promise.all([
          obtenerPostPorId(id),
          obtenerComentariosDelPost(id),
        ]);

        setPost(postData);
        setComments(commentsData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, [id]);

  const handleUpdatePost = (postActualizado: Post) => {
    setPost(postActualizado);
  };

  if (loading) {
    return <p className="text-center mt-4">Cargando...</p>;
  }

  if (!post) {
    return <p className="text-center mt-4">No se encontró la publicación</p>;
  }

  return (
    <div className="container-home">
      <div className="container pt-4">
        <div className="row g-4">
          <div className="col-12 col-lg-4 col-xl-3">
            <Sidebar />
          </div>

          <main className="col-12 col-lg-8 col-xl-6 mb-5">
            <DetailPostCard post={post} onUpdatePost={handleUpdatePost} />
            <CommentSection
              comments={comments}
              postId={post._id}
              setComments={setComments}
              setPost={setPost}
              usuario={usuarioActual}
            />
          </main>

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
    </div>
  );
}

export default PostDetail;
