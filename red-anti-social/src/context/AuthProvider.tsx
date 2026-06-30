import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import type { AuthContextType, LoginData } from "../types/Auth";
import type { User } from "../types/User";

// en true muestra perfil de un usuario
const MODO_PRUEBA = true;

const API_URL = "http://localhost:3000";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let activo = true;

    const inicializarAuth = async () => {
      const esperaDosSegundos = new Promise((resolve) =>
        setTimeout(resolve, 2000),
      );

      try {
        if (MODO_PRUEBA) {
          const [respuesta] = await Promise.all([
            fetch(`${API_URL}/usuarios`),
            esperaDosSegundos,
          ]);

          if (respuesta.ok && activo) {
            const usuarios: User[] = await respuesta.json();
            const usuarioSeed = usuarios.find((u) => u.nickname === "gonza");
            if (usuarioSeed) {
              setUser(usuarioSeed);
            }
          }
        } else {
          await esperaDosSegundos;
        }
      } catch (error) {
        console.error("Error al inicializar auth:", error);
      } finally {
        if (activo) {
          setLoading(false);
        }
      }
    };

    void inicializarAuth();

    return () => {
      activo = false;
    };
  }, []);

  async function login(data: LoginData): Promise<boolean> {
    // agregar logica del login
    console.log("Formulario de login:", data);
    return false;
  }

  function logout() {
    setUser(null);
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: user !== null,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
