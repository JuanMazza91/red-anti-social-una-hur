import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import type { Post } from "../types/Index";
import type { Comment } from "../types/Index";
import AsideNoticias from "../components/AsideNoticias";
import { Sidebar } from "../components/Sidebar";
import { useAuth } from "../context/LoginContext";

import DetailPostCard from "../components/DetailPostCard";
import CommentSection from "../components/CommentSection";

import { obtenerPostPorId, obtenerComentariosDelPost } from "../api/PostApi";

import "../style/PostDetail.css";

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
      <div className="container mt-4 pb-5">
        <Row className="g-4">
          <Col xs={12} lg={4} xl={3}>
            <div className="sticky-top" style={{ top: "85px", zIndex: 1000 }}>
              <Sidebar />
            </div>
          </Col>

          <Col xs={12} lg={8} xl={6}>
            <DetailPostCard post={post} onUpdatePost={handleUpdatePost} />

            <CommentSection
              comments={comments}
              postId={post._id}
              setComments={setComments}
              setPost={setPost}
              usuario={usuarioActual}
            />
          </Col>

          <Col xs={12} xl={3} className="d-none d-xl-block">
            <div
              className="sticky-top"
              style={{
                top: "85px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <div
                className="card p-3 border border-2 border-dark rounded-0"
                style={{ background: "#F5F5DC" }}
              >
                <h5 className="fw-bold text-dark text-center">
                  🐵 Nosotros 🐵
                </h5>
                <hr className="my-2" />
                <p className="small text-muted mb-0">
                  UnaHur-Anti Social Net es el refugio digital para aquellos que
                  prefieren los árboles a las oficinas.
                </p>
              </div>

              <AsideNoticias />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default PostDetail;
