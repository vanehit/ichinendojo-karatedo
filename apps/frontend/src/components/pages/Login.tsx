import React, { useState } from "react";
import { login } from "../api/authApi";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login: saveAuth } = useAuth();
  const navigate = useNavigate();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");

  try {
    
    const { data } = await login({ email, password });

    saveAuth(data.token, data.user);
    navigate("/");
  } catch (err: any) {
    setError(err.response?.data?.message || "Error al iniciar sesión");
  }
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Iniciar sesión
        </h2>

        {error && (
          <p className="text-red-600 text-center font-medium">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
        />

        <button
          type="submit"
          className="w-full bg-red-700 hover:bg-red-800 text-white py-2 rounded-md font-semibold transition"
        >
          Entrar
        </button>

        {/* 🔙 Link para volver al inicio */}
        <div className="text-center pt-2">
          <Link
            to="/"
            className="text-sm text-gray-600 hover:text-red-700 transition-colors"
          >
            ← Volver al inicio
          </Link>
        </div>
      </form>
    </div>
  );
};
