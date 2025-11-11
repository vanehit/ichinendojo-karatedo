import { useEffect, useState } from "react";
import { ClassAPI } from "../api/ClassApi.js";
import { Button } from "../ui/Button/Button.js";

interface ClassData {
  _id: string;
  date: string;
  topic: string;
  description?: string;
  students: string[];
  attendance?: string[];
}

export const Classes = ({ teacherId }: { teacherId: string }) => {
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [newClass, setNewClass] = useState({
    date: "",
    topic: "",
    description: "",
    students: "",
  });
  const [loading, setLoading] = useState(false);

useEffect(() => {
  const fetchClasses = async () => {
    const res = await ClassAPI.getMyClasses(teacherId);
    setClasses(res.data);
  };
  fetchClasses();
}, [teacherId]); 


  const loadClasses = async () => {
    const res = await ClassAPI.getMyClasses(teacherId);
    setClasses(res.data);
  };

  const handleAddClass = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = {
        ...newClass,
        students: newClass.students
          .split(",")
          .map((id) => id.trim())
          .filter(Boolean),
      };
      await ClassAPI.createClass(payload);
      await loadClasses();
      setNewClass({ date: "", topic: "", description: "", students: "" });
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">📚 Mis Clases</h1>

      <form
        onSubmit={handleAddClass}
        className="p-4 bg-white rounded-xl shadow flex flex-col gap-3"
      >
        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="date"
            value={newClass.date}
            onChange={(e) => setNewClass({ ...newClass, date: e.target.value })}
            className="border p-2 rounded flex-1"
            required
          />
          <input
            type="text"
            placeholder="Tema o contenido"
            value={newClass.topic}
            onChange={(e) => setNewClass({ ...newClass, topic: e.target.value })}
            className="border p-2 rounded flex-1"
            required
          />
        </div>

        <textarea
          placeholder="Descripción (opcional)"
          value={newClass.description}
          onChange={(e) =>
            setNewClass({ ...newClass, description: e.target.value })
          }
          className="border p-2 rounded"
        />

        <input
          type="text"
          placeholder="IDs de alumnos (separados por coma)"
          value={newClass.students}
          onChange={(e) =>
            setNewClass({ ...newClass, students: e.target.value })
          }
          className="border p-2 rounded"
        />

        <div className="flex justify-end mt-2">
          <Button type="submit" disabled={loading} variant="primary">
            {loading ? "Creando..." : "Agregar clase"}
          </Button>
        </div>
      </form>

      <div className="space-y-3">
        {classes.length === 0 ? (
          <p className="text-gray-500">No hay clases registradas aún.</p>
        ) : (
          classes.map((c) => (
            <div
              key={c._id}
              className="border p-4 rounded-lg bg-gray-50 shadow-sm"
            >
              <h3 className="font-semibold text-lg">{c.topic}</h3>
              <p className="text-gray-600">{c.description}</p>
              <p className="text-sm text-gray-500">
                Fecha: {new Date(c.date).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500">
                Alumnos: {c.students.length}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
