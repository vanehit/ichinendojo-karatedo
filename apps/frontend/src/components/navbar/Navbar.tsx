import React from "react";
import { Link, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { useAuth } from "../context/AuthContext";
import { Button } from "../ui/Button/Button";

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // 🔗 Links base visibles para todos
  const baseLinks = [
    { label: "Inicio", to: "/" },
    { label: "Contacto", to: "/contacto" }, // 👈 agregado
  ];

  // 🔗 Links específicos por rol
  const teacherLinks = [
    { label: "Profesores", to: "/teachers" },
    { label: "Clases", to: "/classes" },
  ];

  const adminLinks = [
    { label: "Usuarios", to: "/users" },
    { label: "Dashboard", to: "/dashboard" },
  ];

  // 🔗 Combinar enlaces según el rol del usuario
  const links = user
    ? [
        ...baseLinks,
        ...(user.role === "TEACHER" ? teacherLinks : []),
        ...(user.role === "ADMIN" ? adminLinks : []),
      ]
    : baseLinks;

  return (
    <nav className="flex justify-between items-center bg-gray-900 text-white px-6 py-3 shadow-md">
      {/* Logo / Título */}
      <Link
        to="/"
        className="text-xl font-bold tracking-wide hover:text-yellow-400"
      >
        🥋 Ichinen Dojo
      </Link>

      {/* Menú principal */}
      <ul className="flex gap-4 items-center">
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              className={clsx(
                "hover:text-yellow-400 transition-colors font-medium"
              )}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Botones de sesión */}
      <div className="flex items-center gap-3">
        {user && (
          <span className="text-sm text-gray-300">
            {user.name} — <strong>{user.role}</strong>
          </span>
        )}

        {user ? (
          <Button variant="danger" className="text-sm" onClick={handleLogout}>
            Cerrar sesión
          </Button>
        ) : (
          <Button
            variant="secondary"
            className="text-sm"
            onClick={() => navigate("/login")}
          >
            Ingresar
          </Button>
        )}
      </div>
    </nav>
  );
};
