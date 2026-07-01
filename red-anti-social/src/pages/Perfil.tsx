import { Container, Row, Col, Button } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";

import { useAuth } from "../context/LoginContext";
import { useUserPosts } from "../hooks/useUserPosts";

import { Sidebar } from "../components/Sidebar";
import PostCard from "../components/PostCard";

import type { Post } from "../types/Index";

import {
  PiSealCheck,
  PiMapPinFill,
  PiSparkle,
  PiBroadcast,
  PiUsers,
  PiUserCheck,
} from "react-icons/pi";

import "../style/Perfil.css";

export function Perfil() {
  const navigate = useNavigate();

  const { usuarioActual: user, cargando: authLoading } = useAuth();

  const {
    misPosts,
    setMisPosts,
    error,
    loading: perfilLoading,
  } = useUserPosts(authLoading ? undefined : user?._id);

  const handleUpdatePost = (updatedPost: Post) => {
    setMisPosts((prevPosts) =>
      prevPosts.map((p) => (p._id === updatedPost._id ? updatedPost : p)),
    );
  };

  if (authLoading || perfilLoading) {
    return null;
  }

  if (error || !user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Container fluid className="perfil-container">
      <div className="perfil-inner">
        <Row className="g-4">
          {/* --- SIDEBAR --- */}
          <Col xs={12} lg={4} xl={3}>
            <Sidebar />
          </Col>

          {/* --- CONTENIDO PRINCIPAL --- */}
          <Col xs={12} lg={8} xl={9}>
            {/* --- HEADER --- */}
            <section className="perfil-header">
              <Row className="g-4 align-items-center">
                {/* --- AVATAR --- */}
                <Col xs={12} lg={3} className="text-center">
                  <div className="perfil-avatar-wrapper">
                    <div className="perfil-avatar">{/* AGREGAR AVATAR */}</div>
                    <div className="perfil-badge">
                      <PiSealCheck />
                    </div>
                  </div>
                </Col>

                {/* --- USER INFO --- */}
                <Col xs={12} lg={9}>
                  <Row className="align-items-center g-3">
                    <Col>
                      <h1 className="perfil-nickname">
                        {user.nickname || "Monkey"}
                      </h1>
                      <p className="perfil-location">
                        <PiMapPinFill />
                        {/* AGREGAR UBICACION */}
                      </p>
                    </Col>

                    {/* --- BOTÓN --- */}
                    <Col xs={12} md="auto">
                      <Button
                        className="perfil-btn"
                        onClick={() => navigate("/crear-post")}
                      >
                        OOK OOK!
                      </Button>
                    </Col>
                  </Row>

                  {/* --- ESTADÍSTICAS --- */}
                  <Row className="g-3 perfil-stats">
                    <Col xs={6} xl={3}>
                      <div className="stat">
                        <PiSparkle />
                        <strong>420</strong>
                        <span>Bananas</span>
                      </div>
                    </Col>

                    <Col xs={6} xl={3}>
                      <div className="stat">
                        <PiBroadcast />
                        <strong>{misPosts?.length || 0}</strong>
                        <span>Ooks</span>
                      </div>
                    </Col>

                    <Col xs={6} xl={3}>
                      <div className="stat">
                        <PiUsers />
                        <strong>{user.seguidores?.length || 0}</strong>
                        <span>Seguidores</span>
                      </div>
                    </Col>

                    <Col xs={6} xl={3}>
                      <div className="stat">
                        <PiUserCheck />
                        <strong>{user.seguidos?.length || 0}</strong>
                        <span>Seguidos</span>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </section>

            {/* --- POSTS --- */}
            <div className="perfil-posts-wrapper">
              <section className="perfil-posts">
                <div className="perfil-contenido-compacto">
                  <header className="perfil-posts-header">
                    <h2>MIS HUELLAS</h2>
                    <div className="perfil-divider" />
                  </header>

                  {!misPosts || misPosts.length === 0 ? (
                    <div className="perfil-empty">
                      <div className="perfil-empty-icon">🌴🐒</div>
                      <h3>¡Silencio en la copa del árbol!</h3>
                      <p>Todavía no has lanzado ningún Ook.</p>
                      <Button
                        className="perfil-btn"
                        onClick={() => navigate("/crear-post")}
                      >
                        Crear mi primer Ook
                      </Button>
                    </div>
                  ) : (
                    <div className="d-flex flex-column gap-4">
                      {misPosts.map((post) => (
                        <PostCard
                          key={post._id}
                          post={post}
                          onUpdatePost={handleUpdatePost}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </section>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
