import { useEffect, useState } from "react";
import { TeacherAPI } from "../api/teacherApi.js";
import type { FollowUpPrimitives as FollowUp } from "../../../../../domain/dist/entities/students/FollowUp.js";
import { Button } from "../ui/Button/Button.js";

export const StudentDetails = ({ studentId }: { studentId: string }) => {
  const [followUps, setFollowUps] = useState<FollowUp[]>([]);
  const [newFollowUp, setNewFollowUp] = useState({ comment: "", progress: "" });
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    TeacherAPI.getFollowUps(studentId).then((res) => setFollowUps(res.data));
  }, [studentId]);

    const handleAdd = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      try {
        await TeacherAPI.addFollowUp(studentId, newFollowUp);
        const res = await TeacherAPI.getFollowUps(studentId);
        setFollowUps(res.data);
        setNewFollowUp({ comment: "", progress: "" });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };


  return (
    <div className="p-4 space-y-4 bg-white shadow rounded-xl">
      <h2 className="text-xl font-bold">Seguimientos del alumno</h2>

      <form onSubmit={handleAdd} className="flex flex-col gap-2">
        <textarea
          className="border p-2 rounded"
          placeholder="Comentario..."
          value={newFollowUp.comment}
          onChange={(e) => setNewFollowUp({ ...newFollowUp, comment: e.target.value })}
        />
        <select
          className="border p-2 rounded"
          value={newFollowUp.progress}
          onChange={(e) => setNewFollowUp({ ...newFollowUp, progress: e.target.value })}
        >
          <option value="">Seleccione progreso</option>
          <option value="Excelente">Excelente</option>
          <option value="Regular">Regular</option>
          <option value="Falta mejorar">Falta mejorar</option>
        </select>
        <div className="flex justify-end mt-2">
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Guardando..." : "Agregar seguimiento"}
          </Button>
        </div>
      </form>

      <div className="space-y-2">
        {followUps.length === 0 ? (
          <p className="text-gray-500">No hay seguimientos aún.</p>
        ) : (
          followUps.map((f) => (
            <div key={f._id} className="border rounded p-3 bg-gray-50">
              <p className="font-semibold">{f.progress}</p>
              <p>{f.comment}</p>
              <small className="text-gray-500">
                {new Date(f.date).toLocaleDateString()}
              </small>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
