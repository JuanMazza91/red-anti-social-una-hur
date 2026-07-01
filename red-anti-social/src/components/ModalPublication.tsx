import { useState, useEffect } from 'react';
import { Modal, Button, Form, Badge } from 'react-bootstrap';
import { obtenerTags } from '../api/TagApi';
import type { Tag } from "../types/Index";
import { useAuth } from "../context/LoginContext";
import { crearPost } from "../api/PostApi";

interface ModalPublicationProps {
  show: boolean;
  handleClose: () => void;
  onPostCreated?: () =>void; 
}

const ModalPublication: React.FC<ModalPublicationProps> = ({ show, handleClose, onPostCreated }) => {
  // Extraemos el usuario logueado y su token desde tu LoginContext
  const { usuarioActual } = useAuth();

  const [texto, setTexto] = useState('');
  const [imagenes, setImagenes] = useState<string[]>(['']);
  const [allTags, setAllTags] = useState<Tag[]>([]); // Traídos del backend
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]); // Seleccionados por el usuario
  
  // Estados de control para la UI
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 1. Traer las etiquetas de la base de datos al montar el componente
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

  // Manejo de cambios en los inputs de imágenes
  const handleImageChange = (index: number, value: string) => {
    const nuevasImagenes = [...imagenes];
    nuevasImagenes[index] = value;
    setImagenes(nuevasImagenes);
  };

  // Agregar un nuevo casillero para otra imagen
  const handleAddImageField = () => {
    setImagenes([...imagenes, '']);
  };

  // Remover un casillero de imagen específico
  const handleRemoveImageField = (index: number) => {
    const nuevasImagenes = imagenes.filter((_, i) => i !== index);
    setImagenes(nuevasImagenes.length ? nuevasImagenes : ['']);
  };

  // Manejo de selección de Tags desde el Select (Corregido a HTMLSelectElement para TS)
  const handleTagSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const tagId = e.target.value;
    if (!tagId) return;

    const tagEncontrado = allTags.find(t => t._id === tagId);
    if (tagEncontrado && !selectedTags.some(t => t._id === tagId)) {
      setSelectedTags([...selectedTags, tagEncontrado]);
    }
    e.target.value = ''; // Resetea el selector
  };

  // Quitar una etiqueta seleccionada
  const handleRemoveTag = (tagId: string) => {
    setSelectedTags(selectedTags.filter(t => t._id !== tagId));
  };

  // Guardar publicación de forma asíncrona conectando con tu PostApi
const handlePublicar = async () => {
  setError(null);
  setLoading(true);
  
  try {
    const urlsValidas = imagenes.filter(url => url.trim() !== '');
    const tagsIds = selectedTags.map(t => t._id);

    const payload = {
      texto,
      autor: usuarioActual?._id || "", 
      imagenes: urlsValidas,
      tags: tagsIds,
    };
    
    console.log("📤 Enviando publicación:", payload);

    const postCreado = await crearPost(payload, usuarioActual?._id);
    console.log("✅ Post creado exitosamente:", postCreado);
    
    setTexto('');
    setImagenes(['']);
    setSelectedTags([]);
    setError(null);
    
    handleClose();
    
    
    console.log("🔍 onPostCreated existe?:", !!onPostCreated);
    console.log("🔍 onPostCreated es función?:", typeof onPostCreated);
    
    if (onPostCreated) {
      console.log("🔄 Ejecutando onPostCreated AHORA...");
      onPostCreated(); // Ejecutar inmediatamente sin setTimeout
      console.log("✅ onPostCreated ejecutado");
    } else {
      console.log("❌ onPostCreated es undefined o null");
    }
    
  } catch (err: any) {
    console.error("❌ Error al publicar:", err);
    setError(err?.message || "Hubo un error al lanzar tu huella en la selva.");
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
      style={{ fontFamily: 'sans-serif' }}
    >
      {/* Encabezado */}
      <Modal.Header closeButton style={{ backgroundColor: "#3b6934", color: "#ffe245" }} className="border border-bottom-0">
        <Modal.Title className="fs-5 fw-bold w-100 text-center text-uppercase tracking-wide">
          NUEVA HUELLA
        </Modal.Title>
      </Modal.Header>

      {/* Cuerpo del Modal */}
      <Modal.Body style={{ backgroundColor: '#ffffff' }} className="px-4">
        
        {/* Campo Texto de la publicación */}
        <Form.Group className="mb-3">
          <Form.Label className="fw-bold" style={{ color: '#524700' }}>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder='¿Qué está pasando en la selva?'
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            className="border border-1 border-dark shadow-none"
            style={{ background: "#F5F5DC", color: '#333' }}
            disabled={loading}
          />
        </Form.Group>

        {/* Sección de URLs de Imágenes Dinámicas */}
        <Form.Group className="mb-3">
          <Form.Label className="fw-bold d-flex justify-content-between align-items-center" style={{ color: '#524700' }}>
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
                <Button variant="outline-danger" onClick={() => handleRemoveImageField(index)} disabled={loading}>
                  🗑️
                </Button>
              )}
            </div>
          ))}
        </Form.Group>

        {/* Sección Dinámica de Selección de Etiquetas */}
        <Form.Group className="mb-3">
          <Form.Label className="fw-bold" style={{ color: '#524700' }}>Etiquetas (Tags)</Form.Label>
          <Form.Select 
            onChange={handleTagSelect}
            className="border border-1 border-dark shadow-none mb-2"
            style={{ background: "#F5F5DC" }}
            defaultValue=""
            disabled={loading}
          >
            <option value="" disabled>Seleccioná etiquetas de la base de datos...</option>
            {allTags.map(tag => (
              <option key={tag._id} value={tag._id}>{tag.nombre}</option>
            ))}
          </Form.Select>

          {/* Visualización de Tags seleccionados estilo Chips/Badges */}
          <div className="d-flex flex-wrap gap-2 mt-2">
            {selectedTags.map(tag => (
              <Badge 
                key={tag._id} 
                bg="dark" 
                className="p-2 fs-6 rounded-pill d-flex align-items-center gap-2"
                style={{ color: '#ffe245', cursor: 'pointer' }}
                onClick={() => !loading && handleRemoveTag(tag._id)}
              >
                #{tag.nombre} <span style={{ fontSize: '12px', color: '#ff4d4d' }}>✕</span>
              </Badge>
            ))}
          </div>
        </Form.Group>

        {/* Banner dinámico de errores en caso de fallas de backend */}
        {error && <div className="text-danger small fw-bold text-center mb-2">⚠️ {error}</div>}

        {/* Botones de Acción Inferiores */}
        <div className="d-flex gap-3 mt-4 mb-2">
          <Button 
            variant="light" 
            onClick={handleClose} 
            className="btn w-50 rounded-2 border border-2 border-dark font-headline"
            style={{ backgroundColor: "#f3f3bc" ,fontWeight: "bold"}}
            disabled={loading}
          >
            CANCELAR
          </Button>
          <Button 
            onClick={handlePublicar} 
            className="btn w-50 rounded-2 border border-2 border-dark font-headline bold"
            style={{ backgroundColor: "#ffe245" , color:"#000000" ,fontWeight: "bold"}}
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