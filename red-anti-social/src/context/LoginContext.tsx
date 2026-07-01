import React, { createContext, useContext, useState, useEffect } from 'react';
import type { AuthContextType , User} from '../types/Index'; 



const LoginContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [usuarioActual, setUsuarioActual] = useState<User | null>(null);
  const [cargando, setCargando] = useState<boolean>(true);

  // Al cargar la app, verificamos si ya había un usuario guardado
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuarioLogueado');
    if (usuarioGuardado) {
      setUsuarioActual(JSON.parse(usuarioGuardado));
    }
    setCargando(false);
  }, []);

  const login = (usuario: User) => {
    setUsuarioActual(usuario);
    localStorage.setItem('usuarioLogueado', JSON.stringify(usuario));
  };

  const logout = () => {
    setUsuarioActual(null);
    localStorage.removeItem('usuarioLogueado');
  };

  return (
    <LoginContext.Provider value={{ usuarioActual, login, logout, cargando }}>
      {children}
    </LoginContext.Provider>
  );
};

// Hook personalizado para usar el contexto de manera súper fácil
export const useAuth = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};