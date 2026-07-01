import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/LoginContext";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa6";
import "../style/Register.css";

type RegisterForm = {
  nickname: string;
  email: string;
  password: string;
};

const avatares = ["mono1.jpeg", "mono2.jpeg", "mono3.jpeg", "mono4.jpg"];

export const Register: React.FC = () => {
  const [form, setForm] = useState<RegisterForm>({
    nickname: "",
    email: "",
    password: "",
  });

  const [avatar, setAvatar] = useState("mono1.jpeg");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.nickname || !form.email || !form.password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          avatar,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data?.error || data?.message || "No se pudo crear el usuario");
        return;
      }

      login({
        _id: data.usuario._id,
        nickname: data.usuario.nickname,
        email: data.usuario.email,
        avatar: data.usuario.avatar,
      });

      navigate("/home");
    } catch {
      setError("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="register-page">
      <section className="register-card">
        <div className="register-logo">
          <img src="/LogoAntiSocial.jpeg" alt="Logo UNAHUR" />
        </div>

        <div className="register-tag">#BananaTime</div>

        <header className="register-header">
          <h1>UNITE A LA MANADA</h1>
          <p>La selva te espera, mono.</p>
        </header>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="register-field">
            <label htmlFor="nickname">Nickname</label>
            <div className="register-input-wrapper">
              <span className="register-icon">
                <FaUser />
              </span>
              <input
                id="nickname"
                name="nickname"
                value={form.nickname}
                onChange={handleChange}
                placeholder="Tu nombre de mono"
              />
            </div>
          </div>

          <div className="register-field">
            <label htmlFor="email">Email</label>
            <div className="register-input-wrapper">
              <span className="register-icon">
                <FaEnvelope />
              </span>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email para bananas"
              />
            </div>
          </div>

          <div className="register-field">
            <label htmlFor="password">Password</label>
            <div className="register-input-wrapper">
              <span className="register-icon">
                <FaLock />
              </span>
              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Secreto de chimpancé"
              />
            </div>
          </div>

          <div className="avatar-section">
            <p className="avatar-title">🐵 Elegí tu mono</p>

            <div className="avatar-options">
              {avatares.map((mono) => (
                <button
                  key={mono}
                  type="button"
                  className={`avatar-option ${
                    avatar === mono ? "avatar-selected" : ""
                  }`}
                  onClick={() => setAvatar(mono)}
                >
                  <img src={`/avatars/${mono}`} alt="Avatar de mono" />
                </button>
              ))}
            </div>
          </div>

          {error && <p className="register-error">{error}</p>}

          <button type="submit" disabled={loading} className="register-button">
            {loading
              ? "Creando usuario..."
              : "🍌 ¡RECLAMAR MI ÁRBOL! (REGISTRARSE)"}
          </button>
        </form>

        <div className="register-divider">
          <span>O TREPA CON</span>
        </div>

        <div className="register-socials">
          <button type="button">👍 Facebook</button>
          <button type="button">📸 Instagram</button>
        </div>

        <p className="register-login">
          ¿Ya sos parte de la manada?{" "}
          <span onClick={() => navigate("/login")}>Iniciá sesión</span>
        </p>
      </section>
    </main>
  );
};
