import { Container, Row, Col, Button } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";

import { useAuth } from "../context/LoginContext";
import { useUserPosts } from "../hooks/useUserPosts";
import { Sidebar } from "../components/Sidebar";
import PostCard from "../components/PostCard";

import type { Post } from "../types/Index";

import {
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

  const handleDeletePost = (postId: string) => {
    setMisPosts((prevPosts) => prevPosts.filter((p) => p._id !== postId));
  };

  if (authLoading || perfilLoading) {
    return (
      <p className="text-center mt-4 text-dark font-headline fw-bold">
        Cargando perfil simiesco...
      </p>
    );
  }

  if (error || !user) {
    return <Navigate to="/login" replace />;
  }

  // calcula el rango y la ubicación según sus posts
  const obtenerDatosMono = (): { rango: string; ubicacion: string } => {
    const cantidad = misPosts?.length || 0;

    if (cantidad === 0) {
      return {
        rango: "CHIMPANCÉ NOVATO",
        ubicacion: "En el suelo juntando ramitas",
      };
    }

    if (cantidad >= 1 && cantidad <= 3) {
      return {
        rango: "GORILA DE LA SELVA",
        ubicacion: "En las ramas medias protegiendo el territorio",
      };
    }

    return {
      rango: "REY DE LA MANADA",
      ubicacion: "Copa del árbol más alto",
    };
  };

  const { rango, ubicacion } = obtenerDatosMono();

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
            <div className="columna-derecha-perfil">
              {/* --- HEADER --- */}
              <section className="perfil-header">
                <div className="perfil-header-flex">
                  {/* --- USER INFO --- */}
                  <div className="perfil-user-info">
                    <h1 className="perfil-nickname">
                      {user.nickname || "sofia"}
                    </h1>

                    <span className="sidebar-rol">{rango}</span>

                    <p className="perfil-location">
                      <PiMapPinFill /> {ubicacion}
                    </p>
                  </div>

                  {/* --- ESTADÍSTICAS --- */}
                  <div className="perfil-stats-flex">
                    <div className="stat">
                      <PiSparkle />
                      <div className="stat-info">
                        <strong>
                          {misPosts?.reduce(
                            (acumulador, post) =>
                              acumulador + (post.bananos?.length || 0),
                            0,
                          ) || 0}
                        </strong>
                        <span>Bananos</span>
                      </div>
                    </div>

                    <div className="stat">
                      <PiBroadcast />
                      <div className="stat-info">
                        <strong>{misPosts?.length || 0}</strong>
                        <span>Ooks</span>
                      </div>
                    </div>

                    <div className="stat">
                      <PiUsers />
                      <div className="stat-info">
                        <strong>{user.seguidores?.length || 0}</strong>
                        <span>Seguidores</span>
                      </div>
                    </div>

                    <div className="stat">
                      <PiUserCheck />
                      <div className="stat-info">
                        <strong>{user.seguidos?.length || 0}</strong>
                        <span>Seguidos</span>
                      </div>
                    </div>
                  </div>
                </div>
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
                        <div className="perfil-empty-icon">🦧🌴</div>
                        <h3>¡Silencio en la copa del árbol!</h3>
                        <p>Todavía no has lanzado ningún Ook.</p>
                        <Button
                          className="perfil-btn"
                          onClick={() => navigate("/crear-post")}
                        >
                          CREA TU PRIMER OOK
                        </Button>
                      </div>
                    ) : (
                      <div className="d-flex flex-column gap-4">
                        {misPosts.map((post) => (
                          <PostCard
                            key={post._id}
                            post={post}
                            onUpdatePost={handleUpdatePost}
                            onDeletePost={handleDeletePost}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </section>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
