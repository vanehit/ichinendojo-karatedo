import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../navbar/Navbar";
import { useAuth } from "../context/AuthContext";

export const AppLayout: React.FC = () => {
  const { user } = useAuth();
  const role = user?.role || null;
  const location = useLocation();
  
  const hideNavbar = location.pathname === "/login";

  return (
    <div className="min-h-screen bg-gray-100">
      {!hideNavbar && <Navbar userRole={role} />}
      <main className={`${hideNavbar ? "p-0" : "p-6"}`}>
        <Outlet /> {/*renderizamos las rutas hijas */}
      </main>
    </div>
  );
};
