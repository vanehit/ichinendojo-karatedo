import React, { useEffect, useState } from "react";
import { studentApi, type Student } from "../api/studentApi";
import { Card } from "../ui/cards/Card";
import { Loader2, RefreshCcw } from "lucide-react";

export const Students: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const data = await studentApi.getAll();
      setStudents(data);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar los alumnos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64 text-blue-600">
        <Loader2 className="animate-spin mr-2" />
        Cargando alumnos...
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-500">
        <p>{error}</p>
        <button
          onClick={fetchStudents}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center mx-auto"
        >
          <RefreshCcw className="w-4 h-4 mr-2" /> Reintentar
        </button>
      </div>
    );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        🥋 Listado de Alumnos
      </h2>

      {students.length === 0 ? (
        <p className="text-gray-600 text-center">
          No hay alumnos registrados todavía.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {students.map((student, index) => (
            <Card
              key={student._id ?? `student-${index}`}
              variant="alumno"
              title={student.name}
              subtitle={`Cinturón ${student.belt}`}
              belt={student.belt}
              description={`Tel: ${student.phone ?? "Sin teléfono"}`}
              photo={student.photo ?? "https://via.placeholder.com/300x200?text=Sin+foto"}
            />
          ))}

        </div>
      )}
    </div>
  );
};
