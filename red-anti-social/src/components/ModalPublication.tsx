import { useState, useEffect } from "react";
import { Modal, Button, Form, Badge } from "react-bootstrap";
import { obtenerTags } from "../api/TagApi";
import type { Tag } from "../types/Index";
import { useAuth } from "../context/LoginContext";
import { crearPost } from "../api/PostApi";

interface ModalPublicationProps {
  show: boolean;
  handleClose: () => void;
  onPostCreated: () => void;
}

const ModalPublication: React.FC<ModalPublicationProps> = ({
  show,
  handleClose,
  onPostCreated,
}) => {
  const { usuarioActual } = useAuth();

  const [texto, setTexto] = useState("");
  const [imagenes, setImagenes] = useState<string[]>([""]);
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const data = await obtenerTags();
        setAllTags(data);
      } catch (error) {
        console.error("Error cargando etiquetas de la manada:", error);
      }
    };

    if (show) fetchTags();
  }, [show]);

  const handleImageChange = (index: number, value: string) => {
    const nuevasImagenes = [...imagenes];
    nuevasImagenes[index] = value;
    setImagenes(nuevasImagenes);
  };

  const handleAddImageField = () => {
    setImagenes([...imagenes, ""]);
  };

  const handleRemoveImageField = (index: number) => {
    const nuevasImagenes = imagenes.filter((_, i) => i !== index);
    setImagenes(nuevasImagenes.length ? nuevasImagenes : [""]);
  };

  const handleTagSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const tagId = e.target.value;
    if (!tagId) return;

    const tagEncontrado = allTags.find((t) => t._id === tagId);
    if (tagEncontrado && !selectedTags.some((t) => t._id === tagId)) {
      setSelectedTags([...selectedTags, tagEncontrado]);
    }
    e.target.value = "";
  };

  const handleRemoveTag = (tagId: string) => {
    setSelectedTags(selectedTags.filter((t) => t._id !== tagId));
  };

  const handlePublicar = async () => {
    setError(null);
    setLoading(true);

    try {
      const urlsValidas = imagenes.filter((url) => url.trim() !== "");
      const tagsIds = selectedTags.map((t) => t._id);

      const payload = {
        texto,
        autor: usuarioActual?._id || "",
        imagenes: urlsValidas,
        tags: tagsIds,
      };
      const postCreado = await crearPost(payload, usuarioActual?._id);
      console.log("✅ Post creado exitosamente:", postCreado);

      setTexto("");
      setImagenes([""]);
      setSelectedTags([]);
      setError(null);
      handleClose();

      if (onPostCreated) {
        onPostCreated();
      }
    } catch (err: any) {
      setError(
        err?.message || "Hubo un error al lanzar tu huella en la selva.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      backdrop="static"
      backdropClassName="modal-blur-backdrop"
      contentClassName="border-0 shadow-lg"
      style={{ fontFamily: "sans-serif" }}
    >
      {/* Encabezado */}
      <Modal.Header
        closeButton
        style={{ backgroundColor: "#3b6934", color: "#ffe245" }}
        className="border border-bottom-0"
      >
        <Modal.Title className="fs-5 fw-bold w-100 text-center text-uppercase tracking-wide">
          NUEVA HUELLA
        </Modal.Title>
      </Modal.Header>

      {/* Cuerpo del Modal */}
      <Modal.Body style={{ backgroundColor: "#ffffff" }} className="px-4">
        {/* Campo Texto de la publicación */}
        <Form.Group className="mb-3">
          <Form.Label className="fw-bold" style={{ color: "#524700" }}>
            Descripción
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="¿Qué está pasando en la selva?"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            className="border border-1 border-dark shadow-none"
            style={{ background: "#F5F5DC", color: "#333" }}
            disabled={loading}
          />
        </Form.Group>

        {/* Sección de URLs de Imágenes Dinámicas */}
        <Form.Group className="mb-3">
          <Form.Label
            className="fw-bold d-flex justify-content-between align-items-center"
            style={{ color: "#524700" }}
          >
            Imágenes (URLs)
            <Button
              variant="link"
              size="sm"
              onClick={handleAddImageField}
              className="p-0 text-decoration-none fw-bold text-success"
              disabled={loading}
            >
              ➕ Añadir otra imagen
            </Button>
          </Form.Label>

          {imagenes.map((url, index) => (
            <div key={index} className="d-flex gap-2 mb-2">
              <Form.Control
                type="text"
                placeholder="https://ejemplo.com/imagen.jpg"
                value={url}
                onChange={(e) => handleImageChange(index, e.target.value)}
                className="border border-1 border-dark shadow-none"
                style={{ background: "#F5F5DC" }}
                disabled={loading}
              />
              {imagenes.length > 1 && (
                <Button
                  variant="outline-danger"
                  onClick={() => handleRemoveImageField(index)}
                  disabled={loading}
                >
                  🗑️
                </Button>
              )}
            </div>
          ))}
        </Form.Group>

        {/* Sección Dinámica de Selección de Etiquetas */}
        <Form.Group className="mb-3">
          <div className="d-flex flex-wrap gap-2 mb-3">
            {allTags.map((tag) => (
              <Badge
                key={tag._id}
                bg={
                  selectedTags.some((t) => t._id === tag._id)
                    ? "warning"
                    : "secondary"
                }
                className="p-2 fs-6 rounded-pill"
                style={{
                  cursor: "pointer",
                  color: selectedTags.some((t) => t._id === tag._id)
                    ? "#000"
                    : "#fff",
                }}
                onClick={() => {
                  if (!selectedTags.some((t) => t._id === tag._id)) {
                    setSelectedTags([...selectedTags, tag]);
                  } else {
                    handleRemoveTag(tag._id);
                  }
                }}
              >
                #{tag.nombre}
              </Badge>
            ))}
          </div>
        </Form.Group>

        {/* Banner dinámico de errores en caso de fallas de backend */}
        {error && (
          <div className="text-danger small fw-bold text-center mb-2">
            ⚠️ {error}
          </div>
        )}

        {/* Botones de Acción Inferiores */}
        <div className="d-flex gap-3 mt-4 mb-2">
          <Button
            variant="light"
            onClick={handleClose}
            className="btn w-50 rounded-2 border border-2 border-dark font-headline"
            style={{ backgroundColor: "#f3f3bc", fontWeight: "bold" }}
            disabled={loading}
          >
            CANCELAR
          </Button>
          <Button
            onClick={handlePublicar}
            className="btn w-50 rounded-2 border border-2 border-dark font-headline bold"
            style={{
              backgroundColor: "#ffe245",
              color: "#000000",
              fontWeight: "bold",
            }}
            disabled={loading || !texto.trim()}
          >
            {loading ? "PUBLICANDO..." : "PUBLICAR"}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalPublication;
