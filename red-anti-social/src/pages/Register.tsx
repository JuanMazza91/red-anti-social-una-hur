import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa6";
import "../style/Register.css";

type RegisterForm = {
  nickname: string;
  email: string;
  password: string;
};

export const Register: React.FC = () => {
  const [form, setForm] = useState<RegisterForm>({
    nickname: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { login } = useUser();

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
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data?.error || "No se pudo crear el usuario");
        return;
      }

      login({
        id: data.id,
        nickname: data.nickname,
        email: data.email,
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
          <span>UnaHur</span>
          <small>Logo</small>
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
              <FaUser className="register-icon" />
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
              <FaEnvelope className="register-icon" />
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
              <FaLock className="register-icon" />
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

          {error && <p className="register-error">{error}</p>}

          <button type="submit" disabled={loading} className="register-button">
            {loading ? "Creando usuario..." : "🍌 ¡RECLAMAR MI ÁRBOL! (REGISTRARSE)"}
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