import React, { useEffect, useState } from "react";
import { studentApi } from "../api/studentApi";
import { userApi } from "../api/userApi";
import { Loader2 } from "lucide-react";

export const Dashboard: React.FC = () => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [students, users] = await Promise.all([
        studentApi.getAll(),
        userApi.getAll(),
      ]);
      setTotalStudents(students.length);
      setTotalUsers(users.length);
    } catch (err) {
      console.error("Error cargando dashboard", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64 text-blue-600">
        <Loader2 className="animate-spin mr-2" />
        Cargando estadísticas...
      </div>
    );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        📊 Panel Principal
      </h2>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="p-6 bg-white rounded-xl shadow">
          <h3 className="text-xl font-semibold text-gray-700">Alumnos</h3>
          <p className="text-3xl font-bold text-blue-600">{totalStudents}</p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow">
          <h3 className="text-xl font-semibold text-gray-700">Usuarios</h3>
          <p className="text-3xl font-bold text-green-600">{totalUsers}</p>
        </div>
      </div>
    </div>
  );
};
