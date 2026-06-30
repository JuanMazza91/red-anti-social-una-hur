import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Login.css';

export const Login: React.FC = () => {
  const [nickName, setNickName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [nicknameError, setNicknameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const navigate = useNavigate();

  // Limpieza de errores
  useEffect(() => {
    if (nicknameError || passwordError) {
      const timer = setTimeout(() => {
        setNicknameError(null);
        setPasswordError(null);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [nicknameError, passwordError]);

  // Redirección luego de login exitoso
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        navigate('/home');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [successMessage, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setNicknameError(null);
    setPasswordError(null);
    setSuccessMessage(null);

    let tieneErrores = false;

    if (!nickName.trim()) {
      setNicknameError('¡OOK OOK! Ingresá el nombre de tu chimpancé.');
      tieneErrores = true;
    }

    if (!password.trim()) {
      setPasswordError('¡OOK! Falta la clave de la selva.');
      tieneErrores = true;
    } else if (password.length < 6) {
      setPasswordError('¡OOK! La clave es corta. Mínimo 6 caracteres.');
      tieneErrores = true;
    }

    if (tieneErrores) return;

    try {
      const response = await fetch('http://localhost:3000/usuarios');
      const usuarios = await response.json();

      const usuarioExiste = usuarios.find(
        (u: any) => u.nickname?.toLowerCase() === nickName.toLowerCase()
      );

      if (!usuarioExiste) {
        setNicknameError('¡OOK! Ese chimpancé no existe en la selva.');
        return;
      }

      if (password !== '123456') {
        setPasswordError('Clave incorrecta. ¡Lanzamiento de banana!');
        return;
      }

      setSuccessMessage(
        `¡BIENVENIDO A LA SELVA, ${nickName.toUpperCase()}! 🍌🌴🦧`
      );

    } catch (err) {
      setPasswordError('Error al entrar a la selva.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">
          🦧 UNAHUR Anti-Social Net 🦧
        </h2>

        <p className="login-subtitle">
          <i>Jungle Feed - Login</i>
        </p>

        <form onSubmit={handleSubmit}>
          {/* NICKNAME */}
          <label className="login-label">Nombre de tu mono</label>
          <input
            type="text"
            placeholder="monkey_name"
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
            className="login-input"
          />
          {nicknameError && (
            <div className="login-error-field">{nicknameError}</div>
          )}

          {/* PASSWORD */}
          <label className="login-label">Clave de la Selva</label>

          <div className="password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input password-input"
            />

            <button
              type="button"
              className="password-toggle-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? '🐵' : '🙈'}
            </button>
          </div>

          {passwordError && (
            <div className="login-error-field">{passwordError}</div>
          )}

          {/* SUCCESS */}
          {successMessage && (
            <div className="login-success">{successMessage}</div>
          )}

          {/* LOGIN BUTTON */}
          <button type="submit" className="login-button">
            INGRESAR A LA MANADA 🍌
          </button>

          {/* REGISTER BUTTON (CORREGIDO) */}
          <button
            type="button"
            className="login-register-button"
            onClick={() => navigate('/register')}
          >
            Registrarse En La Manada 📝
          </button>
        </form>
      </div>
    </div>
  );
};