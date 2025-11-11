import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout.js";
import { Login } from "./components/pages/Login.js";
import { Home } from "./components/pages/Home.js";
import { Students } from "./components/pages/Students.js";
import { useAuth } from "./components/context/AuthContext.js";
import { Users } from "./components/pages/Users.js";
import { Dashboard } from "./components/pages/Dashboard.js";
import { Contacto } from "./components/pages/Contact.js";
import { Classes } from "./components/pages/Classes.js";


function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/contacto" element={<Contacto />} />
        </Route>

        <Route path="/login" element={<Login />} />

        {/* Rutas protegidas */}
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/students" element={<Students />} />
          <Route path="/users" element={<Users />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/classes" element={<Classes />} />
        </Route>

        {/* Ruta por defecto */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
