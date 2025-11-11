import React, { useEffect, useState } from "react";
import { studentApi, type Student } from "../api/studentApi.js";
import { Card } from "../ui/cards/Card.js";
import { Loader2, RefreshCcw, ArrowLeft } from "lucide-react";
import { StudentDetails } from "./StudentDetails.js"; 

export const Students: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

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

    // 👇 Si hay un alumno seleccionado, mostramos su detalle
    if (selectedStudent) {
      return (
        <div className="p-6 space-y-4">
          <button
            onClick={() => setSelectedStudent(null)}
            className="mb-4 flex items-center text-blue-600 hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Volver al listado
          </button>

          {/* Info del alumno */}
          <div className="bg-white shadow rounded-xl p-4 flex flex-col sm:flex-row gap-4">
            <img
              src={selectedStudent.photo ?? "https://via.placeholder.com/150x150?text=Sin+foto"}
              alt={selectedStudent.name}
              className="w-32 h-32 rounded-full object-cover border"
            />

            <div className="flex-1 space-y-1">
              <h2 className="text-2xl font-semibold text-gray-800">
                {selectedStudent.name}
              </h2>
              <p className="text-gray-700">
                <strong>Cinturón:</strong> {selectedStudent.belt}
              </p>
              <p className="text-gray-700">
                <strong>Teléfono:</strong> {selectedStudent.phone ?? "No registrado"}
              </p>
              <p className="text-gray-700">
                <strong>Email:</strong> {selectedStudent.email ?? "No disponible"}
              </p>
              <p className="text-gray-700">
                <strong>Fecha de ingreso:</strong>{" "}
                {selectedStudent.entryDate
                  ? new Date(selectedStudent.entryDate).toLocaleDateString()
                  : "No registrada"}
              </p>
            </div>
          </div>

          {/* Seguimientos del alumno */}
          <StudentDetails studentId={selectedStudent._id} />
        </div>
      );
    }

  // Si no hay alumno seleccionado, mostramos el listado
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">🥋 Listado de Alumnos</h2>

      {students.length === 0 ? (
        <p className="text-gray-600 text-center">No hay alumnos registrados todavía.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {students.map((student, index) => (
            <div key={student._id ?? `student-${index}`} onClick={() => setSelectedStudent(student)}>
              <Card
                variant="alumno"
                title={student.name}
                subtitle={`Cinturón ${student.belt}`}
                belt={student.belt}
                description={`Tel: ${student.phone ?? "Sin teléfono"}`}
                photo={student.photo ?? "https://via.placeholder.com/300x200?text=Sin+foto"}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
