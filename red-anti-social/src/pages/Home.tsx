import { useEffect, useState } from "react";
import { obtenerPosts } from "../api/PostApi";
import type { Post } from "../types/Post";
import PostsHome from "../components/PostsHome";
import Hero from "../components/Hero";
import { useSearch } from "../context/SearchContext";
import "../style/Home.css";


function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState<boolean>(true);
  const { terminoBusqueda } = useSearch();

  // 1. Filtramos los posts en tiempo real
 
  const postsFiltrados = posts.filter((post) => {
    const texto = terminoBusqueda.toLowerCase();
    const autor = post.autor?.nickname?.toLowerCase() || "";
    const tags =
      post.tags?.some((t) => t.nombre.toLowerCase().includes(texto)) || false;

    return autor.includes(texto) || tags;
  });
  const limpiarDatos = (data: any): Post[] => {
    if (Array.isArray(data)) return data;
    return data?.posts ?? data?.data ?? [];
  };

  const cargarPosts = async () => {
    try {
      setCargando(true);
      const data = await obtenerPosts();
      setPosts(limpiarDatos(data));
      setError(null);
    } catch (err: any) {
      setError(err.message || "Error al cargar los posts");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarPosts();
  }, []);

  const handleUpdatePost = (postActualizado: Post) => {
    setPosts((prev) =>
      prev.map((p) => (p._id === postActualizado._id ? postActualizado : p)),
    );
  };

  const handleDeletePost = (postId: string) => {
    setPosts((prev) => prev.filter((p) => p._id !== postId));
  };

  return (
    <div className="container-home">
      {/* Pasamos los datos al Hero si los necesita */}
      <Hero refreshPosts={cargarPosts} />

      {/* Pasamos toda la lógica y los datos a PostsHome */}
      <PostsHome
        posts={postsFiltrados}
       
        cargando={cargando}
        error={error}
        cargarPosts={cargarPosts}
        onUpdatePost={handleUpdatePost}
        onDeletePost={handleDeletePost}
      />
    </div>
  );
}

export default Home;
